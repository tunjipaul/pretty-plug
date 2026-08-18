import { NavLink } from "react-router-dom";
import { Home, Sparkles, Calendar, Images } from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Services", icon: Sparkles, path: "/services" },
  { label: "Book", icon: Calendar, path: "/book" },
  { label: "Our Work", icon: Images, path: "/portfolio" },
];

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-outline-variant/10 bg-surface-container/90 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-colors duration-200 ${
                isActive ? "text-primary-container" : "text-on-surface-variant"
              }`
            }
          >
            <Icon size={22} />
            <span className="text-[10px] font-label uppercase tracking-tighter">
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </div>
  );
}
