import { Plus } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-deep text-primary-foreground mt-20">
      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary-foreground/15 backdrop-blur flex items-center justify-center">
                <Plus className="w-5 h-5" strokeWidth={3} />
              </div>
              <div>
                <div className="font-display text-2xl font-extrabold">طهور</div>
                <div className="text-[10px] tracking-widest opacity-70 uppercase">Tahur</div>
              </div>
            </div>
            <p className="text-sm opacity-75 leading-relaxed">
              منصة طبية رقمية تربطك بأفضل الأطباء في المملكة العربية السعودية على مدار الساعة.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-base">معلومات</h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              <li><a href="#about" className="hover:opacity-100 hover:underline">من نحن</a></li>
              <li><a href="#" className="hover:opacity-100 hover:underline">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:opacity-100 hover:underline">مساعدة</a></li>
              <li><a href="#" className="hover:opacity-100 hover:underline">الشروط والأحكام</a></li>
              <li><a href="#" className="hover:opacity-100 hover:underline">طلب حذف الحساب</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-base">تواصل معنا</h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              <li>الرياض، المملكة العربية السعودية</li>
              <li>support@tahur.sa</li>
              <li dir="ltr" className="text-end">+966 11 000 0000</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-base">حمّل التطبيق</h4>
            <div className="flex flex-col gap-2.5">
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur px-4 py-2.5 transition-colors">
                <span className="text-xs opacity-70">حمّله من</span>
                <span className="font-semibold text-sm">Google Play</span>
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur px-4 py-2.5 transition-colors">
                <span className="text-xs opacity-70">حمّله من</span>
                <span className="font-semibold text-sm">App Store</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/15 text-center text-xs opacity-70">
          © 2026 طهور. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
