import { ArrowRight } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export function PageHeader({ title, subtitle, back, action }: { title: string; subtitle?: string; back?: boolean; action?: ReactNode }) {
  const router = useRouter();
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        {action}
        {back && (
          <Button variant="ghost" onClick={() => router.history.back()} className="gap-2 text-accent hover:text-accent">
            <ArrowRight className="h-4 w-4" />
            رجوع
          </Button>
        )}
      </div>
    </div>
  );
}
