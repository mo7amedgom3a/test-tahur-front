import { createFileRoute } from "@tanstack/react-router";
import AppointmentDetail from "@/pages/admin/AppointmentDetail";

export const Route = createFileRoute("/admin/appointments/$id")({
  head: () => ({
    meta: [{ title: "تفاصيل الموعد — طهور" }],
  }),
  component: AppointmentDetail,
});
