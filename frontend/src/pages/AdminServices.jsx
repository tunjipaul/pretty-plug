import { useEffect, useMemo, useState } from "react";
import { AdminSidebar, MobileAdminNav } from "../components/AdminSidebar";
import {
  Clock,
  Edit3,
  Plus,
  Scissors,
  Search,
  Star,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { getServices, saveService, deleteService, uploadMedia } from "../lib/content";
import SeoHead from "../components/SeoHead";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatPrice(value) {
  return `NGN ${(value || 0).toLocaleString()}`;
}

function parseAddOns(addOns) {
  if (!addOns) return [];
  if (Array.isArray(addOns)) return addOns;
  if (typeof addOns === "string") {
    try {
      const parsed = JSON.parse(addOns);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }
  return [];
}

const EMPTY_FORM = {
  name: "",
  category: "Nails",
  description: "",
  price: "",
  duration_minutes: "",
  image_url: "",
  is_active: true,
  is_featured: false,
  add_ons: [],
};

// ---------------------------------------------------------------------------
// Service Card
// ---------------------------------------------------------------------------
function ServiceCard({ service, onEdit, onDelete }) {
  const isActive = service.is_active;
  const StatusIcon = isActive ? ToggleRight : ToggleLeft;
  const addOnsList = parseAddOns(service.add_ons);

  return (
    <article className="border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm transition-colors hover:border-primary-container/30">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="bg-tertiary-fixed px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-tertiary-fixed">
              {service.category || "—"}
            </span>
            {service.is_featured && (
              <span className="inline-flex items-center gap-1 bg-primary-fixed px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-primary-fixed">
                <Star size={12} />
                Featured
              </span>
            )}
            {addOnsList.length > 0 && (
              <span className="bg-secondary-container px-2.5 py-0.5 font-label text-[10px] font-bold uppercase tracking-[0.10em] text-on-secondary-container">
                {addOnsList.length} Add-on{addOnsList.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <h2 className="font-headline text-2xl font-medium text-on-surface">{service.name}</h2>
          <p className="mt-2 font-body text-sm leading-6 text-on-surface-variant line-clamp-2">
            {service.description}
          </p>
        </div>
        <span className={`inline-flex shrink-0 items-center gap-1.5 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] ${
          isActive ? "bg-green-50 text-green-700" : "bg-surface-container-high text-on-surface-variant"
        }`}>
          <StatusIcon size={14} />
          {isActive ? "Active" : "Hidden"}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-y border-outline-variant/10 py-4">
        <div>
          <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">Price</p>
          <p className="mt-1 font-body font-bold text-on-surface">{formatPrice(service.price)}</p>
        </div>
        <div>
          <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">Duration</p>
          <p className="mt-1 inline-flex items-center gap-1 font-body text-on-surface">
            <Clock size={14} />
            {service.duration_minutes ? `${service.duration_minutes} mins` : "—"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onDelete(service)}
          className="flex h-9 w-9 items-center justify-center border border-outline-variant text-red-400 transition-colors hover:border-red-300 hover:bg-red-50"
          aria-label={`Delete ${service.name}`}
        >
          <Trash2 size={15} />
        </button>
        <button
          type="button"
          onClick={() => onEdit(service)}
          className="inline-flex h-9 items-center gap-2 bg-primary-container px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
        >
          <Edit3 size={14} />
          Edit
        </button>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Service Form Modal
// ---------------------------------------------------------------------------
function ServiceModal({ service, onClose, onSaved }) {
  const isNew = !service?.id;
  const [form, setForm] = useState(
    service
      ? {
          name: service.name ?? "",
          category: service.category ?? "",
          description: service.description ?? "",
          price: service.price ?? "",
          duration_minutes: service.duration_minutes ?? "",
          image_url: service.image_url ?? service.image_path ?? "",
          is_active: service.is_active ?? true,
          is_featured: service.is_featured ?? false,
          add_ons: parseAddOns(service.add_ons),
        }
      : EMPTY_FORM
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function addAddOn() {
    setForm((f) => ({
      ...f,
      add_ons: [...(f.add_ons || []), { name: "", price: 0 }],
    }));
  }

  function updateAddOn(index, field, value) {
    setForm((f) => {
      const updated = [...(f.add_ons || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...f, add_ons: updated };
    });
  }

  function removeAddOn(index) {
    setForm((f) => {
      const updated = [...(f.add_ons || [])];
      updated.splice(index, 1);
      return { ...f, add_ons: updated };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.category.trim() || !form.price) {
      setError("Name, category, and price are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...(service?.id ? { id: service.id } : {}),
        ...form,
        price: Number(form.price),
        duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : null,
      };
      const saved = await saveService(payload);
      onSaved(saved, isNew);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save service.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg overflow-y-auto rounded-none border border-outline-variant/20 bg-surface shadow-2xl max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/20 px-6 py-5">
          <div>
            <p className="font-label text-[10px] font-bold uppercase tracking-[0.14em] text-primary-container">
              {isNew ? "New Service" : "Edit Service"}
            </p>
            <h2 className="font-headline text-2xl font-medium text-on-surface">
              {isNew ? "Add a Service" : form.name || "Edit Service"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
          {error && (
            <p className="bg-red-50 px-4 py-3 font-body text-sm text-red-600">{error}</p>
          )}

          <label className="block">
            <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
              Service Name *
            </span>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="mt-2 h-11 w-full border border-outline-variant/40 bg-surface-container-lowest px-4 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
              placeholder="e.g. Classic Gel Manicure"
              required
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                Category *
              </span>
              <input
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="mt-2 h-11 w-full border border-outline-variant/40 bg-surface-container-lowest px-4 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                placeholder="e.g. Nails"
                required
              />
            </label>
            <label className="block">
              <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                Price (NGN) *
              </span>
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                className="mt-2 h-11 w-full border border-outline-variant/40 bg-surface-container-lowest px-4 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                placeholder="e.g. 15000"
                required
              />
            </label>
          </div>

          <label className="block">
            <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
              Duration (minutes)
            </span>
            <input
              type="number"
              min="0"
              value={form.duration_minutes}
              onChange={(e) => update("duration_minutes", e.target.value)}
              className="mt-2 h-11 w-full border border-outline-variant/40 bg-surface-container-lowest px-4 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
              placeholder="e.g. 60"
            />
          </label>

          <label className="block">
            <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
              Description
            </span>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              className="mt-2 w-full resize-none border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
              placeholder="Brief description of the service..."
            />
          </label>

          {/* Service Image */}
          <div className="border border-outline-variant/30 bg-surface-container-low p-3 space-y-2">
            <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
              Service Photo (Optional)
            </span>
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden bg-surface-container border border-outline-variant/30">
                {form.image_url ? (
                  <img src={form.image_url} alt="Service preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] text-on-surface-variant">No Image</div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  value={form.image_url || ""}
                  onChange={(e) => update("image_url", e.target.value)}
                  className="h-9 w-full border border-outline-variant/40 bg-surface-container-lowest px-3 font-body text-xs text-on-surface outline-none focus:border-primary-container"
                  placeholder="Image URL or upload below..."
                />
                <label className="inline-flex h-8 cursor-pointer items-center justify-center gap-2 border border-outline-variant bg-surface-container-lowest px-3 font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant hover:bg-surface-container">
                  <Upload size={12} />
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const url = await uploadMedia(file);
                        update("image_url", url);
                      } catch (err) {
                        setError(err.message || "Image upload failed");
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Add-Ons & Custom Options */}
          <div className="border border-outline-variant/30 bg-surface-container-low p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface">
                  Add-Ons & Custom Options
                </span>
                <p className="text-[11px] text-on-surface-variant">
                  Optional upgrades clients can select (e.g. Cat-Eye design, French Tip).
                </p>
              </div>
              <button
                type="button"
                onClick={addAddOn}
                className="inline-flex h-8 items-center gap-1.5 bg-primary-container px-3 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
              >
                + Add Option
              </button>
            </div>

            {(!form.add_ons || form.add_ons.length === 0) ? (
              <p className="py-2 text-xs italic text-on-surface-variant/70">No add-ons configured.</p>
            ) : (
              <div className="space-y-2 pt-1">
                {form.add_ons.map((addon, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={addon.name || ""}
                      onChange={(e) => updateAddOn(idx, "name", e.target.value)}
                      placeholder="Option name (e.g. Cat-Eye design)"
                      className="h-9 flex-1 border border-outline-variant/40 bg-surface-container-lowest px-3 font-body text-xs text-on-surface outline-none focus:border-primary-container"
                    />
                    <div className="relative w-28 shrink-0">
                      <span className="absolute left-2.5 top-2.5 font-body text-xs text-on-surface-variant">₦</span>
                      <input
                        type="number"
                        value={addon.price ?? 0}
                        onChange={(e) => updateAddOn(idx, "price", Number(e.target.value) || 0)}
                        placeholder="Price"
                        className="h-9 w-full border border-outline-variant/40 bg-surface-container-lowest pl-6 pr-2 font-body text-xs text-on-surface outline-none focus:border-primary-container"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAddOn(idx)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center border border-outline-variant/40 bg-surface-container-lowest text-red-600 hover:bg-red-50"
                      title="Remove option"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <label className="flex cursor-pointer items-center gap-3">
              <div
                onClick={() => update("is_active", !form.is_active)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  form.is_active ? "bg-primary-container" : "bg-outline-variant"
                }`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  form.is_active ? "translate-x-5" : "translate-x-0.5"
                }`} />
              </div>
              <span className="font-label text-xs font-semibold uppercase tracking-[0.10em] text-on-surface">
                Active
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-3">
              <div
                onClick={() => update("is_featured", !form.is_featured)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  form.is_featured ? "bg-primary-container" : "bg-outline-variant"
                }`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  form.is_featured ? "translate-x-5" : "translate-x-0.5"
                }`} />
              </div>
              <span className="font-label text-xs font-semibold uppercase tracking-[0.10em] text-on-surface">
                Featured
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 border-t border-outline-variant/20 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="h-11 flex-1 border border-outline-variant font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="h-11 flex-1 bg-primary-container font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary disabled:opacity-60"
            >
              {saving ? "Saving..." : isNew ? "Add Service" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Delete Confirm Modal
// ---------------------------------------------------------------------------
function DeleteModal({ service, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteService(service.id);
      onDeleted(service.id);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to delete.");
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm border border-outline-variant/20 bg-surface p-8 shadow-2xl">
        <h2 className="font-headline text-2xl font-medium text-on-surface">Delete Service?</h2>
        <p className="mt-3 font-body text-sm text-on-surface-variant">
          <span className="font-bold text-on-surface">"{service.name}"</span> will be permanently
          removed and will no longer appear on the booking page.
        </p>
        {error && <p className="mt-3 font-body text-sm text-red-600">{error}</p>}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 border border-outline-variant font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant hover:bg-surface-container"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={deleting}
            onClick={handleDelete}
            className="h-11 flex-1 bg-red-600 font-label text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-red-700 disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function AdminServices() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(undefined); // undefined = closed, null = new
  const [deletingService, setDeletingService] = useState(null);

  useEffect(() => {
    getServices().then((data) => {
      if (data) setServices(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(services.map((s) => s.category).filter(Boolean))];
    return ["All", ...cats];
  }, [services]);

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      const matchCat = activeCategory === "All" || s.category === activeCategory;
      const matchSearch = [s.name, s.category, s.description].join(" ").toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [services, activeCategory, query]);

  const activeCount = services.filter((s) => s.is_active).length;
  const featuredCount = services.filter((s) => s.is_featured).length;
  const averagePrice = services.length > 0
    ? Math.round(services.reduce((t, s) => t + (s.price || 0), 0) / services.length)
    : 0;

  function handleSaved(saved, isNew) {
    if (isNew) {
      setServices((prev) => [saved, ...prev]);
    } else {
      setServices((prev) => prev.map((s) => (s.id === saved.id ? saved : s)));
    }
  }

  function handleDeleted(id) {
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      <SeoHead title="Services Catalog Management | ThePrettyPlug" noindex={true} />
      <AdminSidebar />

      {/* Modals */}
      {editingService !== undefined && (
        <ServiceModal
          service={editingService}
          onClose={() => setEditingService(undefined)}
          onSaved={handleSaved}
        />
      )}
      {deletingService && (
        <DeleteModal
          service={deletingService}
          onClose={() => setDeletingService(null)}
          onDeleted={handleDeleted}
        />
      )}

      <main className="min-h-screen pb-28 lg:ml-64 lg:pb-0">
        <header className="sticky top-0 z-40 border-b border-outline-variant/30 bg-surface/90 px-4 py-4 backdrop-blur-md sm:px-5 md:px-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="font-label text-xs font-semibold uppercase tracking-[0.16em] text-primary-container">
                Admin
              </p>
              <h1 className="mt-1 font-headline text-3xl font-medium leading-tight text-on-surface sm:text-4xl">
                Services Management
              </h1>
              <p className="mt-1 font-body text-sm text-on-surface-variant md:text-base">
                Add, edit, and manage services shown on the booking page.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEditingService(null)}
              className="inline-flex h-11 items-center justify-center gap-2 bg-primary-container px-5 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
            >
              <Plus size={17} />
              Add Service
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-5 md:space-y-8 md:p-8 xl:p-10">
          {/* Stats */}
          <section className="grid grid-cols-3 gap-3 md:gap-4">
            {[
              { label: "Total Services", value: services.length },
              { label: "Active", value: activeCount },
              { label: "Average Price", value: services.length > 0 ? `NGN ${averagePrice.toLocaleString()}` : "—" },
            ].map(({ label, value }) => (
              <div key={label} className="border border-outline-variant/20 bg-surface-container-lowest p-4 md:p-5">
                <p className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">{label}</p>
                <p className="mt-2 font-display text-2xl font-semibold text-on-surface md:text-4xl">{value}</p>
              </div>
            ))}
          </section>

          {/* Search & Filter */}
          <div className="border border-outline-variant/20 bg-surface-container-low p-4 md:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <label className="relative block w-full lg:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-12 w-full border-0 border-b-2 border-outline-variant bg-surface-container-lowest pl-12 pr-4 font-body text-sm outline-none transition-colors focus:border-primary-container"
                  placeholder="Search by name, category, or description"
                />
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`h-9 shrink-0 border px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                      activeCategory === cat
                        ? "border-primary-container bg-primary-container text-on-primary"
                        : "border-outline-variant text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Service Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-52 animate-pulse rounded bg-surface-container-highest" />
              ))}
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="border border-outline-variant/20 bg-surface-container-lowest p-16 text-center">
              <Scissors size={40} className="mx-auto text-outline-variant/40" />
              <p className="mt-5 font-headline text-2xl text-on-surface">
                {services.length === 0 ? "No services yet" : "No services found"}
              </p>
              <p className="mt-2 font-body text-sm text-on-surface-variant">
                {services.length === 0
                  ? "Click \"Add Service\" to create your first service."
                  : "Try a different search or category."}
              </p>
              {services.length === 0 && (
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="mt-6 inline-flex items-center gap-2 bg-primary-container px-6 py-3 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary hover:bg-primary"
                >
                  <Plus size={16} />
                  Add First Service
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onEdit={(s) => setEditingService(s)}
                  onDelete={(s) => setDeletingService(s)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <MobileAdminNav />
    </div>
  );
}
