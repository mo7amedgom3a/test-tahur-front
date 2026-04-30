import { Stethoscope, Users as UsersIcon, CalendarCheck, Loader2 } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { weeklyActivity } from "@/data/mock"; // Keep mock for chart for now
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Calendar, Inbox } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";

export default function Dashboard() {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await adminApi.getStats();
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

  const stats = {
    doctors: statsData?.physician_count || 0,
    patients: statsData?.patient_count || 0,
    appointmentsToday: statsData?.pending_requests?.length || 0,
  };

  const recentAppointments = statsData?.recent_orders || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        <p className="text-sm text-muted-foreground">نظرة عامة على أداء المنصة</p>
      </div>

      {/* Welcome + stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden rounded-2xl border-0 bg-gradient-hero p-6 text-primary-foreground shadow-elegant lg:col-span-1 md:col-span-2">
          <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 400 200" preserveAspectRatio="none">
            <circle cx="350" cy="50" r="60" fill="white" />
            <circle cx="380" cy="150" r="40" fill="white" opacity="0.6" />
          </svg>
          <div className="relative">
            <p className="text-2xl font-bold">مرحباً 👋</p>
            <p className="mt-1 text-sm opacity-90">نتمنى لك يوماً ملهماً ومثمراً</p>
            <p className="mt-4 text-xs opacity-75">منصة طهور للرعاية الصحية</p>
          </div>
        </Card>
        <StatCard label="إجمالي الأطباء" value={stats.doctors} icon={Stethoscope} variant="primary" trend="محدث الآن" />
        <StatCard label="إجمالي المرضى" value={stats.patients} icon={UsersIcon} variant="primary" trend="محدث الآن" />
        <StatCard label="طلبات معلقة" value={stats.appointmentsToday} icon={CalendarCheck} variant="info" trend={`${stats.appointmentsToday} طلب`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity chart */}
        <Card className="lg:col-span-2 rounded-2xl border bg-card p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">النشاط الأسبوعي</h3>
              <p className="text-xs text-muted-foreground">المواعيد والاستشارات خلال الأسبوع (بيانات افتراضية)</p>
            </div>
          </div>
          <div className="h-64" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyActivity}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.45}/>
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.45}/>
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false}/>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }}/>
                <Area type="monotone" dataKey="مواعيد" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#g1)"/>
                <Area type="monotone" dataKey="استشارات" stroke="hsl(var(--accent))" strokeWidth={2.5} fill="url(#g2)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pending requests */}
        <Card className="rounded-2xl border bg-card p-6 shadow-soft">
          <h3 className="text-lg font-bold mb-4">أحدث الطلبات المعلقة</h3>
          {statsData?.pending_requests && statsData.pending_requests.length > 0 ? (
            <div className="space-y-3">
              {statsData.pending_requests.slice(0, 4).map(req => (
                <div key={req.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {req.patient?.full_name?.charAt(0) || "P"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{req.patient?.full_name || (req as any).Patient?.full_name || "-"}</p>
                    <p className="text-xs text-muted-foreground">{req.appointment_date}</p>
                  </div>
                  <StatusBadge status="pending" label="معلق" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-secondary p-4 mb-3">
                <Inbox className="h-8 w-8 text-secondary-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">لا توجد طلبات معلقة</p>
            </div>
          )}
        </Card>
      </div>

      {/* Latest appointments */}
      <Card className="rounded-2xl border bg-card p-6 shadow-soft">
        <h3 className="text-lg font-bold mb-4">أحدث المواعيد</h3>
        <div className="space-y-3">
          {recentAppointments.length > 0 ? (
            recentAppointments.slice(0, 5).map(a => (
              <div key={a.id} className="flex items-center gap-4 rounded-xl border bg-background/50 p-4 transition-smooth hover:bg-secondary/40 hover:shadow-soft">
                <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold">
                    {a.physician?.full_name?.charAt(0) || (a as any).Physician?.full_name?.charAt(0) || "D"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">رقم الموعد #{a.id}</span>
                    <StatusBadge 
                      status={
                        a.appointment_status === 4 ? "completed" : 
                        a.appointment_status === 1 ? "pending" : 
                        a.appointment_status === 2 ? "active" : "rejected"
                      }
                      label={
                        a.appointment_status === 1 ? "قيد الانتظار" : 
                        a.appointment_status === 2 ? "مقبول" : 
                        a.appointment_status === 3 ? "ملغي" : "مكتمل"
                      } 
                    />
                  </div>
                  <p className="text-sm text-accent font-medium mt-1">د. {a.physician?.full_name || (a as any).Physician?.full_name || "-"}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">المريض: {a.patient?.full_name || (a as any).Patient?.full_name || "-"}</p>
                </div>
                <div className="hidden sm:flex flex-col items-end text-xs gap-1">
                  <span className="inline-flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3"/>{a.appointment_date}</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground font-bold text-primary">SAR {Number(a.amount || 0).toFixed(2)}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-8 text-muted-foreground">لا توجد مواعيد حالياً</p>
          )}
        </div>
      </Card>
    </div>
  );
}
