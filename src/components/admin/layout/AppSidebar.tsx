import {
  LayoutDashboard, Users, UserCheck, Bell, ArrowDownToLine,
  Calendar, FileText, Settings, Receipt, LogOut
} from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader,
  SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { removeAuthToken } from "@/lib/api/client";

const items = [
  { title: "لوحة التحكم", url: "/admin", icon: LayoutDashboard },
  { title: "إدارة المستخدمين", url: "/admin/users", icon: Users },
  { title: "طلبات تسجيل الأطباء", url: "/admin/doctor-requests", icon: UserCheck },
  { title: "إدارة البلاغات", url: "/admin/reports", icon: Bell },
  { title: "إدارة طلبات السحب", url: "/admin/withdrawals", icon: ArrowDownToLine },
  { title: "المواعيد", url: "/admin/appointments", icon: Calendar },
  { title: "صفحات المعلومات", url: "/admin/info-pages", icon: FileText },
  { title: "إعدادات الصفحة الرئيسية", url: "/admin/home-settings", icon: Settings },
  { title: "إدارة الرسوم", url: "/admin/fees", icon: Receipt },
  { title: "الملف الشخصي", url: "/admin/profile", icon: Users },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { location } = useRouterState();
  const pathname = location.pathname;
  const isActive = (url: string) => url === "/admin" ? pathname === "/admin" : pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon" side="right" className="border-l-0">
      <SidebarHeader className="bg-gradient-sidebar">
        <div className="flex items-center gap-3 px-2 py-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sidebar-primary text-sidebar-primary-foreground font-bold text-xl shadow-glow shrink-0">
            ط
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xl font-bold text-sidebar-foreground leading-tight">طهور</span>
              <span className="text-[11px] text-sidebar-foreground/70 tracking-widest">Tahur</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-sidebar">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 px-2">
              {items.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={active}
                      className={`h-11 rounded-xl transition-smooth text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:shadow-soft data-[active=true]:font-semibold`}>
                      <Link to={item.url}>
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-gradient-sidebar">
        <SidebarMenu className="px-2 pb-4">
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className="h-11 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/60"
              onClick={() => {
                removeAuthToken();
                localStorage.removeItem("tahur_user");
              }}
            >
              <Link to="/login">
                <LogOut className="h-5 w-5" />
                {!collapsed && <span className="text-sm">تسجيل الخروج</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
