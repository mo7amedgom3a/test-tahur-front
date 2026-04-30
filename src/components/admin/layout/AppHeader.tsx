import { Bell, AlertTriangle, MessageSquareWarning, Sun, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAdminTheme } from "@/components/admin/ThemeProvider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "@tanstack/react-router";

export function AppHeader() {
  const { theme, toggle } = useAdminTheme();
  
  // Get user info from localStorage
  const userStr = typeof window !== 'undefined' ? localStorage.getItem("tahur_user") : null;
  const user = userStr ? JSON.parse(userStr) : null;
  const userName = user?.full_name || "مشرف النظام";
  const userRole = user?.role === 0 ? "مدير النظام" : "مشرف";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b bg-card/80 backdrop-blur-md px-4 md:px-6">
      <div className="flex items-center gap-3">
        <Link to="/admin/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Avatar className="h-10 w-10 ring-2 ring-accent/30">
            <AvatarFallback className="bg-gradient-accent text-accent-foreground font-bold">
              {userName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col leading-tight text-right">
            <span className="text-sm font-bold text-accent">{userName}</span>
            <span className="text-[11px] text-muted-foreground">{userRole}</span>
          </div>
        </Link>

        <div className="flex items-center rounded-full border bg-secondary px-3 py-1.5 text-xs font-bold text-secondary-foreground">
          <Globe className="h-3.5 w-3.5 ms-1" />
          AR
        </div>

        <Button size="icon" variant="ghost" className="relative rounded-full" aria-label="الإشعارات">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 end-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <Button size="icon" variant="ghost" className="relative rounded-full" aria-label="التنبيهات">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <span className="absolute top-1.5 end-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <Button size="icon" variant="ghost" className="relative rounded-full" aria-label="الرسائل">
          <MessageSquareWarning className="h-5 w-5 text-info" />
          <span className="absolute top-1.5 end-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <Button
          size="icon" variant="ghost" onClick={toggle}
          className="rounded-full transition-smooth hover:bg-secondary"
          aria-label="تبديل المظهر"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-warning" />}
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <SidebarTrigger className="rounded-full" />
      </div>
    </header>
  );
}
