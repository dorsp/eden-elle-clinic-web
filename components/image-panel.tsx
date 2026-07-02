type ImagePanelProps = {
  label: string;
  className?: string;
  tone?: "facial" | "body" | "doctor" | "ritual" | "clinic";
};

export function ImagePanel({ label, className, tone = "clinic" }: ImagePanelProps) {
  return (
    <div className={["image-panel", className].filter(Boolean).join(" ")} data-tone={tone}>
      <div className="image-caption">
        <span className="micro-label">{label}</span>
      </div>
    </div>
  );
}
