import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff, UserPlus } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    agree: false,
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("الرجاء تعبئة جميع الحقول");
      return;
    }
    if (form.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    if (!form.agree) {
      setError("الرجاء الموافقة على الشروط والأحكام");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 800);
  };

  return (
    <AuthLayout
      title="انضم إلى طهور 🌿"
      subtitle="أنشئ حسابك في أقل من دقيقة وابدأ رحلتك الصحية"
      footer={
        <>
          لديك حساب بالفعل؟{" "}
          <Link to="/login" className="font-semibold text-primary hover:text-primary-deep">
            تسجيل الدخول
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">الاسم الكامل</label>
          <div className="relative">
            <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="محمد العتيبي"
              className="w-full h-12 rounded-xl border border-border bg-background pr-11 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            البريد الإلكتروني
          </label>
          <div className="relative">
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full h-12 rounded-xl border border-border bg-background pr-11 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">رقم الجوال</label>
          <div className="relative">
            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="05xxxxxxxx"
              dir="ltr"
              className="w-full h-12 rounded-xl border border-border bg-background pr-11 pl-4 text-sm text-right focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">كلمة المرور</label>
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="6 أحرف على الأقل"
              className="w-full h-12 rounded-xl border border-border bg-background pr-11 pl-11 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
              aria-label="إظهار كلمة المرور"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <label className="flex items-start gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(e) => setForm({ ...form, agree: e.target.checked })}
            className="w-4 h-4 mt-0.5 rounded border-border accent-primary"
          />
          <span className="text-muted-foreground">
            أوافق على{" "}
            <a href="#" className="text-primary hover:text-primary-deep font-medium">
              الشروط والأحكام
            </a>{" "}
            و{" "}
            <a href="#" className="text-primary hover:text-primary-deep font-medium">
              سياسة الخصوصية
            </a>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow-soft hover:bg-primary-deep hover:shadow-glow transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          {loading ? "جارٍ إنشاء الحساب..." : "إنشاء الحساب"}
        </button>
      </form>
    </AuthLayout>
  );
}
