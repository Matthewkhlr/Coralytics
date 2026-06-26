import { useCallback, useRef, useState } from "react";
import { CloudUpload, FileArchive } from "lucide-react";

const ACCEPTED_TYPES = ".zip,.json,.csv";

type UploadDropzoneProps = {
  disabled?: boolean;
  onFileSelected: (file: File) => void;
};

export function UploadDropzone({ disabled = false, onFileSelected }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (!file || disabled) return;
      onFileSelected(file);
    },
    [disabled, onFileSelected],
  );

  return (
    <div
      className={`upload-dropzone${isDragging ? " upload-dropzone--active" : ""}${disabled ? " upload-dropzone--disabled" : ""}`}
      onDragEnter={(event) => {
        event.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setIsDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        hidden
        disabled={disabled}
        onChange={(event) => handleFiles(event.target.files)}
      />
      <CloudUpload size={36} aria-hidden="true" />
      <p className="dropzone-title">Drop your export here</p>
      <p className="dropzone-hint">Supports .zip, .json, and .csv platform exports</p>
      <button
        className="primary-action"
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        <FileArchive size={17} />
        <span>Choose file</span>
      </button>
    </div>
  );
}
