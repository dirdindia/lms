import PageHero from "@/components/PageHero";
import { Bot, Camera, Languages, ListOrdered, MessageSquare, Wand2 } from "lucide-react";

const abilities = [
  { icon: MessageSquare, title: "Ask by text", text: "Type any doubt and get an instant answer." },
  { icon: Camera, title: "Upload a photo", text: "Send a picture of the question from your book." },
  {
    icon: ListOrdered,
    title: "Step-by-step solution",
    text: "Formula, calculation and final answer, explained in order.",
  },
  {
    icon: Wand2,
    title: "Concept simplification",
    text: "Difficult concepts rewritten in easy language.",
  },
  {
    icon: Languages,
    title: "Hindi, English & regional",
    text: "Explanations in the language the student understands best.",
  },
  {
    icon: Bot,
    title: "Adaptive study plan",
    text: "Weak areas identified and lessons adjusted to your speed.",
  },
];

export default function AiTutor() {
  return (
    <>
      <PageHero
        eyebrow="AI Learning Companion"
        title="A 24×7 AI tutor that thinks with the student"
        description="Upload a Physics question and the AI reads it, states the formula, does the calculation, gives the final answer and then explains the whole concept."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {abilities.map((a) => (
            <article key={a.title} className="rounded-2xl border border-border bg-card p-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-brand">
                <a.icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-foreground">{a.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
