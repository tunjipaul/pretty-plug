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
      {navItems.map((item, index) => {
        const isActive = index === 0;
        const Icon = item.icon;
        return (
          <a
            key={item.label}
            href={item.path}
            className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
              isActive ? "text-primary" : "text-on-surface-variant"
            }`}
          >
            <Icon size={22} />
            <span className="text-[10px] font-label uppercase tracking-tighter">
              {item.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
