import { Link } from "react-router-dom";
import { Star, Clock, ArrowLeft } from "lucide-react";
import type { Doctor } from "@/data/doctors";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Link
      to={`/doctors/${doctor.id}`}
      className="group block bg-card rounded-3xl overflow-hidden border border-border/60 shadow-card hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-primary-soft">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-background/95 backdrop-blur rounded-full px-2.5 py-1 text-xs font-semibold shadow-soft">
          <Star className="w-3 h-3 fill-coral text-coral" />
          {doctor.rating}
        </div>
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 bg-mint text-mint-foreground rounded-full px-2.5 py-1 text-[10px] font-semibold">
          <Clock className="w-3 h-3" />
          متاح
        </div>
      </div>

      <div className="p-4">
        <div className="text-[11px] font-semibold text-primary uppercase tracking-wider">
          {doctor.specialtyName}
        </div>
        <h3 className="font-display text-base font-bold mt-1 text-foreground">{doctor.name}</h3>
        <div className="mt-1 text-xs text-muted-foreground">{doctor.experience} سنة خبرة · {doctor.reviews} مراجعة</div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{doctor.available}</span>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-soft text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
