import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Index from "@/routes";
import LoginPage from "@/routes/login";
import RegisterPage from "@/routes/register";
import DoctorPage from "@/routes/doctors.$id";
import SpecialtyPage from "@/routes/specialties.$slug";
import AppLayout from "@/components/admin/layout/AppLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Users from "@/pages/admin/Users";
import DoctorRequests from "@/pages/admin/DoctorRequests";
import Reports from "@/pages/admin/Reports";
import Withdrawals from "@/pages/admin/Withdrawals";
import Appointments from "@/pages/admin/Appointments";
import AppointmentDetail from "@/pages/admin/AppointmentDetail";
import CMSPages from "@/pages/admin/CMSPages";
import Settings from "@/pages/admin/Settings";
import Profile from "@/pages/admin/Profile";
import { getAuthToken } from "@/lib/api/client";

const queryClient = new QueryClient();

function PublicLayout() {
  const { pathname } = useLocation();
  const isExcludedPath = pathname.startsWith("/admin") || pathname === "/login" || pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!isExcludedPath && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isExcludedPath && <Footer />}
    </div>
  );
}

function ProtectedAdminRoute() {
  return getAuthToken() ? <AppLayout /> : <Navigate to="/login" replace />;
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4" dir="rtl">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary-deep">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-deep"
          >
            العودة للرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Index />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="doctors/:id" element={<DoctorPage />} />
          <Route path="specialties/:slug" element={<SpecialtyPage />} />
        </Route>

        <Route path="admin" element={<ProtectedAdminRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="doctor-requests" element={<DoctorRequests />} />
          <Route path="reports" element={<Reports />} />
          <Route path="withdrawals" element={<Withdrawals />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/:id" element={<AppointmentDetail />} />
          <Route path="info-pages" element={<CMSPages />} />
          <Route path="home-settings" element={<CMSPages />} />
          <Route path="fees" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </QueryClientProvider>
  );
}
