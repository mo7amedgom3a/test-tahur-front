import { Globe, Building2, Headphones } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "الرعاية عبر الإنترنت",
    desc: "تواصل مع أفضل المؤهلين في أي وقت ومن أي مكان، احصل على نصائح طبية بطريقة معاصرة دون مغادرة منزلك.",
  },
  {
    icon: Building2,
    title: "خدمة العيادة",
    desc: "احجز استشارات شخصية في عياداتنا الطبية، استمتع بالرعاية المخصصة والتشخيص الموثوق مع نخبة من المختصين.",
  },
  {
    icon: Headphones,
    title: "الدعم المجاني",
    desc: "احصل على الإرشاد والمساعدة الصحية على مدار الساعة دون أي تكلفة إضافية، فريقنا هنا للإجابة عن استفساراتك دائماً.",
  },
];

export function Features() {
  return (
    <section id="about" className="container mx-auto px-4 lg:px-8 pb-12">
      <div className="relative bg-gradient-primary rounded-[2rem] lg:rounded-[2.5rem] p-8 lg:p-14 text-primary-foreground shadow-glow overflow-hidden">
        {/* decorative shapes */}
        <div className="blob bg-primary-foreground/15 w-72 h-72 -top-20 -right-10" />
        <div className="blob bg-mint/30 w-64 h-64 -bottom-16 left-1/3" />

        <div className="relative grid md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="text-center md:text-start">
                <div className="inline-flex w-14 h-14 rounded-2xl bg-primary-foreground/15 backdrop-blur items-center justify-center mb-4 ring-1 ring-primary-foreground/20">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-primary-foreground/85 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
