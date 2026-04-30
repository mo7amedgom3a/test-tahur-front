import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/pages/admin/Dashboard";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم — طهور" },
      { name: "description", content: "نظرة عامة على أداء منصة طهور للرعاية الصحية" },
    ],
  }),
  component: Dashboard,
});
