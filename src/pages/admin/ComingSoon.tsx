import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div>
      <PageHeader title={title} />
      <Card className="rounded-2xl border bg-card p-12 shadow-soft flex flex-col items-center justify-center text-center">
        <div className="rounded-full bg-gradient-accent p-5 mb-4 shadow-glow">
          <Construction className="h-10 w-10 text-accent-foreground" />
        </div>
        <h2 className="text-2xl font-bold">قريباً</h2>
        <p className="mt-2 text-muted-foreground">هذه الصفحة قيد التطوير وستكون متاحة قريباً.</p>
      </Card>
    </div>
  );
}
