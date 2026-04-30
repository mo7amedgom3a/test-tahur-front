import { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ShieldAlert, Trash2, Loader2, Slash } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { toast } from "sonner";

export default function Reports() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: reports, isLoading } = useQuery({
    queryKey: ["adminReports", search],
    queryFn: async () => {
      const res = await adminApi.getReports({ search: search || undefined });
      return res.data || [];
    }
  });

  const blockMutation = useMutation({
    mutationFn: (id: number) => adminApi.blockUser(id),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "تم حظر المستخدم بنجاح");
        queryClient.invalidateQueries({ queryKey: ["adminReports"] });
      } else {
        toast.error(res.message || "فشل حظر المستخدم");
      }
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (encrypted_id: string) => adminApi.deleteReport(encrypted_id),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "تم حذف البلاغ");
        queryClient.invalidateQueries({ queryKey: ["adminReports"] });
      } else {
        toast.error(res.message || "فشل حذف البلاغ");
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
      <PageHeader title="إدارة البلاغات" subtitle="مراجعة بلاغات المستخدمين واتخاذ الإجراءات" back />

      <Card className="rounded-2xl border bg-card shadow-soft overflow-hidden">
        <div className="p-4 border-b bg-secondary/30">
          <div className="relative max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="ابحث في البلاغات..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              className="ps-3 pe-10 rounded-xl" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="text-right">#</TableHead>
                <TableHead className="text-right">المُبلّغ</TableHead>
                <TableHead className="text-right">المُبلّغ ضده</TableHead>
                <TableHead className="text-right">السبب</TableHead>
                <TableHead className="text-right">الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports && reports.length > 0 ? (
                reports.map(r => (
                  <TableRow key={r.id} className="transition-smooth hover:bg-secondary/30">
                    <TableCell className="font-semibold text-muted-foreground">{r.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                            {r.reported_by?.full_name?.charAt(0) || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{r.reported_by?.full_name || "—"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 ring-2 ring-destructive/20">
                          <AvatarFallback className="bg-destructive/10 text-destructive text-xs font-bold">
                            {r.reported_to?.full_name?.charAt(0) || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{r.reported_to?.full_name || "—"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {r.reason || "لا يوجد سبب محدد"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {r.reported_to && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => blockMutation.mutate(r.reported_to!.id)}
                            disabled={blockMutation.isPending}
                            className="rounded-xl gap-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Slash className="h-3.5 w-3.5" />حظر
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => deleteMutation.mutate(r.encrypted_id!)}
                          disabled={deleteMutation.isPending}
                          className="rounded-xl h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                    لا توجد بلاغات حالياً
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
