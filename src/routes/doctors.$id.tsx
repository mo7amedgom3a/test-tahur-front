import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Star, Clock, Award, CheckCircle2, Calendar, Video, X } from "lucide-react";
import { getDoctorById } from "@/data/doctors";

function DoctorNotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-bold">الطبيب غير موجود</h1>
      <Link to="/" className="text-primary mt-4 inline-block">العودة للرئيسية</Link>
    </div>
  );
}

export default function DoctorPage() {
  const { id } = useParams();
  const doctor = id ? getDoctorById(id) : undefined;
  const [showBooking, setShowBooking] = useState(false);
  const [booked, setBooked] = useState(false);

  if (!doctor) {
    return <DoctorNotFound />;
  }

  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground pt-12 pb-32 relative overflow-hidden">
        <div className="blob bg-primary-foreground/15 w-72 h-72 -top-20 -right-10" />
        <div className="blob bg-mint/30 w-64 h-64 bottom-0 left-1/4" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-1 text-sm opacity-80 hover:opacity-100 mb-2">
            <ArrowRight className="w-4 h-4" /> العودة
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 -mt-24 relative z-10 pb-20">
        <div className="bg-card rounded-3xl shadow-glow p-6 lg:p-10 grid lg:grid-cols-[300px_1fr] gap-8">
          {/* photo */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-mint text-mint-foreground rounded-full px-3 py-1 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> معتمد
            </div>
          </div>

          {/* info */}
          <div>
            <div className="text-sm font-semibold text-primary uppercase tracking-widest">{doctor.specialtyName}</div>
            <h1 className="font-display text-3xl lg:text-5xl font-extrabold text-primary-deep mt-2">{doctor.name}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-coral text-coral" />
                <span className="font-bold">{doctor.rating}</span>
                <span className="text-muted-foreground">({doctor.reviews} مراجعة)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Award className="w-4 h-4" /> {doctor.experience} سنة خبرة
              </span>
              <span className="inline-flex items-center gap-1.5 text-mint">
                <Clock className="w-4 h-4" /> {doctor.available}
              </span>
            </div>

            <p className="mt-5 text-foreground/80 leading-relaxed">{doctor.bio}</p>

            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {[
                { icon: Video, label: "استشارة فيديو", value: "150 ر.س" },
                { icon: Calendar, label: "حجز عيادة", value: "200 ر.س" },
                { icon: CheckCircle2, label: "متابعة", value: "مجاني" },
              ].map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className="bg-primary-soft rounded-2xl p-4">
                    <Icon className="w-5 h-5 text-primary mb-2" />
                    <div className="text-xs text-muted-foreground">{p.label}</div>
                    <div className="font-bold text-primary-deep mt-0.5">{p.value}</div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowBooking(true)}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-soft hover:bg-primary-deep hover:shadow-glow transition-all"
            >
              احجز الآن
              <Calendar className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {showBooking && (
        <div className="fixed inset-0 z-50 bg-primary-deep/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => { setShowBooking(false); setBooked(false); }}>
          <div className="bg-card rounded-3xl p-8 max-w-md w-full shadow-glow relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { setShowBooking(false); setBooked(false); }} className="absolute top-4 left-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            {booked ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-mint/15 text-mint flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold">تم الحجز بنجاح!</h3>
                <p className="text-muted-foreground mt-2 text-sm">سيتم التواصل معك قريباً لتأكيد الموعد.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold text-primary-deep">تأكيد الحجز</h3>
                <p className="text-muted-foreground text-sm mt-2">حجز استشارة مع {doctor.name}</p>
                <div className="mt-5 bg-primary-soft rounded-2xl p-4 text-sm space-y-2">
                  <div className="flex justify-between"><span className="text-muted-foreground">التخصص</span><span className="font-semibold">{doctor.specialtyName}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">الموعد</span><span className="font-semibold">{doctor.available}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">الرسوم</span><span className="font-semibold text-primary">150 ر.س</span></div>
                </div>
                <button
                  onClick={() => setBooked(true)}
                  className="mt-6 w-full bg-primary text-primary-foreground rounded-full py-3 font-semibold hover:bg-primary-deep transition-colors"
                >
                  تأكيد وإتمام الحجز
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
