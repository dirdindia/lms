import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, Settings, ChevronLeft, ChevronRight, X, 
  BookOpen, Video, Bot, CreditCard, BarChart3, 
  FileQuestion, Award, MessageSquare, LifeBuoy, Megaphone,
  Calendar as CalendarIcon, LogOut
} from "lucide-react";

export default function Sidebar({ isMobileOpen, setIsMobileOpen, isCollapsed, setIsCollapsed }) {
  const location = useLocation();

  const menuGroups = [
    {
      title: "Overview",
      links: [
        { to: "/", label: "Dashboard", icon: LayoutDashboard },
        { to: "/calendar", label: "Calendar", icon: CalendarIcon },
        { to: "/reports", label: "Analytics", icon: BarChart3 },
      ]
    },
    {
      title: "Academics",
      links: [
        { to: "/courses", label: "Courses", icon: BookOpen },
        { to: "/live-classes", label: "Live Classes", icon: Video },
        { to: "/assessments", label: "Assessments", icon: FileQuestion },
        { to: "/certificates", label: "Certificates", icon: Award },
      ]
    },
    {
      title: "Users & Support",
      links: [
        { to: "/users", label: "Users & Roles", icon: Users },
        { to: "/ai-tutor", label: "AI Tutor", icon: Bot },
        { to: "/community", label: "Community", icon: MessageSquare },
        { to: "/helpdesk", label: "Helpdesk", icon: LifeBuoy },
      ]
    },
    {
      title: "Sales & Marketing",
      links: [
        { to: "/payments", label: "Payments", icon: CreditCard },
        { to: "/marketing", label: "Marketing", icon: Megaphone },
      ]
    },
    {
      title: "System",
      links: [
        { to: "/settings", label: "Settings", icon: Settings },
      ]
    }
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 ${
        isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
      } ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <div className={`flex h-16 shrink-0 items-center border-b border-border ${isCollapsed ? 'justify-center px-0' : 'justify-between px-4'}`}>
        {!isCollapsed && (
          <span className="font-display text-lg font-semibold text-brand-deep truncate ml-2">
            NMS Admin
          </span>
        )}
        
        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden rounded-full p-1.5 hover:bg-sidebar-accent text-sidebar-foreground cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Desktop Collapse Toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex items-center justify-center rounded-lg p-1.5 text-sidebar-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-4 overflow-x-hidden" style={{ scrollbarWidth: 'thin' }}>
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex flex-col gap-1">
            {!isCollapsed && (
              <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1 mt-1">
                {group.title}
              </div>
            )}
            
            {isCollapsed && groupIndex > 0 && (
               <div className="mx-auto w-8 border-t border-border/50 my-2"></div>
            )}

            {group.links.map((link) => {
              const isActive = location.pathname === link.to || (link.to !== "/" && location.pathname.startsWith(link.to));
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center rounded-lg py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                    isCollapsed ? "justify-center px-0" : "gap-3 px-3"
                  } ${
                    isActive 
                      ? "bg-brand text-primary-foreground shadow-sm" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  title={isCollapsed ? link.label : undefined}
                >
                  <link.icon className={`shrink-0 ${isCollapsed ? 'h-5 w-5' : 'h-4 w-4'}`} />
                  {!isCollapsed && <span className="truncate">{link.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      
      {/* Bottom Actions - Logout */}
      <div className="border-t border-border p-3">
        <button 
          className={`w-full flex items-center rounded-lg py-2 text-sm font-medium transition-colors cursor-pointer text-destructive hover:bg-destructive/10 ${
            isCollapsed ? "justify-center px-0" : "gap-3 px-3"
          }`}
          title={isCollapsed ? "Logout" : undefined}
          onClick={() => console.log('Logout clicked')}
        >
          <LogOut className={`shrink-0 ${isCollapsed ? 'h-5 w-5' : 'h-4 w-4'}`} />
          {!isCollapsed && <span className="truncate">Logout</span>}
        </button>
      </div>
      
    </aside>
  );
}
