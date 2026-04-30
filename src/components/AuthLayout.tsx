import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-5rem)] grid lg:grid-cols-2 bg-background" dir="rtl">
      {/* Visual side */}
      <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-gradient-primary p-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-accent/40 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-md text-primary-foreground text-center">
          <div className="inline-flex w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-sm items-center justify-center mb-6 shadow-glow">
            <Plus className="w-10 h-10" strokeWidth={3} />
          </div>
          <h2 className="font-display text-4xl font-extrabold mb-4">طهور</h2>
          <p className="text-lg opacity-90 leading-relaxed">
            رعاية صحية موثوقة على بعد نقرة واحدة. احجز استشارتك مع نخبة الأطباء في المملكة.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">+500</div>
              <div className="text-xs opacity-80">طبيب</div>
            </div>
            <div>
              <div className="text-2xl font-bold">+50K</div>
              <div className="text-xs opacity-80">مريض</div>
            </div>
            <div>
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-xs opacity-80">دعم</div>
            </div>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-soft">
              <Plus className="w-5 h-5 text-primary-foreground" strokeWidth={3} />
            </div>
            <span className="font-display text-2xl font-extrabold text-primary-deep">طهور</span>
          </Link>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-primary-deep">
            {title}
          </h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <div className="mt-8 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </div>
    </div>
  );
}
