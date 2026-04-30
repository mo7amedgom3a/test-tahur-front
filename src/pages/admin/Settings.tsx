import { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Save, CreditCard, Percent } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { toast } from "sonner";

export default function Settings() {
  const [fees, setFees] = useState<Record<string, string>>({});
  const [moyasarKey, setMoyasarKey] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["adminSettings"],
    queryFn: async () => {
      const res = await adminApi.getSettings();
      return res.data;
    }
  });

  useEffect(() => {
    if (data?.roles) {
      const initialFees: Record<string, string> = {};
      data.roles.forEach((role: any) => {
        const key = `fee_${role.title.toLowerCase().replace(/\s+/g, '_')}`;
        initialFees[key] = role.fee || "0";
      });
      setFees(initialFees);
    }
    if (data?.moyasar_api_key) {
      setMoyasarKey(data.moyasar_api_key.value || "");
    }
  }, [data]);

  const updateFeesMutation = useMutation({
    mutationFn: (values: Record<string, string>) => adminApi.updateFees(values),
    onSuccess: (res) => {
      if (res.success) toast.success("تم تحديث الرسوم بنجاح");
      else toast.error(res.message || "فشل تحديث الرسوم");
    }
  });

  const updateMoyasarMutation = useMutation({
    mutationFn: (key: string) => adminApi.updateMoyasar(key),
    onSuccess: (res) => {
      if (res.success) toast.success("تم تحديث مفتاح Moyasar");
      else toast.error(res.message || "فشل التحديث");
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
    <div className="animate-fade-in space-y-6">
      <PageHeader title="إعدادات النظام" subtitle="إدارة رسوم الأطباء ومفاتيح الربط البرمجي" back />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-2xl border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-2 mb-6">
            <div className="rounded-xl bg-primary/10 p-2"><Percent className="h-5 w-5 text-primary" /></div>
            <h3 className="text-lg font-bold">رسوم أدوار الأطباء</h3>
          </div>
          
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); updateFeesMutation.mutate(fees); }}>
            {data?.roles?.map((role: any) => {
              const key = `fee_${role.title.toLowerCase().replace(/\s+/g, '_')}`;
              return (
                <div key={role.id} className="space-y-1.5">
                  <label className="text-sm font-medium">{role.title}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">SAR</span>
                    <Input 
                      type="number" 
                      value={fees[key] || "0"} 
                      onChange={(e) => setFees(curr => ({ ...curr, [key]: e.target.value }))}
                      className="rounded-xl pl-12"
                    />
                  </div>
                </div>
              );
            })}
            <Button className="w-full rounded-xl gap-2 mt-4" disabled={updateFeesMutation.isPending}>
              {updateFeesMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              حفظ الرسوم
            </Button>
          </form>
        </Card>

        <Card className="rounded-2xl border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-2 mb-6">
            <div className="rounded-xl bg-accent/10 p-2"><CreditCard className="h-5 w-5 text-accent" /></div>
            <h3 className="text-lg font-bold">بوابة الدفع (Moyasar)</h3>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); updateMoyasarMutation.mutate(moyasarKey); }}>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">مفتاح API الخاص بـ Moyasar</label>
              <Input 
                value={moyasarKey} 
                onChange={(e) => setMoyasarKey(e.target.value)}
                placeholder="Enter your API key..."
                className="rounded-xl font-mono text-sm"
              />
            </div>
            <Button className="w-full rounded-xl gap-2 mt-4" variant="secondary" disabled={updateMoyasarMutation.isPending}>
              {updateMoyasarMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              تحديث المفتاح
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
