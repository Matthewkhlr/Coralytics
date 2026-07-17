import { useCallback, useRef, useState } from "react";
import { CloudUpload, FileArchive } from "lucide-react";
import { cn } from "@/lib/utils";

type UploadDropzoneProps = {
  disabled?: boolean;
  accept?: string;
  hint?: string;
  onFileSelected: (file: File) => void;
};

export function UploadDropzone({
  disabled = false,
  accept = ".json,.txt,.csv",
  hint = "Supports .json, .txt, and .csv only",
  onFileSelected,
}: UploadDropzoneProps) {
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
      className={cn(
        "border-2 border-dashed rounded-xl p-8 text-center transition",
        isDragging ? "border-accent/60 bg-accent/5" : "border-border hover:border-accent/60",
        disabled && "opacity-50 pointer-events-none",
      )}
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
        accept={accept}
        hidden
        disabled={disabled}
        onChange={(event) => handleFiles(event.target.files)}
      />
      <CloudUpload className="mx-auto text-accent" size={36} aria-hidden="true" />
      <p className="mt-3 font-medium">Drop your export here</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition disabled:opacity-50"
      >
        <FileArchive size={17} />
        <span>Choose file</span>
      </button>
    </div>
  );
}
