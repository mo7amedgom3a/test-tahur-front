import heroDoctor from "@/assets/hero-doctor.png";
import { Star, CheckCircle2, Play, Apple } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
      {/* decorative blobs */}
      <div className="blob bg-primary-foreground/20 w-96 h-96 -top-20 -right-20" />
      <div className="blob bg-coral/40 w-72 h-72 bottom-0 left-10" />
      <div className="blob bg-mint/30 w-80 h-80 top-1/3 left-1/3" />

      <div className="container relative mx-auto px-4 lg:px-8 pt-12 lg:pt-20 pb-16 lg:pb-24 grid lg:grid-cols-2 gap-10 items-center">
        {/* Text side */}
        <div className="order-2 lg:order-1 text-center lg:text-start animate-fade-up">
          {/* Patient recover badge */}
          <div className="inline-flex items-center gap-3 bg-primary-foreground/95 text-primary-deep rounded-full ps-2 pe-5 py-2 shadow-glow mb-6">
            <div className="flex -space-x-2 rtl:space-x-reverse">
              {[
                "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80",
                "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80",
                "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=80",
                "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=80",
              ].map((src, i) => (
                <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-background object-cover" />
              ))}
            </div>
            <div className="text-start">
              <div className="font-bold text-base leading-none">+100k</div>
              <div className="text-[11px] text-muted-foreground leading-none mt-1">مريض تعافى</div>
            </div>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.15]">
            نرعاكَ بعلم
            <br />
            <span className="bg-gradient-to-l from-mint via-primary-foreground to-coral bg-clip-text text-transparent">
              نهتمُّ بقلب
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-primary-foreground/85 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            استشارات طبية فورية مع نخبة الأطباء في المملكة، حجز سهل ومتابعة
            موثوقة على مدار الساعة من راحة منزلك.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground text-primary-deep px-5 py-3 font-semibold shadow-soft hover:scale-[1.02] transition-transform"
            >
              <Play className="w-4 h-4 fill-current" />
              <span className="text-start leading-none">
                <span className="block text-[10px] opacity-70 mb-0.5">حمّله من</span>
                <span className="block text-sm">Google Play</span>
              </span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur text-primary-foreground border border-primary-foreground/30 px-5 py-3 font-semibold hover:bg-primary-foreground/20 transition-colors"
            >
              <Apple className="w-4 h-4 fill-current" />
              <span className="text-start leading-none">
                <span className="block text-[10px] opacity-70 mb-0.5">حمّله من</span>
                <span className="block text-sm">App Store</span>
              </span>
            </a>
          </div>
        </div>

        {/* Image side */}
        <div className="order-1 lg:order-2 relative">
          <div className="relative max-w-md mx-auto">
            {/* Doctor photo */}
            <img
              src={heroDoctor}
              alt="طبيب طهور"
              className="relative z-10 w-full h-auto drop-shadow-2xl animate-float"
            />

            {/* Floating doctor card */}
            <div className="absolute z-20 left-2 lg:-left-6 bottom-12 bg-background text-foreground rounded-2xl shadow-glow p-3 w-56 animate-fade-up">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120"
                  alt=""
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm">د. شيخة فيرما</div>
                  <div className="text-[11px] text-muted-foreground">جلدية · 15 سنة خبرة</div>
                </div>
                <div className="text-mint">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs">
                <Star className="w-3.5 h-3.5 fill-coral text-coral" />
                <span className="font-semibold">4.9</span>
                <span className="text-muted-foreground">(320 مراجعة)</span>
              </div>
              <button className="mt-3 w-full bg-primary text-primary-foreground rounded-full py-2 text-sm font-semibold hover:bg-primary-deep transition-colors">
                احجز الآن
              </button>
            </div>

            {/* Stack of doctor mini cards */}
            <div className="absolute z-20 -bottom-4 right-0 lg:-right-8 flex">
              {[
                "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200",
                "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200",
                "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=200",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-16 h-20 rounded-xl object-cover border-2 border-background shadow-card -ms-3"
                  style={{ transform: `rotate(${(i - 1) * 6}deg)` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
