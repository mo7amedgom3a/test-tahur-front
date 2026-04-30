import { useState } from "react";
import { doctors } from "@/data/doctors";
import { specialties } from "@/data/specialties";
import { DoctorCard } from "@/components/DoctorCard";

export function DoctorsGrid() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? doctors : doctors.filter((d) => d.specialty === filter);

  return (
    <section id="doctors" className="container mx-auto px-4 lg:px-8 py-20 lg:py-24">
      <div className="text-center mb-10">
        <div className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-3">
          نخبة موثوقة
        </div>
        <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-primary-deep">
          قابل الأطباء المختصين
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          أطباء معتمدون من جميع التخصصات بانتظار استشارتك
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            filter === "all"
              ? "bg-primary text-primary-foreground shadow-soft"
              : "bg-card text-foreground/70 border border-border hover:border-primary/40"
          }`}
        >
          الكل
        </button>
        {specialties.map((s) => (
          <button
            key={s.slug}
            onClick={() => setFilter(s.slug)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === s.slug
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-card text-foreground/70 border border-border hover:border-primary/40"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((d) => (
          <DoctorCard key={d.id} doctor={d} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-muted-foreground py-16">
          لا يوجد أطباء متاحون في هذا التخصص حالياً
        </div>
      )}
    </section>
  );
}
