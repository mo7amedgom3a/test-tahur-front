import { createFileRoute } from "@tanstack/react-router";
import Profile from "@/pages/admin/Profile";

export const Route = createFileRoute("/admin/profile")({
  component: Profile,
});
