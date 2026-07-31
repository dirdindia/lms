import PageHero from "@/components/PageHero";

const resources = [
  { title: "Online Mock Tests", text: "Timed, board and competitive exam pattern tests with instant scoring." },
  { title: "Question Banks", text: "Chapter-wise questions sorted by difficulty level." },
  { title: "Practice Sets", text: "Daily practice sets that adapt to your progress." },
  { title: "Class Notes", text: "Clean, exam-focused notes for every subject and chapter." },
  { title: "Revision Material", text: "Quick formula sheets and last-minute revision capsules." },
  { title: "Exam Preparation Content", text: "Board, school, JEE and NEET focused preparation packs." },
];

export default function StudyMaterial() {
  return (
    <>
      <PageHero
        eyebrow="Study Material"
        title="Digital resources for every chapter"
        description="Notes, question banks, practice sets and mock tests that students can access online from any device."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <article key={r.title} className="rounded-2xl border border-border bg-card p-7">
              <h2 className="text-lg font-semibold text-brand-deep">{r.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
