import { Search, CalendarCheck, Video, FileText } from "lucide-react";

const steps = [
  { icon: Search, title: "اختر التخصص", desc: "تصفح التخصصات الطبية واختر الأنسب لحالتك" },
  { icon: CalendarCheck, title: "احجز موعدك", desc: "اختر الطبيب والوقت الذي يناسبك بضغطة واحدة" },
  { icon: Video, title: "استشر الطبيب", desc: "تواصل مباشر عبر مكالمة فيديو من أي مكان" },
  { icon: FileText, title: "احصل على الوصفة", desc: "تستلم وصفتك الطبية رقمياً فور انتهاء الاستشارة" },
];

export function HowItWorks() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-20 lg:py-24">
      <div className="text-center mb-14">
        <div className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-3">
          سهلة، سريعة، آمنة
        </div>
        <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-primary-deep">
          كيف يعمل طهور؟
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          أربع خطوات بسيطة تفصلك عن استشارتك الطبية القادمة
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
        {/* connecting line on desktop */}
        <div className="hidden lg:block absolute top-10 right-[12.5%] left-[12.5%] h-0.5 bg-gradient-to-l from-primary/30 via-primary/30 to-mint/30" />

        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="relative text-center">
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="w-20 h-20 rounded-3xl bg-card border border-border shadow-soft flex items-center justify-center text-primary">
                  <Icon className="w-9 h-9" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-soft">
                  {i + 1}
                </div>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
