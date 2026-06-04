import {
  Bell,
  CalendarDays,
  CreditCard,
  FileText,
  HelpCircle,
  Image,
  LayoutDashboard,
  Link as LinkIcon,
  Lock,
  LogOut,
  Mail,
  MessageSquareQuote,
  MapPin,
  MessageSquare,
  Save,
  Scissors,
  Settings,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  Users,
} from "lucide-react";
import { createElement } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Website", icon: FileText, path: "/admin/content" },
  { label: "Services", icon: Scissors, path: "/admin/services" },
  { label: "Gallery", icon: Image, path: "/admin/gallery" },
  { label: "Reviews", icon: MessageSquareQuote, path: "/admin/testimonials" },
  { label: "FAQ", icon: HelpCircle, path: "/admin/faq" },
  { label: "Bookings", icon: CalendarDays, path: "/admin/bookings" },
  { label: "Clients", icon: Users, path: "/admin/clients" },
  { label: "Settings", icon: Settings, path: "/admin/settings", active: true },
];

const hours = [
  ["Monday", "09:00 AM", "07:30 PM", true],
  ["Tuesday", "09:00 AM", "07:30 PM", true],
  ["Wednesday", "09:00 AM", "07:30 PM", true],
  ["Thursday", "09:00 AM", "07:30 PM", true],
  ["Friday", "09:00 AM", "07:30 PM", true],
  ["Saturday", "10:00 AM", "06:00 PM", true],
  ["Sunday", "Closed", "Closed", false],
];

const notificationRules = [
  ["Booking confirmation", "Email, WhatsApp"],
  ["Deposit reminder", "WhatsApp"],
  ["Appointment reminder", "24 hours before"],
  ["Review request", "2 hours after completion"],
];

function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-outline-variant/20 bg-surface-container p-2 pt-10 shadow-sm lg:flex">
      <div className="mb-10 px-4">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-primary-container">
          ThePrettyPlug Admin
        </h1>
        <p className="mt-2 font-label text-xs font-semibold uppercase tracking-[0.16em] text-on-surface-variant">
          Abeokuta Suite
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {navItems
          .filter((item) =>
            ["Dashboard", "Website", "Services", "Gallery", "Settings"].includes(
              item.label,
            ),
          )
          .map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-all ${
                item.active
                  ? "bg-primary-container font-bold text-on-primary"
                  : "text-on-surface-variant hover:translate-x-1 hover:bg-surface-variant/50"
              }`}
            >
              <Icon size={20} />
              <span className="font-label text-xs font-semibold uppercase tracking-[0.12em]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 px-2 pb-8">
        <div className="border-t border-outline-variant/30 pt-4">
          <button className="flex w-full items-center gap-3 px-4 py-3 text-on-surface-variant transition-colors hover:bg-surface-variant/50">
            <HelpCircle size={20} />
            <span className="font-label text-xs font-semibold uppercase tracking-[0.12em]">
              Help
            </span>
          </button>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant transition-colors hover:bg-surface-variant/50"
          >
            <LogOut size={20} />
            <span className="font-label text-xs font-semibold uppercase tracking-[0.12em]">
              Logout
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

function Field({ label, value, type = "text" }) {
  return (
    <label className="block">
      <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
        {label}
      </span>
      <input
        type={type}
        defaultValue={value}
        className="mt-2 h-12 w-full border border-outline-variant/40 bg-surface-container-lowest px-4 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
      />
    </label>
  );
}

function SettingCard({ icon, title, description, children }) {
  return (
    <section className="border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm md:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary-fixed text-primary-container">
          {createElement(icon, { size: 20 })}
        </div>
        <div>
          <h2 className="font-headline text-2xl font-medium text-on-surface">
            {title}
          </h2>
          <p className="mt-1 font-body text-sm leading-6 text-on-surface-variant">
            {description}
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}

function ToggleRow({ label, description, enabled = true }) {
  const Icon = enabled ? ToggleRight : ToggleLeft;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-outline-variant/10 py-4 last:border-b-0">
      <div>
        <p className="font-body font-bold text-on-surface">{label}</p>
        <p className="mt-1 text-sm text-on-surface-variant">{description}</p>
      </div>
      <button
        type="button"
        className={enabled ? "text-primary-container" : "text-on-surface-variant"}
        aria-label={`${enabled ? "Disable" : "Enable"} ${label}`}
      >
        <Icon size={34} />
      </button>
    </div>
  );
}

export default function AdminSettings() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <AdminSidebar />

      <main className="min-h-screen pb-28 lg:ml-64 lg:pb-0">
        <header className="sticky top-0 z-40 border-b border-outline-variant/30 bg-surface/90 px-4 py-4 backdrop-blur-md sm:px-5 md:px-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="font-label text-xs font-semibold uppercase tracking-[0.16em] text-primary-container">
                Admin
              </p>
              <h1 className="mt-1 font-headline text-3xl font-medium leading-tight text-on-surface sm:text-4xl">
                Settings
              </h1>
              <p className="mt-1 font-body text-sm text-on-surface-variant md:text-base">
                Configure brand details, booking policies, payments, notifications, and admin access.
              </p>
            </div>

            <button
              type="button"
              aria-label="Save settings changes"
              className="inline-flex h-11 items-center justify-center gap-2 bg-primary-container px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 sm:p-5 md:p-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:p-10">
          <div className="space-y-6">
            <SettingCard
              icon={MapPin}
              title="Business Profile"
              description="Public brand and contact details shown across the website and booking flow."
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Business Name" value="ThePrettyPlug" />
                <Field label="Location Label" value="Abeokuta Suite" />
                <Field label="Contact Email" value="hello@theprettyplug.test" type="email" />
                <Field label="WhatsApp Number" value="+234 800 000 0000" />
              </div>
              <label className="mt-4 block">
                <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                  Studio Address
                </span>
                <textarea
                  defaultValue="Abeokuta, Ogun State, Nigeria"
                  rows={3}
                  className="mt-2 w-full resize-none border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                />
              </label>
            </SettingCard>

            <SettingCard
              icon={CalendarDays}
              title="Booking Policy"
              description="Rules used by the booking wizard before backend availability is connected."
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Field label="Deposit Required" value="20%" />
                <Field label="Slot Buffer" value="15 minutes" />
                <Field label="Cancellation Window" value="24 hours" />
              </div>
              <div className="mt-4 divide-y divide-outline-variant/10 border border-outline-variant/20 bg-surface">
                <ToggleRow
                  label="Require deposit before confirmation"
                  description="Bookings remain pending until deposit is recorded."
                />
                <ToggleRow
                  label="Allow same-day bookings"
                  description="Clients can book available slots for the current day."
                  enabled={false}
                />
                <ToggleRow
                  label="Collect client notes"
                  description="Show allergies, style requests, and special instructions field."
                />
              </div>
            </SettingCard>

            <SettingCard
              icon={ClockIcon}
              title="Opening Hours"
              description="Default weekly availability shown in the booking experience."
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <thead className="border-b border-outline-variant/20 bg-surface-container-high">
                    <tr>
                      {["Day", "Open", "Close", "Status"].map((heading) => (
                        <th
                          key={heading}
                          className="p-4 font-label text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface-variant"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {hours.map(([day, open, close, active]) => (
                      <tr key={day}>
                        <td className="p-4 font-body font-bold text-on-surface">
                          {day}
                        </td>
                        <td className="p-4 text-sm text-on-surface-variant">
                          {open}
                        </td>
                        <td className="p-4 text-sm text-on-surface-variant">
                          {close}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] ${
                              active
                                ? "bg-green-50 text-green-700"
                                : "bg-surface-container-high text-on-surface-variant"
                            }`}
                          >
                            {active ? "Open" : "Closed"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SettingCard>
          </div>

          <aside className="space-y-6">
            <SettingCard
              icon={CreditCard}
              title="Payments"
              description="Payment provider settings for deposits and invoices."
            >
              <div className="space-y-4">
                <Field label="Provider" value="Paystack" />
                <Field label="Currency" value="NGN" />
                <ToggleRow
                  label="Payment test mode"
                  description="Use sandbox keys until production backend is ready."
                />
              </div>
            </SettingCard>

            <SettingCard
              icon={Bell}
              title="Notifications"
              description="Message rules for client and admin alerts."
            >
              <div className="space-y-3">
                {notificationRules.map(([label, value]) => (
                  <div key={label} className="border-b border-outline-variant/10 pb-3">
                    <p className="font-body font-bold text-on-surface">{label}</p>
                    <p className="mt-1 text-sm text-on-surface-variant">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button className="inline-flex h-10 items-center justify-center gap-2 border border-outline-variant font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                  <Mail size={15} />
                  Email
                </button>
                <button className="inline-flex h-10 items-center justify-center gap-2 border border-outline-variant font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                  <MessageSquare size={15} />
                  SMS
                </button>
              </div>
            </SettingCard>

            <SettingCard
              icon={ShieldCheck}
              title="Admin Access"
              description="Roles and access controls for staff accounts."
            >
              <div className="space-y-4">
                {[
                  ["Admin User", "Owner access"],
                  ["Tomi A.", "Bookings and services"],
                  ["Aisha B.", "Bookings only"],
                ].map(([name, role]) => (
                  <div key={name} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-body font-bold text-on-surface">{name}</p>
                      <p className="text-sm text-on-surface-variant">{role}</p>
                    </div>
                    <Lock size={16} className="text-on-surface-variant" />
                  </div>
                ))}
              </div>
            </SettingCard>

            <SettingCard
              icon={LinkIcon}
              title="Integrations"
              description="External services the backend will connect later."
            >
              <div className="divide-y divide-outline-variant/10">
                <ToggleRow
                  label="Instagram gallery"
                  description="Pull tagged posts into portfolio."
                  enabled={false}
                />
                <ToggleRow
                  label="WhatsApp reminders"
                  description="Send booking reminders to clients."
                />
                <ToggleRow
                  label="Analytics"
                  description="Track booking conversion and traffic."
                  enabled={false}
                />
              </div>
            </SettingCard>
          </aside>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-outline-variant/30 bg-surface/90 px-1 py-3 backdrop-blur-md lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center gap-1 ${
                item.active ? "text-primary-container" : "text-on-surface-variant"
              }`}
            >
              <Icon size={20} />
              <span className="font-label text-[10px] uppercase tracking-[0.08em]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function ClockIcon(props) {
  return <CalendarDays {...props} />;
}
