import PageHero from "@/components/PageHero";
import { Clock, Mic, MonitorSmartphone, School, Users, Video } from "lucide-react";

const items = [
  { icon: Video, title: "Video calls", text: "Face-to-face teaching with screen and board sharing." },
  { icon: Mic, title: "Audio calls", text: "Low-bandwidth friendly voice doubt solving." },
  { icon: Clock, title: "60-second response", text: "A teacher joins within a minute of your request." },
  { icon: Users, title: "One-to-one attention", text: "Dedicated sessions, never a crowded classroom." },
  {
    icon: MonitorSmartphone,
    title: "Any device",
    text: "Android, iOS, tablet, laptop or desktop browser.",
  },
  {
    icon: School,
    title: "Offline teachers",
    text: "Teachers deployed at schools or designated centres on district request.",
  },
];

export default function LiveTutoring() {
  return (
    <>
      <PageHero
        eyebrow="Live Tutoring"
        title="Talk to a real teacher, any time of day"
        description="Real-time one-to-one doubt solving over audio and video, backed by qualified faculty available 24 hours a day, 7 days a week."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <article key={i.title} className="rounded-2xl border border-border bg-card p-7 shadow-soft">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand-deep">
                <i.icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-foreground">{i.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
