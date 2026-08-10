import {
  CalendarDays,
  ExternalLink,
  FileText,
  HelpCircle,
  Image,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Scissors,
  Settings,
  Users,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutAdmin, getStoredUser } from "../lib/content";

const navGroups = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Website", icon: FileText, path: "/admin/content" },
      { label: "Services", icon: Scissors, path: "/admin/services" },
      { label: "Gallery", icon: Image, path: "/admin/gallery" },
      { label: "Reviews", icon: MessageSquareQuote, path: "/admin/testimonials" },
      { label: "FAQ", icon: HelpCircle, path: "/admin/faq" },
    ],
  },
  {
    label: "Business",
    items: [
      { label: "Bookings", icon: CalendarDays, path: "/admin/bookings" },
      { label: "Clients", icon: Users, path: "/admin/clients" },
      { label: "Settings", icon: Settings, path: "/admin/settings" },
    ],
  },
];

// Flat list for mobile nav — most important pages
const mobileNavItems = [
  { label: "Home", icon: LayoutDashboard, path: "/admin" },
  { label: "Bookings", icon: CalendarDays, path: "/admin/bookings" },
  { label: "Services", icon: Scissors, path: "/admin/services" },
  { label: "Gallery", icon: Image, path: "/admin/gallery" },
  { label: "Website", icon: FileText, path: "/admin/content" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

function useActiveRoute() {
  const { pathname } = useLocation();
  return (path) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };
}

export function AdminSidebar() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const isActive = useActiveRoute();

  const initials = user?.full_name
    ? user.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? "AU";

  const displayName = user?.full_name || user?.email || "Admin User";
  const displayRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Admin";

  function handleLogout(e) {
    e.preventDefault();
    logoutAdmin();
    navigate("/admin/login");
  }

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-outline-variant/20 bg-surface-container lg:flex">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-outline-variant/15">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary-container font-headline text-sm font-bold text-on-primary">
          P
        </div>
        <div className="min-w-0">
          <p className="truncate font-headline text-base font-bold text-on-surface leading-tight">
            PrettyPlug
          </p>
          <p className="font-label text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-1 px-3 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant/50">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-150 ${
                      active
                        ? "bg-primary-container/15 text-primary-container font-semibold"
                        : "text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface"
                    }`}
                  >
                    {/* Active left bar */}
                    {active && (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary-container" />
                    )}
                    <Icon
                      size={18}
                      className={`shrink-0 transition-transform duration-150 ${
                        active ? "text-primary-container" : "group-hover:scale-110"
                      }`}
                    />
                    <span className="font-label text-xs font-semibold uppercase tracking-[0.10em]">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-outline-variant/20 px-3 py-4 space-y-1">
        {/* Back to site */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-on-surface-variant transition-all hover:bg-surface-variant/40 hover:text-on-surface"
        >
          <ExternalLink size={18} className="shrink-0" />
          <span className="font-label text-xs font-semibold uppercase tracking-[0.10em]">
            View Site
          </span>
        </a>

        {/* User + Logout */}
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary-container font-label text-xs font-bold uppercase text-on-primary rounded-full">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-label text-xs font-semibold uppercase tracking-[0.08em] text-on-surface">
              {displayName}
            </p>
            <p className="text-[10px] uppercase tracking-[0.10em] text-on-surface-variant">
              {displayRole}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className="shrink-0 rounded p-1.5 text-on-surface-variant transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export function MobileAdminNav() {
  const isActive = useActiveRoute();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-stretch justify-around border-t border-outline-variant/20 bg-surface/95 backdrop-blur-md lg:hidden">
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-3 transition-colors ${
              active ? "text-primary-container" : "text-on-surface-variant"
            }`}
          >
            <span className={`relative flex items-center justify-center ${active ? "after:absolute after:-top-1 after:h-1 after:w-4 after:rounded-full after:bg-primary-container after:content-['']" : ""}`}>
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
            </span>
            <span className={`font-label text-[9px] uppercase tracking-[0.08em] ${active ? "font-bold" : "font-medium"}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
