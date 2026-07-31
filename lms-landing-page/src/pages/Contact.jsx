import PageHero from "@/components/PageHero";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to our admission team"
        description="Share your class and subject requirement — we will connect you with a teacher and set up your learning plan."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            <div className="flex gap-4 rounded-2xl border border-border bg-card p-6">
              <MapPin className="h-5 w-5 shrink-0 text-brand" />
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-foreground">Address</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Gulli Bhatta, Sahibganj (Jharkhand) - 816109
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-border bg-card p-6">
              <Phone className="h-5 w-5 shrink-0 text-brand" />
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-foreground">Mobile</h2>
                <a href="tel:+919431945860" className="mt-1 block text-sm text-muted-foreground">
                  +91 94319 45860
                </a>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-border bg-card p-6">
              <Mail className="h-5 w-5 shrink-0 text-brand" />
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-foreground">Email</h2>
                <a
                  href="mailto:info@nawdeepmahilasangh.org"
                  className="mt-1 block text-sm break-all text-muted-foreground"
                >
                  info@nawdeepmahilasangh.org
                </a>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-2xl border border-border bg-card p-7 shadow-soft"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="font-medium text-foreground">Student name</span>
                <input
                  required
                  className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-brand"
                  placeholder="Your full name"
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-foreground">Mobile number</span>
                <input
                  required
                  type="tel"
                  className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-brand"
                  placeholder="10-digit mobile"
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-foreground">Class</span>
                <select className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-brand">
                  <option>Class 9th</option>
                  <option>Class 10th</option>
                  <option>Class 11th</option>
                  <option>Class 12th</option>
                  <option>JEE / NEET</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="font-medium text-foreground">Preferred language</span>
                <select className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-brand">
                  <option>Hindi</option>
                  <option>English</option>
                  <option>Hindi + English</option>
                </select>
              </label>
            </div>
            <label className="mt-5 block text-sm">
              <span className="font-medium text-foreground">Message</span>
              <textarea
                rows={4}
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-brand"
                placeholder="Which subject do you need help with?"
              />
            </label>
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
            >
              {sent ? "Thank you! We will call you soon." : "Request a Call Back"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
