import PageHero from "@/components/PageHero";

const groups = [
  {
    title: "Class 9th",
    subjects: ["Mathematics", "Science", "English"],
  },
  {
    title: "Class 10th",
    subjects: ["Mathematics", "Science", "English", "Board Exam Preparation"],
  },
  {
    title: "Class 11th",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Hindi"],
  },
  {
    title: "Class 12th",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Hindi"],
  },
  {
    title: "JEE Preparation",
    subjects: ["Physics", "Chemistry", "Mathematics", "Mock Tests", "Previous Year Papers"],
  },
  {
    title: "NEET Preparation",
    subjects: ["Physics", "Chemistry", "Biology", "Mock Tests", "Previous Year Papers"],
  },
];

export default function Courses() {
  return (
    <>
      <PageHero
        eyebrow="Courses"
        title="Classes, subjects and exam batches"
        description="Structured programs for Class 9 to 12 along with board, school, JEE and NEET preparation — taught in Hindi and English."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <article
              key={g.title}
              className="rounded-2xl border border-border bg-card p-7 shadow-soft transition-transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-brand-deep">{g.title}</h2>
              <ul className="mt-4 space-y-2">
                {g.subjects.map((s) => (
                  <li
                    key={s}
                    className="border-b border-border/60 pb-2 text-sm text-muted-foreground last:border-0"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
