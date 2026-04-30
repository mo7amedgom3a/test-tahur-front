import { Play, Apple, Smartphone } from "lucide-react";

export function AppDownload() {
  return (
    <section id="contact" className="container mx-auto px-4 lg:px-8 py-16">
      <div className="relative bg-gradient-primary rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-glow text-primary-foreground">
        <div className="blob bg-primary-foreground/20 w-80 h-80 -top-20 right-0" />
        <div className="blob bg-mint/40 w-72 h-72 -bottom-20 -left-20" />

        <div className="relative grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-14">
          <div className="text-center lg:text-start">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur rounded-full px-3 py-1 text-xs font-semibold mb-5">
              <Smartphone className="w-3.5 h-3.5" /> متاح الآن
            </div>
            <h2 className="font-display text-3xl lg:text-5xl font-extrabold leading-tight">
              متاح على الهاتف المحمول،
              <br /> قم بالتنزيل فقط!
            </h2>
            <p className="mt-4 text-primary-foreground/85 max-w-md mx-auto lg:mx-0">
              احمل طهور في جيبك واحجز استشارتك في أي وقت وأي مكان داخل المملكة.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 justify-center lg:justify-start">
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-primary-foreground text-primary-deep px-5 py-3 font-semibold hover:scale-[1.02] transition-transform shadow-soft">
                <Play className="w-4 h-4 fill-current" />
                <span className="text-start leading-none">
                  <span className="block text-[10px] opacity-70 mb-0.5">حمّله من</span>
                  <span className="block text-sm">Google Play</span>
                </span>
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 backdrop-blur border border-primary-foreground/30 text-primary-foreground px-5 py-3 font-semibold hover:bg-primary-foreground/25 transition-colors">
                <Apple className="w-4 h-4 fill-current" />
                <span className="text-start leading-none">
                  <span className="block text-[10px] opacity-70 mb-0.5">حمّله من</span>
                  <span className="block text-sm">App Store</span>
                </span>
              </a>
            </div>
          </div>

          {/* Phone mockups */}
          <div className="relative h-72 lg:h-96 hidden md:block">
            <div className="absolute right-1/2 translate-x-1/2 top-0 w-48 lg:w-56 h-full rounded-[2.5rem] bg-background border-[6px] border-primary-deep/40 shadow-glow overflow-hidden rotate-[-6deg]">
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute right-1/2 translate-x-[120%] top-8 w-48 lg:w-56 h-[85%] rounded-[2.5rem] bg-background border-[6px] border-primary-deep/40 shadow-glow overflow-hidden rotate-[8deg]">
              <img
                src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
