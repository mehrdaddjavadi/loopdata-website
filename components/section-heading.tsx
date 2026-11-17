export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <div className="section-eyebrow"><span />{eyebrow}</div>
      <h2>{title}{highlight && <> <span className="gradient-text">{highlight}</span></>}</h2>
      <p>{description}</p>
    </div>
  );
}
