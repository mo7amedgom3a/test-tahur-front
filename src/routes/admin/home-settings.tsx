import { createFileRoute } from "@tanstack/react-router";
import CMSPages from "@/pages/admin/CMSPages";

export const Route = createFileRoute("/admin/home-settings")({
  component: CMSPages,
});
