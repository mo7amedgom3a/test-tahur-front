import { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Award, Check, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { toast } from "sonner";
import { User } from "@/lib/api/types";

export default function DoctorRequests() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<{ type: "doc" | "cert"; req: User } | null>(null);

  const { data: requests, isLoading } = useQuery({
    queryKey: ["adminDoctorRequests"],
    queryFn: async () => {
      const res = await adminApi.getDoctorRequests();
      return res.data || [];
    }
  });

  const approveMutation = useMutation({
    mutationFn: (id: number) => adminApi.approveDoctorRequest(id),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "تمت الموافقة على الطلب");
        queryClient.invalidateQueries({ queryKey: ["adminDoctorRequests"] });
      } else {
        toast.error(res.message || "فشل تحديث الطلب");
      }
    }
  });

  const rejectMutation = useMutation({
    mutationFn: (id: number) => adminApi.rejectDoctorRequest(id),
    onSuccess: (res) => {
      if (res.success) {
        toast.warning(res.message || "تم رفض الطلب");
        queryClient.invalidateQueries({ queryKey: ["adminDoctorRequests"] });
      } else {
        toast.error(res.message || "فشل تحديث الطلب");
      }
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
      <PageHeader title="طلبات تسجيل الأطباء" subtitle="مراجعة طلبات الأطباء الجدد" />

      <Card className="rounded-2xl border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="text-right">#</TableHead>
                <TableHead className="text-right">الاسم</TableHead>
                <TableHead className="text-right">البريد الإلكتروني</TableHead>
                <TableHead className="text-right">الهاتف</TableHead>
                <TableHead className="text-right">تاريخ الطلب</TableHead>
                <TableHead className="text-right">المستندات</TableHead>
                <TableHead className="text-right">الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests && requests.length > 0 ? (
                requests.map(r => (
                  <TableRow key={r.id} className="transition-smooth hover:bg-secondary/30">
                    <TableCell className="font-semibold text-muted-foreground">{r.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-gradient-accent text-accent-foreground text-xs font-bold">
                            {r.full_name?.charAt(0) || "D"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{r.full_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.email}</TableCell>
                    <TableCell className="text-sm font-mono" dir="ltr">{r.phone_number}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{r.created_at?.split('T')[0]}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => setOpen({ type: "doc", req: r })} className="gap-1.5 text-info hover:text-info">
                        <FileText className="h-4 w-4" />عرض الملفات
                      </Button>
                    </TableCell>
                    <TableCell>
                      {r.request_accepted === 1 ? (
                        <StatusBadge status="approved" label="تمت الموافقة" />
                      ) : r.request_accepted === 2 ? (
                        <StatusBadge status="rejected" label="مرفوض" />
                      ) : (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => approveMutation.mutate(r.id)}
                            disabled={approveMutation.isPending || rejectMutation.isPending}
                            className="rounded-xl gap-1 bg-success text-success-foreground hover:bg-success/90"
                          >
                            {approveMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin"/> : <Check className="h-3.5 w-3.5" />}
                            موافقة
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => rejectMutation.mutate(r.id)} 
                            disabled={approveMutation.isPending || rejectMutation.isPending}
                            variant="outline" 
                            className="rounded-xl gap-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            {rejectMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin"/> : <X className="h-3.5 w-3.5" />}
                            رفض
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    لا توجد طلبات تسجيل معلقة حالياً
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>ملفات الطبيب - {open?.req.full_name}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square rounded-xl border bg-secondary/40 flex flex-col items-center justify-center gap-2 transition-smooth hover:bg-secondary cursor-pointer">
              {open?.req.profile_image ? (
                <img src={open.req.profile_image} className="w-full h-full object-cover rounded-xl" alt="Profile" />
              ) : (
                <>
                  <FileText className="h-10 w-10 text-info" />
                  <span className="text-xs text-muted-foreground">صورة الهوية</span>
                </>
              )}
            </div>
            <div className="aspect-square rounded-xl border bg-secondary/40 flex flex-col items-center justify-center gap-2 transition-smooth hover:bg-secondary cursor-pointer">
              <Award className="h-10 w-10 text-accent" />
              <span className="text-xs text-muted-foreground">شهادة المزاولة</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
