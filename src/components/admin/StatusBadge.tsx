import { cn } from "@/lib/utils";

type Status = "active" | "inactive" | "pending" | "approved" | "rejected" | "completed";

const styles: Record<Status, string> = {
  active: "bg-success/15 text-success border-success/30",
  inactive: "bg-muted text-muted-foreground border-border",
  pending: "bg-warning/15 text-warning border-warning/30",
  approved: "bg-success/15 text-success border-success/30",
  rejected: "bg-destructive/15 text-destructive border-destructive/30",
  completed: "bg-primary/15 text-primary border-primary/30",
};

export function StatusBadge({ status, label }: { status: Status; label: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
      styles[status]
    )}>
      <span className={cn("h-1.5 w-1.5 rounded-full", {
        "bg-success": status === "active" || status === "approved",
        "bg-muted-foreground": status === "inactive",
        "bg-warning": status === "pending",
        "bg-destructive": status === "rejected",
        "bg-primary": status === "completed",
      })} />
      {label}
    </span>
  );
}
