import { createFileRoute } from "@tanstack/react-router";
import Withdrawals from "@/pages/admin/Withdrawals";

export const Route = createFileRoute("/admin/withdrawals")({
  component: Withdrawals,
});
