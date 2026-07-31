import PageHero from "@/components/PageHero";
import { CheckCircle2 } from "lucide-react";

const objectives = [
  "Every student learns according to their own ability and pace.",
  "Weak subjects and concepts are understood quickly.",
  "Immediate teacher support whenever the student needs it.",
  "AI-powered step-by-step solutions and explanations.",
];

const faculty = [
  {
    title: "Educational Qualification",
    text: "Every teacher is a graduate in the relevant subject, with proven teaching experience.",
  },
  {
    title: "Language Skill",
    text: "Strong command of both Hindi and English so students learn in the language they think in.",
  },
  {
    title: "24×7 Availability",
    text: "Sufficient qualified faculty rostered round the clock for audio and video tutoring.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A learning mission rooted in Sahibganj"
        description="Nawdeep Mahila Sangh (Reg. No. 426/2006) works to make quality, personalized education reachable for every student — online and offline."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-brand-deep sm:text-3xl">Our objective</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The purpose of this platform is to give students personalized and accelerated
              learning, combining live human teaching with AI-driven guidance.
            </p>
            <ul className="mt-6 space-y-3">
              {objectives.map((o) => (
                <li key={o} className="flex gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-brand-deep">Faculty standards</h2>
            <div className="mt-6 space-y-6">
              {faculty.map((f) => (
                <div key={f.title}>
                  <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
