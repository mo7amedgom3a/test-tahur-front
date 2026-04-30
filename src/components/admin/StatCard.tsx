import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "primary" | "accent" | "info" | "warning";
  trend?: string;
}

const variants = {
  primary: "bg-gradient-primary",
  accent: "bg-gradient-accent",
  info: "bg-gradient-to-br from-info to-primary",
  warning: "bg-gradient-to-br from-warning to-destructive",
};

export function StatCard({ label, value, icon: Icon, variant = "primary", trend }: Props) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl p-6 text-primary-foreground shadow-elegant transition-smooth hover:scale-[1.02]",
      variants[variant]
    )}>
      <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path d="M0,100 Q100,40 200,100 T400,100 L400,200 L0,200 Z" fill="white" opacity="0.2"/>
        <path d="M0,140 Q100,80 200,140 T400,140 L400,200 L0,200 Z" fill="white" opacity="0.15"/>
        <path d="M0,170 Q100,120 200,170 T400,170 L400,200 L0,200 Z" fill="white" opacity="0.1"/>
      </svg>
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{label}</p>
          <p className="mt-2 text-4xl font-bold">{value}</p>
          {trend && <p className="mt-1 text-xs opacity-80">{trend}</p>}
        </div>
        <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
