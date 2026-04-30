import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { 
  Calendar, Clock, MessageCircle, Mic, Video, 
  CreditCard, Wifi, Mail, Phone, Loader2, 
  User as UserIcon, Wallet, CheckCircle2,
  AlertCircle, ShieldCheck, HelpCircle
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";

export default function AppointmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: a, isLoading, isError } = useQuery({
    queryKey: ["adminAppointment", id],
    queryFn: async () => {
      const res = await adminApi.getAppointment(Number(id));
      if (!res.success) throw new Error(res.message);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !a) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-destructive/10 mb-4">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <p className="text-xl font-bold">الموعد غير موجود</p>
        <p className="text-muted-foreground mt-2">عذراً، لم نتمكن من العثور على بيانات هذا الموعد</p>
        <button 
          onClick={() => navigate("/admin/appointments")} 
          className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-smooth"
        >
          العودة لقائمة المواعيد
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader 
        title={`رقم الموعد #${a.id}`} 
        subtitle="تفاصيل الاستشارة والبيانات الكاملة للموعد" 
        back 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-2xl border-0 bg-card shadow-elegant overflow-hidden">
            <div className="bg-gradient-hero p-8 text-primary-foreground relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white"></path>
                </svg>
              </div>
              
              <div className="relative flex justify-between items-start">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider">
                    {a.physician?.role_label || "Family Medicine Physician"}
                  </span>
                  <h2 className="text-4xl font-black mt-2">رقم الموعد #{a.id}</h2>
                  <p className="opacity-90 font-medium flex items-center gap-2 mt-1">
                    <Wifi className="h-4 w-4" /> استشارة عبر الإنترنت فردية
                  </p>
                </div>
                
                <div className="text-left bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <p className="text-xs font-bold opacity-80 mb-1">قيمة الاستشارة</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">SAR</span>
                    <span className="text-4xl font-black">{Number(a.amount || 0).toFixed(0)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  <div className="h-10 w-10 rounded-full border-2 border-primary bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-full border-2 border-primary bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Mic className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-full border-2 border-primary bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Video className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-sm font-bold">دردشة، صوت، فيديو، استشارة</p>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">التاريخ</p>
                      <p className="text-lg font-black mt-0.5" dir="ltr">{a.appointment_date}</p>
                      <p className="text-sm text-muted-foreground">Wednesday</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">الوقت</p>
                      <p className="text-lg font-black mt-0.5" dir="ltr">{a.slot_start || "N/A"}</p>
                      <p className="text-sm text-accent font-bold mt-1">سيقوم الطبيب بالاتصال بين {a.slot_start || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-success/10 flex items-center justify-center shrink-0">
                      <CreditCard className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">طريقة الدفع</p>
                      <p className="text-lg font-black mt-0.5">بطاقة</p>
                      <div className="flex items-center gap-1.5 text-success font-bold text-xs mt-1">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {a.payment_status === 1 ? "عملية دفع مؤكدة" : "في انتظار التأكيد"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-info/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-info" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">حالة الموعد</p>
                      <div className="mt-1">
                        <StatusBadge 
                          status={
                            a.appointment_status === 4 ? "completed" : 
                            a.appointment_status === 1 ? "pending" : 
                            a.appointment_status === 2 ? "active" : "rejected"
                          }
                          label={
                            a.appointment_status === 1 ? "قيد الانتظار" : 
                            a.appointment_status === 2 ? "مقبول" : 
                            a.appointment_status === 3 ? "ملغي" : "اكتمل"
                          } 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-dashed flex flex-col md:flex-row gap-6 justify-between items-center bg-secondary/20 rounded-3xl p-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-primary flex items-center justify-center text-white shadow-lg">
                    <HelpCircle className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg">هل تحتاج للمساعدة؟</h4>
                    <p className="text-sm text-muted-foreground">فريق الدعم الفني جاهز لخدمتك على مدار الساعة</p>
                  </div>
                </div>
                <button className="px-8 py-3 bg-white border-2 border-primary text-primary font-black rounded-2xl hover:bg-primary hover:text-white transition-all shadow-soft">
                  تواصل معنا
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Info Section */}
        <div className="space-y-6">
          {/* Doctor Card */}
          <Card className="rounded-2xl border-0 bg-card shadow-elegant p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
            <h3 className="text-xl font-black mb-6 flex items-center gap-2 text-primary">
              <span className="h-8 w-1.5 bg-primary rounded-full" />
              الطبيب
            </h3>
            
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-28 w-28 ring-4 ring-primary/10 shadow-xl mb-4">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-3xl font-black">
                  {a.physician?.full_name?.charAt(0) || "D"}
                </AvatarFallback>
              </Avatar>
              
              <h4 className="text-2xl font-black">{a.physician?.full_name || "—"}</h4>
              <p className="text-accent font-bold mt-1">{a.physician?.role_label || "Family Medicine Physician"}</p>
              
              <div className="w-full mt-8 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-secondary/40 border border-secondary">
                  <span className="text-xs font-bold text-muted-foreground uppercase">البريد الإلكتروني</span>
                  <span className="text-sm font-medium">{a.physician?.email || "—"}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-secondary/40 border border-secondary" dir="ltr">
                  <span className="text-sm font-black text-primary">{a.physician?.phone_number || "—"}</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase">الهاتف</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Patient Card */}
          <Card className="rounded-2xl border-0 bg-card shadow-elegant p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
            <h3 className="text-xl font-black mb-6 flex items-center gap-2 text-accent">
              <span className="h-8 w-1.5 bg-accent rounded-full" />
              المريض
            </h3>
            
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-28 w-28 ring-4 ring-accent/10 shadow-xl mb-4">
                <AvatarFallback className="bg-gradient-accent text-accent-foreground text-3xl font-black">
                  {a.patient?.full_name?.charAt(0) || "P"}
                </AvatarFallback>
              </Avatar>
              
              <h4 className="text-2xl font-black">{a.patient?.full_name || "—"}</h4>
              <p className="text-muted-foreground font-medium mt-1">رقم المريض: {a.patient?.id}</p>
              
              <div className="w-full mt-8 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-secondary/40 border border-secondary">
                  <span className="text-xs font-bold text-muted-foreground uppercase">البريد الإلكتروني</span>
                  <span className="text-sm font-medium">{a.patient?.email || "—"}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-secondary/40 border border-secondary" dir="ltr">
                  <span className="text-sm font-black text-accent">{a.patient?.phone_number || "—"}</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase">الهاتف</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Wallet Info */}
          <Card className="rounded-2xl border-0 bg-gradient-to-br from-primary to-accent p-6 text-white shadow-elegant">
            <div className="flex items-center justify-between mb-4">
              <Wallet className="h-8 w-8 opacity-80" />
              <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">سجل المحفظة</span>
            </div>
            <p className="text-sm opacity-80 font-medium">الربح الصافي من الموعد</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black">SAR</span>
              <span className="text-4xl font-black">{(Number(a.amount || 0) * 0.8).toFixed(2)}</span>
            </div>
            <p className="text-[10px] opacity-70 mt-4 leading-relaxed">
              * تم احتساب الربح الصافي بعد خصم عمولة المنصة (20%)
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
