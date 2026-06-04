import { NavLink } from "react-router-dom";
import { Home, Sparkles, Calendar, User } from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Services", icon: Sparkles, path: "/services" },
  { label: "Book", icon: Calendar, path: "/book" },
  { label: "Profile", icon: User, path: "/profile" },
];

export default function MobileBottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container/90 backdrop-blur-xl z-50 flex justify-around items-center py-4 border-t border-outline-variant/10">
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
