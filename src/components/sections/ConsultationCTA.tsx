import { Award, CalendarClock, UserCheck, ArrowLeft } from "lucide-react";

export function ConsultationCTA() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image side */}
        <div className="relative">
          <div className="relative rounded-[2rem] overflow-hidden shadow-glow aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=900&q=80&auto=format&fit=crop"
              alt="استشارة طبية"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/30 to-transparent" />
          </div>

          {/* small floating image */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-[6px] border-background shadow-glow">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80&auto=format&fit=crop"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* High Quality badge */}
          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-coral text-coral-foreground flex items-center justify-center shadow-glow rotate-12">
            <div className="text-center text-[10px] font-bold leading-tight">
              <Award className="w-6 h-6 mx-auto mb-1" />
              جودة <br /> عالية
            </div>
          </div>
        </div>

        {/* Text side */}
        <div>
          <div className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-3">
            خبرة طبية موثوقة
          </div>
          <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-primary-deep leading-tight">
            استشارة مع
            <br />
            طبيبنا المختص
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            احصل على الرعاية الصحية التي تستحقها من نخبة من الأطباء المعتمدين في
            المملكة، استشارات سرية ومخصصة لحالتك.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              { icon: CalendarClock, text: "جدولة سهلة عبر الإنترنت في ثوانٍ" },
              { icon: UserCheck, text: "رعاية مباشرة من قبل الخبراء المعتمدين" },
              { icon: Award, text: "ضمان الخصوصية وأعلى معايير الجودة" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </li>
              );
            })}
          </ul>

          <a
            href="#doctors"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold shadow-soft hover:bg-primary-deep hover:shadow-glow transition-all"
          >
            احصل على تطبيقنا
            <ArrowLeft className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
