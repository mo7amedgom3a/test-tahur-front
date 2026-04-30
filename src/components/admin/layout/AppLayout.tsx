import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { AdminThemeProvider } from "@/components/admin/ThemeProvider";

export default function AppLayout() {
  return (
    <AdminThemeProvider>
      <SidebarProvider defaultOpen>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <AppHeader />
            <main className="flex-1 p-4 md:p-6 lg:p-8 wave-pattern">
              <div className="animate-fade-in mx-auto max-w-[1400px]">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </AdminThemeProvider>
  );
}
