import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Loader2, Wallet } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { toast } from "sonner";

export default function Withdrawals() {
  const queryClient = useQueryClient();

  const { data: items, isLoading } = useQuery({
    queryKey: ["adminWithdrawals"],
    queryFn: async () => {
      const res = await adminApi.getWithdrawals();
      return res.data || [];
    }
  });

  const approveMutation = useMutation({
    mutationFn: (id: number) => adminApi.approveWithdrawal(id),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "تمت الموافقة على طلب السحب");
        queryClient.invalidateQueries({ queryKey: ["adminWithdrawals"] });
      } else {
        toast.error(res.message || "فشل معالجة الطلب");
      }
    }
  });

  const rejectMutation = useMutation({
    mutationFn: (id: number) => adminApi.rejectWithdrawal(id),
    onSuccess: (res) => {
      if (res.success) {
        toast.warning(res.message || "تم رفض طلب السحب");
        queryClient.invalidateQueries({ queryKey: ["adminWithdrawals"] });
      } else {
        toast.error(res.message || "فشل معالجة الطلب");
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
      <PageHeader title="طلبات السحب" subtitle="إدارة طلبات سحب الأرباح للأطباء" back />

      <Card className="rounded-2xl border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="text-right">الطبيب</TableHead>
                <TableHead className="text-right">المبلغ</TableHead>
                <TableHead className="text-right">بيانات البنك</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items && items.length > 0 ? (
                items.map(w => (
                  <TableRow key={w.id} className="transition-smooth hover:bg-secondary/30">
                    <TableCell className="font-medium">{w.doctor?.full_name || "—"}</TableCell>
                    <TableCell className="font-bold text-primary">SAR {w.amount}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {(w.doctor as any)?.bank_account?.bank?.name || "—"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge 
                        status={w.status === 1 ? "completed" : w.status === 0 ? "pending" : "rejected"}
                        label={w.status === 1 ? "تم السحب" : w.status === 0 ? "قيد الانتظار" : "مرفوض"} 
                      />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(w.created_at).toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell>
                      {w.status === 0 ? (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => approveMutation.mutate(w.id)}
                            disabled={approveMutation.isPending}
                            className="rounded-xl h-8 w-8 p-0 bg-success text-success-foreground hover:bg-success/90"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => rejectMutation.mutate(w.id)}
                            disabled={rejectMutation.isPending}
                            variant="outline"
                            className="rounded-xl h-8 w-8 p-0 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Wallet className="h-8 w-8 opacity-20" />
                      لا توجد طلبات سحب حالياً
                    </div>
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
