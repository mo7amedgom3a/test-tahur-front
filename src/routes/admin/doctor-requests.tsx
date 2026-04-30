import { createFileRoute } from "@tanstack/react-router";
import DoctorRequests from "@/pages/admin/DoctorRequests";

export const Route = createFileRoute("/admin/doctor-requests")({
  head: () => ({
    meta: [{ title: "طلبات الأطباء — طهور" }],
  }),
  component: DoctorRequests,
});
