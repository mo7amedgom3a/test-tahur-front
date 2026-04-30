import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { adminApi } from "@/lib/api/admin";
import { setAuthToken } from "@/lib/api/client";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password) {
      setError("الرجاء تعبئة جميع الحقول");
      return;
    }
    setLoading(true);
    
    try {
      const response = await adminApi.login(form);
      
      if (response.success && response.data?.auth_token) {
        setAuthToken(response.data.auth_token);
        // Store user info if needed
        localStorage.setItem("tahur_user", JSON.stringify(response.data));
        navigate("/admin");
      } else {
        setError(response.message || "خطأ في تسجيل الدخول. يرجى التحقق من البيانات.");
      }
    } catch (err) {
      setError("تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="مرحباً بعودتك 👋"
      subtitle="سجّل الدخول للمتابعة إلى حسابك"
      footer={
        <>
          ليس لديك حساب؟{" "}
          <Link to="/register" className="font-semibold text-primary hover:text-primary-deep">
            إنشاء حساب جديد
          </Link>
          <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border text-xs text-muted-foreground text-center">
            <p className="font-bold mb-1">بيانات الدخول التجريبية (مشرف):</p>
            <p>admin@tahur.com / admin123</p>
          </div>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

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
          <label className="block text-sm font-medium text-foreground mb-2">كلمة المرور</label>
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
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

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary" />
            <span className="text-muted-foreground">تذكرني</span>
          </label>
          <a href="#" className="font-medium text-primary hover:text-primary-deep">
            نسيت كلمة المرور؟
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow-soft hover:bg-primary-deep hover:shadow-glow transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2"
        >
          <LogIn className="w-5 h-5" />
          {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-3 text-xs text-muted-foreground">أو تابع بـ</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full h-12 rounded-xl border border-border bg-background font-medium text-foreground hover:bg-muted transition inline-flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
          </svg>
          الاستمرار باستخدام Google
        </button>
      </form>
    </AuthLayout>
  );
}
