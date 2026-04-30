export type UserStatus = "active" | "inactive";
export type Role = "patient" | "doctor";
export type RequestStatus = "approved" | "pending" | "rejected" | "na";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: UserStatus;
  requestStatus: RequestStatus;
}

export const users: User[] = [
  { id: 1, name: "محمد العتيبي", email: "", phone: "+966 510201530", role: "patient", status: "active", requestStatus: "na" },
  { id: 2, name: "أحمد المطيري", email: "mloke2521@hotmail.com", phone: "+966 561961161", role: "patient", status: "active", requestStatus: "na" },
  { id: 3, name: "سلطان الصالح", email: "Ssaaleh444@gmail.com", phone: "+966 545292444", role: "patient", status: "active", requestStatus: "na" },
  { id: 4, name: "خالد العنزي", email: "", phone: "+966 559889091", role: "patient", status: "active", requestStatus: "na" },
  { id: 5, name: "فيصل الدوسري", email: "", phone: "+966 581044864", role: "patient", status: "active", requestStatus: "na" },
  { id: 6, name: "عبدالعزيز القحطاني", email: "Gadoorah7@gmail.com", phone: "+966 591184848", role: "patient", status: "active", requestStatus: "na" },
  { id: 7, name: "ناصر المهنا", email: "almuhna8777@gmail.com", phone: "+966 535555950", role: "patient", status: "active", requestStatus: "na" },
  { id: 8, name: "ماجد الدوسري", email: "", phone: "+966 543498743", role: "patient", status: "active", requestStatus: "na" },
  { id: 9, name: "عبدالله القحطاني", email: "", phone: "+966 567945813", role: "patient", status: "active", requestStatus: "na" },
  { id: 10, name: "أنس العتيم", email: "anas@gmail.com", phone: "+966 598156232", role: "doctor", status: "active", requestStatus: "approved" },
  { id: 11, name: "حسان المقبل", email: "hassan@gmail.com", phone: "+966 506262567", role: "doctor", status: "active", requestStatus: "approved" },
  { id: 12, name: "فهد الحربي", email: "demodoc@demo.com", phone: "+966 555555551", role: "doctor", status: "active", requestStatus: "approved" },
  { id: 13, name: "راكان محمد الأحمد", email: "rakan@gmail.com", phone: "+966 581817999", role: "doctor", status: "active", requestStatus: "approved" },
];

export interface DoctorRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  registrationNumber: string;
  documents: number;
  certificates: number;
  status: "pending" | "approved" | "rejected";
}

export const doctorRequests: DoctorRequest[] = [
  { id: 1, name: "أنس العتيم", email: "anas@gmail.com", phone: "966598156232", registrationNumber: "246810", documents: 2, certificates: 3, status: "approved" },
  { id: 2, name: "حسان المقبل", email: "hassan@gmail.com", phone: "966506262567", registrationNumber: "1357911", documents: 1, certificates: 2, status: "approved" },
  { id: 3, name: "فهد الحربي", email: "demodoc@demo.com", phone: "966555555551", registrationNumber: "111111", documents: 3, certificates: 4, status: "approved" },
  { id: 4, name: "راكان محمد الأحمد", email: "rakan@gmail.com", phone: "966581817999", registrationNumber: "12345678", documents: 2, certificates: 2, status: "approved" },
  { id: 5, name: "عمر الشمري", email: "omar@gmail.com", phone: "966500111222", registrationNumber: "987654", documents: 1, certificates: 1, status: "pending" },
];

export type AppointmentStatus = "completed" | "scheduled" | "cancelled" | "in_progress";

export interface Appointment {
  id: number;
  patient: string;
  patientPhone: string;
  patientEmail: string;
  doctor: string;
  doctorSpecialty: string;
  doctorEmail: string;
  date: string;
  slotStart: string;
  slotEnd: string;
  amount: number;
  status: AppointmentStatus;
  type: "online" | "in_person";
  channels: ("chat" | "voice" | "video")[];
  paymentMethod: "card" | "wallet";
}

export const appointments: Appointment[] = [
  { id: 76, patient: "تركي العتيبي", patientPhone: "+966 510201530", patientEmail: "turki@example.com", doctor: "فهد الحربي", doctorSpecialty: "Family Medicine Physician", doctorEmail: "demodoc@demo.com", date: "2026-04-08", slotStart: "10:20:00", slotEnd: "10:25:00", amount: 20, status: "completed", type: "online", channels: ["chat", "voice", "video"], paymentMethod: "card" },
  { id: 77, patient: "ماجد الدوسري", patientPhone: "+966 543498743", patientEmail: "majed@example.com", doctor: "أنس العتيم", doctorSpecialty: "طب عام", doctorEmail: "anas@gmail.com", date: "2026-04-12", slotStart: "14:00:00", slotEnd: "14:30:00", amount: 50, status: "scheduled", type: "online", channels: ["chat", "video"], paymentMethod: "wallet" },
  { id: 78, patient: "خالد العنزي", patientPhone: "+966 559889091", patientEmail: "khaled@example.com", doctor: "حسان المقبل", doctorSpecialty: "أمراض الجلد", doctorEmail: "hassan@gmail.com", date: "2026-04-15", slotStart: "09:00:00", slotEnd: "09:20:00", amount: 80, status: "scheduled", type: "online", channels: ["video"], paymentMethod: "card" },
  { id: 79, patient: "ناصر المهنا", patientPhone: "+966 535555950", patientEmail: "naser@example.com", doctor: "راكان محمد الأحمد", doctorSpecialty: "طب الأطفال", doctorEmail: "rakan@gmail.com", date: "2026-04-02", slotStart: "16:00:00", slotEnd: "16:30:00", amount: 40, status: "cancelled", type: "online", channels: ["chat"], paymentMethod: "card" },
];

export const stats = {
  doctors: 4,
  patients: 11,
  appointmentsToday: 3,
  pendingRequests: 1,
};

export const weeklyActivity = [
  { day: "السبت", مواعيد: 4, استشارات: 2 },
  { day: "الأحد", مواعيد: 7, استشارات: 5 },
  { day: "الاثنين", مواعيد: 5, استشارات: 3 },
  { day: "الثلاثاء", مواعيد: 9, استشارات: 7 },
  { day: "الأربعاء", مواعيد: 11, استشارات: 8 },
  { day: "الخميس", مواعيد: 6, استشارات: 4 },
  { day: "الجمعة", مواعيد: 3, استشارات: 1 },
];
