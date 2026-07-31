import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { navItems } from "./Header";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Nawdeep Mahila Sangh logo"
              width={512}
              height={512}
              loading="lazy"
              className="h-10 w-10"
            />
            <span className="font-display text-lg font-semibold text-brand-deep">
              Nawdeep Mahila Sangh
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            24×7 live one-to-one tutoring and AI-powered personalized learning for Class 9–12,
            Board, JEE and NEET aspirants.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">Reg. No. 426/2006</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-brand cursor-pointer"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
            Programs
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>Class 9th & 10th — Maths, Science, English</li>
            <li>Class 11th & 12th — PCB, Maths, English, Hindi</li>
            <li>Board & School Exam Preparation</li>
            <li>JEE Preparation</li>
            <li>NEET Preparation</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              Gulli Bhatta, Sahibganj (Jharkhand) - 816109
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <a href="tel:+919431945860" className="hover:text-brand cursor-pointer">
                +91 94319 45860
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <a href="mailto:info@nawdeepmahilasangh.org" className="break-all hover:text-brand cursor-pointer">
                info@nawdeepmahilasangh.org
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Nawdeep Mahila Sangh. All rights reserved.
      </div>
    </footer>
  );
}
