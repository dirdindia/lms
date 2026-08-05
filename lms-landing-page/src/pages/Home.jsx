import { Link } from "@tanstack/react-router";
import Chatbot from "../components/Chatbot";
import {
  ArrowRight,
  Bot,
  BookOpen,
  Camera,
  Clock,
  FlaskConical,
  GraduationCap,
  Languages,
  Laptop,
  LineChart,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
// We use a relative or alias import as requested, but if it's in public, we can just use the string "/hero-student.jpg"
// Since image is in public directory, we don't need to import it here.

const stats = [
  { value: "60 sec", label: "Average teacher response" },
  { value: "24×7", label: "Live tutor availability" },
  { value: "9th–12th", label: "Classes covered" },
  { value: "JEE / NEET", label: "Exam preparation" },
];

const features = [
  {
    icon: Video,
    title: "24×7 Live One-to-One Tutoring",
    text: "Connect with a qualified teacher over audio or video call any hour of the day, with a response guarantee within 60 seconds.",
  },
  {
    icon: Bot,
    title: "AI Learning Companion",
    text: "Ask by text or upload a photo of your question — get step-by-step solutions, formulas and simple explanations instantly.",
  },
  {
    icon: LineChart,
    title: "Personalized Study Plan",
    text: "AI identifies weak concepts, recommends content at your level and adjusts lesson pace to your learning speed.",
  },
  {
    icon: BookOpen,
    title: "Digital Study Material",
    text: "Mock tests, question banks, practice sets, class notes and revision material — all accessible online.",
  },
  {
    icon: Languages,
    title: "Hindi & English Support",
    text: "Every teacher and every AI explanation works in both Hindi and English, with regional language help where needed.",
  },
  {
    icon: Users,
    title: "Offline Teacher Deployment",
    text: "On request from the district administration, qualified teachers can be deployed at schools and designated centres.",
  },
];

const programs = [
  {
    icon: GraduationCap,
    title: "Class 9th & 10th",
    subjects: ["Mathematics", "Science", "English"],
    tag: "Foundation + Board",
  },
  {
    icon: FlaskConical,
    title: "Class 11th & 12th",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Hindi"],
    tag: "Senior Secondary",
  },
  {
    icon: Sparkles,
    title: "Competitive Exams",
    subjects: ["JEE Preparation", "NEET Preparation", "Board Exam", "School Exam"],
    tag: "Target Batches",
  },
];

const steps = [
  {
    title: "Ask your doubt",
    text: "Type your question or upload a photo from your notebook, textbook or question paper.",
  },
  {
    title: "AI explains instantly",
    text: "Get formula, calculation, final answer and the underlying concept in simple language.",
  },
  {
    title: "Talk to a live teacher",
    text: "Still unclear? Join a one-to-one audio or video call in under 60 seconds.",
  },
  {
    title: "Practice & track",
    text: "Follow your AI study plan with practice sets and mock tests until the concept is mastered.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-brand-soft/70" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-20 lg:pb-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-background px-4 py-1.5 text-xs font-semibold tracking-[0.16em] text-brand uppercase">
              <Clock className="h-3.5 w-3.5" /> 60-second teacher response
            </span>
            <h1 className="mt-6 text-4xl leading-[1.08] font-semibold text-balance text-brand-deep sm:text-5xl lg:text-6xl">
              Personalized learning, <span className="text-gradient-brand">accelerated</span> for
              every student.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Nawdeep Mahila Sangh brings 24×7 live one-to-one tutoring and an AI learning companion
              to students of Class 9 to 12 — on mobile, tablet, laptop and web, in Hindi and
              English.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                Register Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/live-tutoring"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/25 bg-background px-7 py-3.5 text-sm font-semibold text-brand-deep transition-colors hover:bg-secondary cursor-pointer"
              >
                Start Free Session
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
              <Laptop className="h-4 w-4 text-brand" />
              Works on Android, iOS, Tablet, Laptop & Web
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-lift">
              <img
                src="/new_hero_image.png"
                alt="Student learning online with a laptop"
                width={1280}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:absolute sm:-bottom-8 sm:-left-6 sm:mt-0 sm:w-64 sm:grid-cols-1">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                <p className="text-xs text-muted-foreground">Live teachers online</p>
                <p className="font-display text-2xl font-semibold text-brand">240+</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                <p className="text-xs text-muted-foreground">Doubts solved daily</p>
                <p className="font-display text-2xl font-semibold text-brand">5,000+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-semibold text-brand-deep sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">Platform</p>
          <h2 className="mt-3 text-3xl font-semibold text-brand-deep sm:text-4xl">
            Everything a student needs, in one place
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-7 shadow-soft transition-transform hover:-translate-y-1"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-brand">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">Programs</p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-deep sm:text-4xl">
              Classes and subjects we cover
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {programs.map((p) => (
              <article key={p.title} className="rounded-2xl border border-border bg-card p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand-deep">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold tracking-wide text-brand-deep uppercase">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">{p.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.subjects.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 cursor-pointer"
            >
              View all courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-deep sm:text-4xl">
              From doubt to mastery in four steps
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Example: struggling with Quadratic Equations? The AI starts from the basic concept,
              shows a worked example, gives easy questions, then gradually moves you to advanced
              problems.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
              <Camera className="h-5 w-5 text-brand" />
              <span className="text-sm text-muted-foreground">
                Snap a question photo — get the full solution
              </span>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <img src="/ai_learning_image.png" alt="AI learning on a smartphone" className="h-64 w-full object-cover" />
            </div>
          </div>
          <ol className="grid gap-5 sm:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="font-display text-sm font-semibold text-accent">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-brand px-6 py-14 text-center shadow-lift sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-balance text-primary-foreground sm:text-4xl">
            Ready to learn at your own pace?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/85">
            Join students across Sahibganj who study with live teachers and an AI companion,
            available 24 hours a day, 7 days a week.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-7 py-3.5 text-sm font-semibold text-brand-deep transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              Enroll Now <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+919431945860"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/40 px-7 py-3.5 text-sm font-semibold text-primary-foreground cursor-pointer"
            >
              Call +91 94319 45860
            </a>
          </div>
        </div>
      </section>
      <Chatbot/>
    </>
  );
}
