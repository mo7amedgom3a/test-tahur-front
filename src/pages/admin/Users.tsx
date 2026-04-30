import { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Power, PowerOff, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { toast } from "sonner";

export default function Users() {
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const [role, setRole] = useState<string>("all");

  const { data: usersData, isLoading } = useQuery({
    queryKey: ["adminUsers", role, q],
    queryFn: async () => {
      const res = await adminApi.getUsers({ 
        role: role === "all" ? undefined : role, 
        search: q || undefined,
        status: undefined // Add status filter if needed
      });
      return res.data || [];
    }
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: number }) => 
      adminApi.toggleUserStatus(id, status === 1 ? 0 : 1),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "تم تحديث حالة المستخدم بنجاح");
        queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      } else {
        toast.error(res.message || "فشل تحديث الحالة");
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
      <PageHeader title="جميع المستخدمين" subtitle="إدارة حسابات الأطباء والمرضى" back />

      <Card className="rounded-2xl border bg-card shadow-soft overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b bg-secondary/30">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="ابحث بالاسم، البريد أو الهاتف..." 
              value={q} 
              onChange={e => setQ(e.target.value)} 
              className="ps-3 pe-10 rounded-xl" 
            />
          </div>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-full sm:w-48 rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأدوار</SelectItem>
              <SelectItem value="1">المرضى</SelectItem>
              <SelectItem value="2">الأطباء</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="text-right">#</TableHead>
                <TableHead className="text-right">الاسم</TableHead>
                <TableHead className="text-right">البريد الإلكتروني</TableHead>
                <TableHead className="text-right">الهاتف</TableHead>
                <TableHead className="text-right">الدور</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData && usersData.length > 0 ? (
                usersData.map(u => (
                  <TableRow key={u.id} className="transition-smooth hover:bg-secondary/30">
                    <TableCell className="font-semibold text-muted-foreground">{u.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-bold">
                            {u.full_name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{u.full_name || "—"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{u.email || "—"}</TableCell>
                    <TableCell className="text-sm font-mono" dir="ltr">{u.phone_number}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${u.role === 2 ? "bg-accent/15 text-accent" : "bg-info/15 text-info"}`}>
                        {u.role_label || (u.role === 2 ? "طبيب" : "مريض")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={u.status === 1 ? "active" : "inactive"} label={u.status === 1 ? "نشط" : "موقوف"} />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm" 
                        onClick={() => toggleMutation.mutate({ id: u.encrypted_id!, status: u.status })}
                        disabled={toggleMutation.isPending}
                        className={`rounded-xl gap-1.5 ${u.status === 1
                          ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          : "bg-success text-success-foreground hover:bg-success/90"}`}
                      >
                        {u.status === 1 ? <><PowerOff className="h-3.5 w-3.5"/>إيقاف</> : <><Power className="h-3.5 w-3.5"/>تنشيط</>}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    لا يوجد مستخدمين يطابقون البحث
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
