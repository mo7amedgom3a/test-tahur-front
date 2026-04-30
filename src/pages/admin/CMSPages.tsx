import { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, FileText, Layout } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { toast } from "sonner";

export default function CMSPages() {
  const [pagesValues, setPagesValues] = useState<Record<string, string>>({});
  const [bannerValues, setBannerValues] = useState({ banner_en: "", banner_ar: "" });

  const { data: pagesData, isLoading: pagesLoading } = useQuery({
    queryKey: ["adminPages"],
    queryFn: async () => {
      const res = await adminApi.getPages();
      return res.data?.pages || [];
    }
  });

  const { data: bannerData, isLoading: bannerLoading } = useQuery({
    queryKey: ["adminBanner"],
    queryFn: async () => {
      const res = await adminApi.getHomeBanner();
      return res.data;
    }
  });

  useEffect(() => {
    if (pagesData) {
      const initial: Record<string, string> = {};
      pagesData.forEach((page: any) => {
        initial[page.page_type] = page.description || "";
        initial[`${page.page_type}_ar`] = page.description_ar || "";
      });
      setPagesValues(initial);
    }
  }, [pagesData]);

  useEffect(() => {
    if (bannerData) {
      setBannerValues({
        banner_en: bannerData.description || "",
        banner_ar: bannerData.description_ar || "",
      });
    }
  }, [bannerData]);

  const updatePagesMutation = useMutation({
    mutationFn: (values: any) => adminApi.updatePages(values),
    onSuccess: (res) => {
      if (res.success) toast.success("تم تحديث محتوى الصفحات");
      else toast.error(res.message || "فشل التحديث");
    }
  });

  const updateBannerMutation = useMutation({
    mutationFn: (values: any) => adminApi.updateHomeBanner(values),
    onSuccess: (res) => {
      if (res.success) toast.success("تم تحديث إعلان الصفحة الرئيسية");
      else toast.error(res.message || "فشل التحديث");
    }
  });

  if (pagesLoading || bannerLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="إدارة المحتوى" subtitle="تعديل صفحات المعلومات وإعلانات الصفحة الرئيسية" back />

      <Card className="rounded-2xl border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-6">
          <div className="rounded-xl bg-accent/10 p-2"><Layout className="h-5 w-5 text-accent" /></div>
          <h3 className="text-lg font-bold">إعلان الصفحة الرئيسية (Banner)</h3>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); updateBannerMutation.mutate(bannerValues); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">النص (English)</label>
              <Input 
                value={bannerValues.banner_en} 
                onChange={e => setBannerValues(v => ({ ...v, banner_en: e.target.value }))}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">النص (عربي)</label>
              <Input 
                dir="rtl"
                value={bannerValues.banner_ar} 
                onChange={e => setBannerValues(v => ({ ...v, banner_ar: e.target.value }))}
                className="rounded-xl"
              />
            </div>
          </div>
          <Button className="rounded-xl gap-2 mt-2" disabled={updateBannerMutation.isPending}>
            {updateBannerMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            حفظ الإعلان
          </Button>
        </form>
      </Card>

      <Card className="rounded-2xl border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-6">
          <div className="rounded-xl bg-primary/10 p-2"><FileText className="h-5 w-5 text-primary" /></div>
          <h3 className="text-lg font-bold">محتوى الصفحات القانونية والمعلومات</h3>
        </div>

        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); updatePagesMutation.mutate(pagesValues); }}>
          {pagesData?.map((page: any, index: number) => (
            <div key={page.id} className="space-y-4">
              <div className="flex items-center gap-2 border-b pb-2">
                <span className="text-sm font-bold text-primary uppercase tracking-wider">{page.page_type.replace(/_/g, ' ')}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-muted-foreground">English Content</label>
                  <Textarea 
                    rows={6}
                    value={pagesValues[page.page_type] || ""} 
                    onChange={e => setPagesValues(v => ({ ...v, [page.page_type]: e.target.value }))}
                    className="rounded-xl resize-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-muted-foreground">المحتوى العربي</label>
                  <Textarea 
                    dir="rtl"
                    rows={6}
                    value={pagesValues[`${page.page_type}_ar`] || ""} 
                    onChange={e => setPagesValues(v => ({ ...v, [`${page.page_type}_ar`]: e.target.value }))}
                    className="rounded-xl resize-none"
                  />
                </div>
              </div>
              {index < pagesData.length - 1 && <div className="pt-4" />}
            </div>
          ))}
          <Button className="w-full rounded-xl gap-2" disabled={updatePagesMutation.isPending}>
            {updatePagesMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            حفظ جميع الصفحات
          </Button>
        </form>
      </Card>
    </div>
  );
}
