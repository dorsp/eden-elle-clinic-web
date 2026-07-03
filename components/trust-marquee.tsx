const defaultItems = [
  "Doctor-guided care",
  "Vegan protocols",
  "Aftercare-first",
  "Consultation before procedure",
  "Certified & ethical",
  "Natural-looking results"
];

export function TrustMarquee({ items = defaultItems }: { items?: string[] }) {
  // Rendered twice so the -50% keyframe loops seamlessly.
  const loop = [...items, ...items];

  return (
    <div className="marquee" aria-label="Our commitments">
      <div className="marquee__track">
        {loop.map((item, index) => (
          <span className="marquee__item" key={`${item}-${index}`} aria-hidden={index >= items.length}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
