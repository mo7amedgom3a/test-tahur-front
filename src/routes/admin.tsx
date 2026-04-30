import { createFileRoute, redirect } from "@tanstack/react-router";
import AppLayout from "@/components/admin/layout/AppLayout";
import { getAuthToken } from "@/lib/api/client";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    const token = getAuthToken();
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
  component: AppLayout,
});
