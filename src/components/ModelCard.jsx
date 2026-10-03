export function SectionHeading({ overline, title, description, light = false }) {
  return (
    <div className={`section-heading ${light ? 'light' : ''}`}>
      <p className="eyebrow">{overline}</p>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
