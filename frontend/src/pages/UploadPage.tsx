import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { analyzeUploads, uploadExport } from "../api/client";
import { DEMO_USER_ID } from "../api/config";
import type { Upload } from "../api/types";
import { UploadDropzone } from "../components/UploadDropzone";
import { useUploads } from "../hooks/useUploads";
import { formatPlatform, formatShortDate } from "../lib/format";

type UploadStep = "idle" | "uploading" | "uploaded" | "analyzing" | "done";

export function UploadPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedUploadId = searchParams.get("upload");
  const { uploads, reload: reloadUploads } = useUploads(DEMO_USER_ID);

  const [step, setStep] = useState<UploadStep>("idle");
  const [error, setError] = useState<string | null>(null);
  const [lastUpload, setLastUpload] = useState<Upload | null>(null);
  const [selectedUploadId, setSelectedUploadId] = useState<string | null>(
    preselectedUploadId,
  );

  useEffect(() => {
    if (preselectedUploadId) {
      setSelectedUploadId(preselectedUploadId);
    }
  }, [preselectedUploadId]);

  useEffect(() => {
    if (!preselectedUploadId || uploads.length === 0) return;
    const match = uploads.find((upload) => upload.upload_id === preselectedUploadId);
    if (match) {
      setLastUpload(match);
      setStep("uploaded");
    }
  }, [preselectedUploadId, uploads]);

  const selectedUpload =
    uploads.find((upload) => upload.upload_id === selectedUploadId) ?? lastUpload;

  const handleUpload = useCallback(
    async (file: File) => {
      setError(null);
      setStep("uploading");

      try {
        const upload = await uploadExport(DEMO_USER_ID, file);
        setLastUpload(upload);
        setSelectedUploadId(upload.upload_id);
        setStep("uploaded");
        await reloadUploads();
      } catch (uploadError) {
        const message =
          uploadError instanceof Error ? uploadError.message : "Upload failed.";
        setError(message);
        setStep("idle");
      }
    },
    [reloadUploads],
  );

  const handleAnalyze = useCallback(
    async (uploadId: string) => {
      setError(null);
      setStep("analyzing");

      try {
        await analyzeUploads({
          user_id: DEMO_USER_ID,
          upload_ids: [uploadId],
          persist: true,
        });
        setStep("done");
        navigate("/", { state: { refreshAnalysis: true } });
      } catch (analyzeError) {
        const message =
          analyzeError instanceof Error ? analyzeError.message : "Analysis failed.";
        setError(message);
        setStep("uploaded");
      }
    },
    [navigate],
  );

  const isBusy = step === "uploading" || step === "analyzing";

  return (
    <section className="upload-page" aria-label="Import export">
      <header className="page-header">
        <p className="section-kicker">Import</p>
        <h1>Import or export coral</h1>
        <p className="page-lead">
          Upload a social export (.zip, .json, or .csv). We parse it in memory, save
          normalized posts to Firestore, then run analysis to grow your coral.
        </p>
      </header>

      <UploadDropzone disabled={isBusy} onFileSelected={(file) => void handleUpload(file)} />

      {step === "uploading" ? (
        <div className="flow-status" role="status">
          <LoaderCircle className="spin-icon" size={18} aria-hidden="true" />
          <span>Uploading and parsing your export…</span>
        </div>
      ) : null}

      {step === "analyzing" ? (
        <div className="flow-status" role="status">
          <LoaderCircle className="spin-icon" size={18} aria-hidden="true" />
          <span>Running analysis on your posts…</span>
        </div>
      ) : null}

      {error ? (
        <div className="flow-status flow-status--error" role="alert">
          <span>{error}</span>
        </div>
      ) : null}

      {selectedUpload ? (
        <article className="upload-result-panel">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Ingest report</p>
              <h2>{selectedUpload.filename}</h2>
            </div>
            {step === "done" ? (
              <span className="success-pill">
                <CheckCircle2 size={16} />
                Analyzed
              </span>
            ) : null}
          </div>

          <dl className="summary-grid">
            <div>
              <dt>Platform</dt>
              <dd>{formatPlatform(selectedUpload.platform)}</dd>
            </div>
            <div>
              <dt>Posts parsed</dt>
              <dd>{selectedUpload.post_count}</dd>
            </div>
            <div>
              <dt>Comments</dt>
              <dd>{selectedUpload.comment_count}</dd>
            </div>
            <div>
              <dt>Uploaded</dt>
              <dd>{formatShortDate(selectedUpload.created_at)}</dd>
            </div>
          </dl>

          {selectedUpload.ingest_report?.files?.length ? (
            <div className="ingest-files">
              <h3>Files processed</h3>
              <ul>
                {selectedUpload.ingest_report.files.map((file) => (
                  <li key={file.path}>
                    <span>{file.path}</span>
                    <span>
                      {file.platform ? formatPlatform(file.platform) : "Unknown"} ·{" "}
                      {file.post_count ?? 0} posts
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {selectedUpload.ingest_report?.warnings?.length ? (
            <div className="ingest-warnings">
              <h3>Warnings</h3>
              <ul>
                {selectedUpload.ingest_report.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="upload-actions">
            <button
              className="primary-action"
              type="button"
              disabled={isBusy || step === "done"}
              onClick={() => void handleAnalyze(selectedUpload.upload_id)}
            >
              Analyze now
            </button>
            <button
              className="secondary-action"
              type="button"
              disabled={isBusy}
              onClick={() => navigate("/")}
            >
              Back to dashboard
            </button>
          </div>
        </article>
      ) : null}

      {uploads.length > 1 ? (
        <section className="upload-history-panel">
          <h2>Previous uploads</h2>
          <ul className="upload-history-list">
            {uploads.map((upload) => (
              <li key={upload.upload_id}>
                <button
                  type="button"
                  className={`upload-item${selectedUploadId === upload.upload_id ? " upload-item--selected" : ""}`}
                  onClick={() => {
                    setSelectedUploadId(upload.upload_id);
                    setLastUpload(upload);
                    setStep("uploaded");
                    setError(null);
                  }}
                >
                  <span className="upload-filename">{upload.filename}</span>
                  <span className="upload-meta">
                    {formatPlatform(upload.platform)} · {upload.post_count} posts
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </section>
  );
}
