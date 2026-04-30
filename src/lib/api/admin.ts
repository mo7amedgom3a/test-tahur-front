import { api } from "./client";
import { 
  DashboardStats, User, Appointment, Report, 
  WithdrawalRequest, Page, Setting, PhysicianRole,
  LoginResponse
} from "./types";

export const adminApi = {
  // Auth
  login: (credentials: any) => api.post<LoginResponse>("/admin/login", credentials),
  
  // Dashboard
  getStats: () => api.get<DashboardStats>("/admin/dashboard"),
  
  // Users
  getUsers: (params?: any) => api.get<User[]>("/admin/userManagement", params),
  toggleUserStatus: (encrypted_id: string, status: number) => 
    api.post("/admin/activeOrInactiveUser", { user_id: encrypted_id, status }),
  
  // Appointments
  getAppointments: (params?: any) => api.get<Appointment[]>("/admin/appointment", params),
  getAppointment: (id: number) => api.get<Appointment>(`/admin/appointment/${id}`),
  
  // Doctor Requests
  getDoctorRequests: () => api.get<User[]>("/admin/doctorRequests"),
  approveDoctorRequest: (id: number) => api.post(`/admin/doctor/approve/${id}`, {}),
  rejectDoctorRequest: (id: number) => api.post(`/admin/doctor/reject/${id}`, {}),
  
  // Reports
  getReports: (params?: any) => api.get<Report[]>("/admin/reports", params),
  blockUser: (id: number) => api.post(`/admin/reports/blockUser/${id}`, {}),
  deleteReport: (encrypted_id: string) => api.post("/admin/DeleteReport", { user_id: encrypted_id }),

  // Withdrawals
  getWithdrawals: () => api.get<WithdrawalRequest[]>("/admin/withdrawal-requests"),
  approveWithdrawal: (id: number) => api.post(`/admin/withdrawal/approve/${id}`, {}),
  rejectWithdrawal: (id: number) => api.post(`/admin/withdrawal/reject/${id}`, {}),

  // Settings
  getSettings: () => api.get<any>("/admin/setting"),
  updateFees: (fees: Record<string, string>) => api.post("/admin/setting", fees),
  updateMoyasar: (apiKey: string) => api.post("/admin/updateMoyasar", { apiKey }),

  // Pages (CMS)
  getPages: () => api.get<{ pages: any[] }>("/admin/page"),
  updatePages: (data: any) => api.post("/admin/page", data),
  getHomeBanner: () => api.get<any>("/admin/page/home-banner"),
  updateHomeBanner: (data: any) => api.post("/admin/page/home-banner", data),

  // Profile
  getProfile: () => api.get<User>("/admin/profile"),
  updateProfile: (data: any) => api.post<User>("/admin/profile", data),
  changePassword: (data: any) => api.post("/admin/change-password", data),
};
