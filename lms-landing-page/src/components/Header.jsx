import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";


export const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/ai-tutor", label: "AI Tutor" },
  { to: "/live-tutoring", label: "Live Tutoring" },
  { to: "/study-material", label: "Study Material" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-1 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3 cursor-pointer">
          <img
            src="/logo.png"
            alt="Nawdeep Mahila Sangh logo"
            width={512}
            height={512}
            className="h-16 w-16 shrink-0"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-base leading-tight font-semibold text-brand-deep sm:text-lg">
              Nawdeep Mahila Sangh
            </span>
            <span className="block truncate text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Learning Platform
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-brand bg-secondary" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="tel:+919431945860"
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Phone className="h-4 w-4" /> Talk to a Teacher
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-brand-deep lg:hidden cursor-pointer"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-5 sm:px-6 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-brand" }}
              className="block border-b border-border/60 py-3 text-sm font-medium text-foreground cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="tel:+919431945860"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground cursor-pointer"
          >
            <Phone className="h-4 w-4" /> Talk to a Teacher
          </a>
        </nav>
      )}
    </header>
  );
}
