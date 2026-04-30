import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "فاطمة العبدالله",
    location: "الرياض",
    rating: 5,
    text: "تجربة رائعة! حجزت استشارة مع طبيبة الأطفال خلال دقائق وكانت محترفة جداً. أنصح به بشدة.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80",
  },
  {
    name: "محمد القرني",
    location: "جدة",
    rating: 5,
    text: "خدمة ممتازة وأطباء على أعلى مستوى. وفّر علي وقت الانتظار في العيادات وأرسلوا الوصفة بسرعة.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80",
  },
  {
    name: "نورة السبيعي",
    location: "الدمام",
    rating: 5,
    text: "التطبيق سهل الاستخدام والاستشارة كانت مفيدة جداً. شعرت بالاهتمام والاحتراف من الطبيبة.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
  },
];

export function Testimonials() {
  return (
    <section className="bg-gradient-soft py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-3">
            ثقة آلاف المرضى
          </div>
          <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-primary-deep">
            ماذا يقول مرضانا
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-card rounded-3xl p-6 border border-border/60 shadow-card hover:shadow-soft transition-shadow"
            >
              <Quote className="absolute top-5 left-5 w-8 h-8 text-primary/15" />
              <div className="flex items-center gap-3 mb-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.location}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-coral text-coral" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
