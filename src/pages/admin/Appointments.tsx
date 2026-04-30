import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";

export default function Appointments() {
  const { data: list, isLoading } = useQuery({
    queryKey: ["adminAppointments"],
    queryFn: async () => {
      const res = await adminApi.getAppointments();
      return res.data || [];
    }
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="المواعيد" subtitle="جميع المواعيد والاستشارات" />

      <Card className="rounded-2xl border bg-card shadow-soft overflow-hidden">
        <div className="bg-gradient-to-l from-foreground to-foreground/85 px-6 py-4">
          <h2 className="text-xl font-bold text-background text-end">Appointments</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="text-right">ID</TableHead>
                <TableHead className="text-right">المريض</TableHead>
                <TableHead className="text-right">الطبيب</TableHead>
                <TableHead className="text-right">تاريخ الموعد</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">المبلغ</TableHead>
                <TableHead className="text-right">بداية الفترة</TableHead>
                <TableHead className="text-right">الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list && list.length > 0 ? (
                list.map(a => (
                  <TableRow key={a.id} className="transition-smooth hover:bg-secondary/30">
                    <TableCell className="font-semibold">{a.id}</TableCell>
                    <TableCell className="font-medium">{a.patient?.full_name || (a as any).Patient?.full_name || "—"}</TableCell>
                    <TableCell className="font-medium">د. {a.physician?.full_name || (a as any).Physician?.full_name || "—"}</TableCell>
                    <TableCell className="font-mono text-sm" dir="ltr">{a.appointment_date}</TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell className="font-bold text-primary">SAR {Number(a.amount || 0).toFixed(2)}</TableCell>
                    <TableCell className="font-mono text-sm" dir="ltr">{a.slot_start || "—"}</TableCell>
                    <TableCell>
                      <Button asChild size="icon" className="rounded-xl bg-info text-info-foreground hover:bg-info/90 h-8 w-8">
                        <Link to={`/admin/appointments/${a.id}`} aria-label="عرض"><Eye className="h-4 w-4"/></Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                    لا توجد مواعيد حالياً
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
