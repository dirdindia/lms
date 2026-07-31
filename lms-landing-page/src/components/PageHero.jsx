export default function PageHero({
  eyebrow,
  title,
  description,
}) {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <span className="inline-flex rounded-full border border-brand/20 bg-background px-4 py-1.5 text-xs font-semibold tracking-[0.16em] text-brand uppercase">
          {eyebrow}
        </span>
        <h1 className="mt-5 text-3xl font-semibold text-balance text-brand-deep sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}
