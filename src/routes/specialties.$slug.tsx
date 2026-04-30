import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { specialties } from "@/data/specialties";
import { getDoctorsBySpecialty } from "@/data/doctors";
import { DoctorCard } from "@/components/DoctorCard";

function SpecialtyNotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-bold">التخصص غير موجود</h1>
      <Link to="/" className="text-primary mt-4 inline-block">العودة للرئيسية</Link>
    </div>
  );
}

export default function SpecialtyPage() {
  const { slug } = useParams();
  const specialty = specialties.find((s) => s.slug === slug);
  const doctors = slug ? getDoctorsBySpecialty(slug) : [];

  if (!specialty) {
    return <SpecialtyNotFound />;
  }

  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground py-14 lg:py-20 relative overflow-hidden">
        <div className="blob bg-primary-foreground/15 w-72 h-72 -top-20 -right-10" />
        <div className="blob bg-mint/30 w-64 h-64 -bottom-20 left-10" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-1 text-sm opacity-80 hover:opacity-100 mb-4">
            <ArrowRight className="w-4 h-4" /> العودة للرئيسية
          </Link>
          <div className="text-xs font-semibold tracking-widest uppercase opacity-80 mb-2">تخصص</div>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold">{specialty.name}</h1>
          <p className="mt-3 text-primary-foreground/85 max-w-xl">{specialty.description}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="mb-8 text-sm text-muted-foreground">
          {doctors.length > 0 ? `${doctors.length} طبيب متاح` : "لا يوجد أطباء حالياً"}
        </div>

        {doctors.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {doctors.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-primary-soft rounded-3xl">
            <p className="text-muted-foreground mb-4">لم يتم إضافة أطباء لهذا التخصص بعد.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-2.5 font-semibold hover:bg-primary-deep transition-colors">
              تصفح جميع الأطباء
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
