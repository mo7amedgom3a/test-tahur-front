export interface User {
  id: number;
  encrypted_id?: string;
  full_name: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone_code?: string;
  phone_number: string;
  role: number;
  role_label?: string;
  status: number;
  profile_image?: string;
  request_accepted?: number;
  created_at: string;
}

export interface Appointment {
  id: number;
  encrypted_id?: string;
  patient?: User | null;
  physician?: User | null;
  appointment_date: string;
  appointment_status: number;
  payment_status: number;
  slot_start?: string;
  slot_end?: string;
  amount?: number;
  created_at: string;
}

export interface Report {
  id: number;
  encrypted_id?: string;
  reported_by: { id: number; full_name: string; profile_image?: string } | null;
  reported_to: { id: number; full_name: string; profile_image?: string } | null;
  reason: string | null;
  description: string;
  report_checked: number;
  created_at: string;
}

export interface WithdrawalRequest {
  id: number;
  doctor_id: number;
  amount: number;
  status: number;
  doctor?: User;
  created_at: string;
}

export interface Page {
  id: number;
  title: string;
  description: string;
  description_ar?: string;
  page_type: string;
}

export interface Setting {
  id: number;
  key: string;
  value: string;
}

export interface PhysicianRole {
  id: number;
  title: string;
  fee: string;
}

export interface Notification {
  id: number;
  type: string;
  message?: string;
  read_at: string | null;
  created_at: string;
}

export interface Pagination {
  total: number;
  filtered: number;
  page: number;
  per_page: number;
  last_page: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  status?: string;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
  pagination?: Pagination;
}

export interface DashboardStats {
  patient_count: number;
  physician_count: number;
  pending_requests: Appointment[];
  recent_orders: Appointment[];
}

export interface LoginResponse {
  id: number;
  full_name: string;
  email: string;
  role: number;
  auth_token: string;
}
