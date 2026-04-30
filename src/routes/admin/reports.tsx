import { createFileRoute } from "@tanstack/react-router";
import Reports from "@/pages/admin/Reports";

export const Route = createFileRoute("/admin/reports")({
  component: Reports,
});
