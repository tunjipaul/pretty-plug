import { useEffect, useState } from "react";
import { AdminSidebar, MobileAdminNav } from "../components/AdminSidebar";
import { ApiErrorDisplay } from "../components/ApiErrorBoundary";
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
import { getSetting, saveSetting } from "../lib/content";

const defaultSettings = {
  business: {
    name: "ThePrettyPlug",
    location: "Abeokuta Suite",
    email: "hello@theprettyplug.test",
    whatsapp: "+234 800 000 0000",
    address: "Abeokuta, Ogun State, Nigeria",
  },
  socials: {
    instagram: "https://instagram.com/theprettyplug",
    twitter: "",
    facebook: "",
  },
  hours: [
    { day: "Monday", open: "09:00 AM", close: "08:00 PM", active: true },
    { day: "Tuesday", open: "09:00 AM", close: "08:00 PM", active: true },
    { day: "Wednesday", open: "09:00 AM", close: "08:00 PM", active: true },
    { day: "Thursday", open: "09:00 AM", close: "08:00 PM", active: true },
    { day: "Friday", open: "09:00 AM", close: "08:00 PM", active: true },
    { day: "Saturday", open: "09:00 AM", close: "08:00 PM", active: true },
    { day: "Sunday", open: "01:00 PM", close: "07:00 PM", active: true },
  ],
  payment: {
    bank: "Kuda",
    accountNumber: "3003588180",
    accountName: "Lafulu Marvelous Omotayo",
  },
  bookingPolicy: {
    depositPercent: 40,
    allowSameDay: true,
    lateArrival: "30 min = cancellation",
    rescheduling: "Notify 1 hour before",
  },
};

const notificationRules = [
  ["Booking confirmation", "Email, WhatsApp"],
  ["Deposit reminder", "WhatsApp"],
  ["Appointment reminder", "24 hours before"],
  ["Review request", "2 hours after completion"],
];

function Field({ label, value, type = "text", onChange }) {
  return (
    <label className="block">
      <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  const [settings, setSettings] = useState(defaultSettings);
  const [status, setStatus] = useState("Ready");
  const [error, setError] = useState(null);

  useEffect(() => {
    getSetting("global_settings")
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setSettings((prev) => ({
            ...prev,
            ...data,
            hours: data.hours || prev.hours,
            payment: { ...prev.payment, ...(data.payment || {}) },
            bookingPolicy: { ...prev.bookingPolicy, ...(data.bookingPolicy || {}) },
          }));
        }
      })
      .catch((err) => {
        console.error("Failed to load settings:", err);
        setError(err.message || "Failed to load settings");
      });
  }, []);

  function updateBusiness(field, value) {
    setSettings((prev) => ({
      ...prev,
      business: { ...prev.business, [field]: value },
    }));
    setError(null);
    setStatus("Unsaved");
  }

  function updateHour(index, field, value) {
    setSettings((prev) => {
      const newHours = [...prev.hours];
      newHours[index] = { ...newHours[index], [field]: value };
      return { ...prev, hours: newHours };
    });
    setStatus("Unsaved");
  }

  function updatePayment(field, value) {
    setSettings((prev) => ({
      ...prev,
      payment: { ...prev.payment, [field]: value },
    }));
    setStatus("Unsaved");
  }

  function updatePolicy(field, value) {
    setSettings((prev) => ({
      ...prev,
      bookingPolicy: { ...prev.bookingPolicy, [field]: value },
    }));
    setStatus("Unsaved");
  }

  async function handleSave() {
    setStatus("Saving...");
    setError(null);
    try {
      await saveSetting("global_settings", settings);
      setStatus("Saved");
    } catch (err) {
      console.error("Save failed:", err);
      const errMsg = err.message || "Failed to save settings";
      setError(errMsg);
      setStatus("Error");
    }
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      <AdminSidebar />
      <ApiErrorDisplay error={error} onDismiss={() => setError(null)} />

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

            <div className="flex items-center gap-3">
              <span className="text-sm text-on-surface-variant">{status}</span>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex h-11 items-center justify-center gap-2 bg-primary-container px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
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
                <Field
                  label="Business Name"
                  value={settings.business.name}
                  onChange={(val) => updateBusiness("name", val)}
                />
                <Field
                  label="Location Label"
                  value={settings.business.location}
                  onChange={(val) => updateBusiness("location", val)}
                />
                <Field
                  label="Contact Email"
                  value={settings.business.email}
                  type="email"
                  onChange={(val) => updateBusiness("email", val)}
                />
                <Field
                  label="WhatsApp Number"
                  value={settings.business.whatsapp}
                  onChange={(val) => updateBusiness("whatsapp", val)}
                />
              </div>
              <label className="mt-4 block">
                <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                  Studio Address
                </span>
                <textarea
                  value={settings.business.address}
                  onChange={(e) => updateBusiness("address", e.target.value)}
                  rows={3}
                  className="mt-2 w-full resize-none border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                />
              </label>
            </SettingCard>

            <SettingCard
              icon={CalendarDays}
              title="Booking Policy"
              description="These rules are shown to clients in the booking wizard."
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Field
                  label="Deposit (%)"
                  value={String(settings.bookingPolicy.depositPercent)}
                  onChange={(val) => updatePolicy("depositPercent", Number(val) || 0)}
                />
                <Field
                  label="Late Arrival Policy"
                  value={settings.bookingPolicy.lateArrival}
                  onChange={(val) => updatePolicy("lateArrival", val)}
                />
                <Field
                  label="Rescheduling Policy"
                  value={settings.bookingPolicy.rescheduling}
                  onChange={(val) => updatePolicy("rescheduling", val)}
                />
              </div>
              <div className="mt-4 divide-y divide-outline-variant/10 border border-outline-variant/20 bg-surface">
                <ToggleRow
                  label="Require deposit before confirmation"
                  description="Bookings remain pending until deposit is recorded."
                />
                <div className="flex items-center justify-between gap-4 border-b border-outline-variant/10 py-4 last:border-b-0">
                  <div>
                    <p className="font-body font-bold text-on-surface">Allow same-day bookings</p>
                    <p className="mt-1 text-sm text-on-surface-variant">Clients can book available slots for the current day.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => updatePolicy("allowSameDay", !settings.bookingPolicy.allowSameDay)}
                    className={settings.bookingPolicy.allowSameDay ? "text-primary-container" : "text-on-surface-variant"}
                    aria-label={`${settings.bookingPolicy.allowSameDay ? "Disable" : "Enable"} same-day bookings`}
                  >
                    {createElement(settings.bookingPolicy.allowSameDay ? ToggleRight : ToggleLeft, { size: 34 })}
                  </button>
                </div>
                <ToggleRow
                  label="Collect client notes"
                  description="Show allergies, style requests, and special instructions field."
                />
              </div>
            </SettingCard>

            <SettingCard
              icon={ClockIcon}
              title="Opening Hours"
              description="Weekly availability shown in the booking flow and footer. Changes are saved with the Save button above."
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
                    {settings.hours.map((row, idx) => (
                      <tr key={row.day}>
                        <td className="p-4 font-body font-bold text-on-surface">
                          {row.day}
                        </td>
                        <td className="p-4">
                          <input
                            value={row.active ? row.open : "—"}
                            disabled={!row.active}
                            onChange={(e) => updateHour(idx, "open", e.target.value)}
                            className="w-28 border border-outline-variant/30 bg-surface-container-lowest px-3 py-1.5 font-body text-sm text-on-surface outline-none focus:border-primary-container disabled:opacity-40"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            value={row.active ? row.close : "—"}
                            disabled={!row.active}
                            onChange={(e) => updateHour(idx, "close", e.target.value)}
                            className="w-28 border border-outline-variant/30 bg-surface-container-lowest px-3 py-1.5 font-body text-sm text-on-surface outline-none focus:border-primary-container disabled:opacity-40"
                          />
                        </td>
                        <td className="p-4">
                          <button
                            type="button"
                            onClick={() => updateHour(idx, "active", !row.active)}
                            className={`px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] cursor-pointer transition-colors ${
                              row.active
                                ? "bg-green-50 text-green-700 hover:bg-green-100"
                                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                            }`}
                          >
                            {row.active ? "Open" : "Closed"}
                          </button>
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
              title="Bank Transfer Details"
              description="Account details shown to clients during booking deposit payment."
            >
              <div className="space-y-4">
                <Field
                  label="Bank Name"
                  value={settings.payment.bank}
                  onChange={(val) => updatePayment("bank", val)}
                />
                <Field
                  label="Account Number"
                  value={settings.payment.accountNumber}
                  onChange={(val) => updatePayment("accountNumber", val)}
                />
                <Field
                  label="Account Name"
                  value={settings.payment.accountName}
                  onChange={(val) => updatePayment("accountName", val)}
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

      <MobileAdminNav />
    </div>
  );
}

function ClockIcon(props) {
  return <CalendarDays {...props} />;
}
