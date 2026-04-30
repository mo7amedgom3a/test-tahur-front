import { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Save, Key, Mail, Phone, User as UserIcon } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { toast } from "sonner";

export default function Profile() {
  const [profileValues, setProfileValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_code: "",
    phone_number: "",
  });

  const [pwdValues, setPwdValues] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const { data: profile, isLoading } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: async () => {
      const res = await adminApi.getProfile();
      return res.data;
    }
  });

  useEffect(() => {
    if (profile) {
      setProfileValues({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        phone_code: profile.phone_code || "",
        phone_number: profile.phone_number || "",
      });
    }
  }, [profile]);

  const updateProfileMutation = useMutation({
    mutationFn: (values: any) => adminApi.updateProfile(values),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("تم تحديث البيانات الشخصية");
        if (res.data) {
          localStorage.setItem("tahur_user", JSON.stringify(res.data));
        }
      } else {
        toast.error(res.message || "فشل التحديث");
      }
    }
  });

  const changePasswordMutation = useMutation({
    mutationFn: (values: any) => adminApi.changePassword(values),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("تم تغيير كلمة المرور بنجاح");
        setPwdValues({ old_password: "", new_password: "", confirm_password: "" });
      } else {
        toast.error(res.message || "فشل تغيير كلمة المرور");
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
    <div className="animate-fade-in space-y-6">
      <PageHeader title="الملف الشخصي" subtitle="إدارة بيانات حسابك وكلمة المرور" back />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-2xl border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-6">
              <div className="rounded-xl bg-primary/10 p-2"><UserIcon className="h-5 w-5 text-primary" /></div>
              <h3 className="text-lg font-bold">المعلومات الشخصية</h3>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); updateProfileMutation.mutate(profileValues); }}>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">الاسم الأول</label>
                <Input 
                  value={profileValues.first_name} 
                  onChange={e => setProfileValues(v => ({ ...v, first_name: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">اسم العائلة</label>
                <Input 
                  value={profileValues.last_name} 
                  onChange={e => setProfileValues(v => ({ ...v, last_name: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="email"
                    value={profileValues.email} 
                    onChange={e => setProfileValues(v => ({ ...v, email: e.target.value }))}
                    className="rounded-xl pl-10"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">رمز الدولة</label>
                <Input 
                  value={profileValues.phone_code} 
                  onChange={e => setProfileValues(v => ({ ...v, phone_code: e.target.value }))}
                  className="rounded-xl font-mono"
                  placeholder="+966"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">رقم الهاتف</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    value={profileValues.phone_number} 
                    onChange={e => setProfileValues(v => ({ ...v, phone_number: e.target.value }))}
                    className="rounded-xl pl-10 font-mono"
                  />
                </div>
              </div>
              <div className="md:col-span-2 pt-2">
                <Button className="w-full md:w-auto rounded-xl gap-2" disabled={updateProfileMutation.isPending}>
                  {updateProfileMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  حفظ التغييرات
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-2xl border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-6">
              <div className="rounded-xl bg-accent/10 p-2"><Key className="h-5 w-5 text-accent" /></div>
              <h3 className="text-lg font-bold">تغيير كلمة المرور</h3>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); changePasswordMutation.mutate(pwdValues); }}>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">كلمة المرور الحالية</label>
                <Input 
                  type="password"
                  value={pwdValues.old_password} 
                  onChange={e => setPwdValues(v => ({ ...v, old_password: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">كلمة المرور الجديدة</label>
                <Input 
                  type="password"
                  value={pwdValues.new_password} 
                  onChange={e => setPwdValues(v => ({ ...v, new_password: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">تأكيد كلمة المرور</label>
                <Input 
                  type="password"
                  value={pwdValues.confirm_password} 
                  onChange={e => setPwdValues(v => ({ ...v, confirm_password: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
              <Button variant="secondary" className="w-full rounded-xl gap-2 mt-2" disabled={changePasswordMutation.isPending}>
                {changePasswordMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Key className="h-4 w-4" />}
                تحديث كلمة المرور
              </Button>
            </form>
          </Card>

          <Card className="rounded-2xl border bg-card p-6 shadow-soft flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 ring-4 ring-primary/10 mb-4">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-3xl font-bold">
                {profile?.full_name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
            <h4 className="font-bold text-xl">{profile?.full_name}</h4>
            <p className="text-sm text-muted-foreground">{profile?.email}</p>
            <div className="mt-4 inline-flex items-center rounded-full px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider">
              مشرف النظام
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
