import { Link } from "react-router-dom";
import { Plus, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/#specialties", label: "التخصصات" },
  { to: "/#doctors", label: "الأطباء" },
  { to: "/#about", label: "عن طهور" },
  { to: "/#contact", label: "تواصل" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border/60">
      <div className="container mx-auto px-4 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
            <Plus className="w-5 h-5 text-primary-foreground" strokeWidth={3} />
          </div>
          <div className="leading-none">
            <div className="font-display text-2xl font-extrabold text-primary-deep">طهور</div>
            <div className="text-[10px] tracking-widest text-muted-foreground uppercase">Tahur</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold text-primary-deep hover:bg-primary-soft transition-all"
          >
            دخول
          </Link>
          <Link
            to="/register"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary-deep hover:shadow-glow transition-all"
          >
            إنشاء حساب
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
            className="lg:hidden inline-flex w-10 h-10 items-center justify-center rounded-xl border border-border text-primary-deep"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:bg-primary-soft hover:text-primary-deep"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="h-11 inline-flex items-center justify-center rounded-xl border border-border text-sm font-semibold text-primary-deep"
              >
                دخول
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="h-11 inline-flex items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
              >
                إنشاء حساب
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
