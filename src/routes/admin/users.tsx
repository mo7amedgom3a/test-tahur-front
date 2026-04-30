import { createFileRoute } from "@tanstack/react-router";
import Users from "@/pages/admin/Users";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [{ title: "المستخدمون — طهور" }],
  }),
  component: Users,
});
