import { Link } from "@tanstack/react-router";
import { specialties } from "@/data/specialties";
import { Stethoscope, Users, Brain, Baby, Sparkles, Heart, Activity, Smile, ArrowLeft } from "lucide-react";

const iconMap = { Stethoscope, Users, Brain, Baby, Sparkles, Heart, Activity, Smile };

const accentClasses: Record<string, string> = {
  primary: "from-primary to-primary-deep",
  mint: "from-mint to-[oklch(0.6_0.18_180)]",
  coral: "from-coral to-[oklch(0.6_0.2_350)]",
  deep: "from-primary-deep to-[oklch(0.24_0.14_290)]",
};

export function Specialties() {
  return (
    <section id="specialties" className="container mx-auto px-4 lg:px-8 py-20 lg:py-28">
      <div className="text-center mb-12 lg:mb-16">
        <div className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-3">
          خبراء في خدمتك
        </div>
        <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-primary-deep">
          تخصصاتنا الاستشارية
        </h2>
        <p className="mt-3 text-muted-foreground text-base max-w-xl mx-auto">
          اختر التخصص المناسب وتواصل مباشرة مع طبيب معتمد خلال دقائق
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
        {specialties.map((s) => {
          const Icon = iconMap[s.icon as keyof typeof iconMap];
          return (
            <Link
              key={s.slug}
              to="/specialties/$slug"
              params={{ slug: s.slug }}
              className="group relative bg-card rounded-3xl p-5 lg:p-6 border border-border/60 shadow-card hover:shadow-glow hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute -top-12 -left-12 w-32 h-32 rounded-full bg-gradient-to-br ${accentClasses[s.accent]} opacity-10 group-hover:opacity-20 transition-opacity blur-2xl`} />
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${accentClasses[s.accent]} flex items-center justify-center text-primary-foreground shadow-soft mb-4`}>
                {Icon && <Icon className="w-7 h-7" />}
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{s.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span>عرض الأطباء</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
