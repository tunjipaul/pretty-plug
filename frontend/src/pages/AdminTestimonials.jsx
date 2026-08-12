import { useEffect, useState } from "react";
import { AdminSidebar, MobileAdminNav } from "../components/AdminSidebar";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Pencil,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { deleteTestimonial, getTestimonials, saveTestimonial } from "../lib/content";
import SeoHead from "../components/SeoHead";

const BLANK_FORM = {
  client_name: "",
  service_label: "",
  quote: "",
  rating: 5,
  avatar_path: "",
  is_featured: false,
  is_published: true,
  sort_order: 0,
};

function StarRating({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          aria-label={`${star} star`}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={22}
            className={
              star <= value
                ? "fill-secondary text-secondary"
                : "text-outline-variant"
            }
          />
        </button>
      ))}
      <span className="ml-2 font-label text-xs uppercase tracking-[0.12em] text-on-surface-variant">
        {value} / 5
      </span>
    </div>
  );
}

export default function AdminTestimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // null = closed, "new" = adding, id = editing
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(BLANK_FORM);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    getTestimonials()
      .then((data) => { if (data) setReviews(data); })
      .catch((err) => console.error("Failed to load testimonials:", err))
      .finally(() => setLoading(false));
  }, []);

  function openNew() {
    setForm(BLANK_FORM);
    setFormError("");
    setEditTarget("new");
  }

  function openEdit(review) {
    setForm({
      client_name: review.client_name ?? "",
      service_label: review.service_label ?? "",
      quote: review.quote ?? "",
      rating: review.rating ?? 5,
      avatar_path: review.avatar_path ?? "",
      is_featured: review.is_featured ?? false,
      is_published: review.is_published ?? true,
      sort_order: review.sort_order ?? 0,
    });
    setFormError("");
    setEditTarget(review.id);
  }

  function closeForm() {
    setEditTarget(null);
    setFormError("");
  }

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (formError) setFormError("");
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.client_name.trim() || !form.quote.trim()) {
      setFormError("Client name and quote are required.");
      return;
    }

    setSaving(true);
    try {
      const payload =
        editTarget === "new" ? form : { id: editTarget, ...form };
      const saved = await saveTestimonial(payload);

      setReviews((prev) => {
        if (editTarget === "new") return [...prev, saved];
        return prev.map((r) => (r.id === editTarget ? saved : r));
      });

      setSuccessMsg(
        editTarget === "new"
          ? "Testimonial created successfully."
          : "Testimonial updated."
      );
      setTimeout(() => setSuccessMsg(""), 3000);
      closeForm();
    } catch (err) {
      setFormError(err.message || "Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      await deleteTestimonial(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingId(null);
    }
  }

  const isFormOpen = editTarget !== null;

  return (
    <div className="min-h-screen bg-background text-on-background">
      <SeoHead title="Testimonials Management | ThePrettyPlug" noindex={true} />
      <AdminSidebar />

      <main className="min-h-screen pb-28 lg:ml-64 lg:pb-0">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-outline-variant/30 bg-surface/90 px-4 py-4 backdrop-blur-md sm:px-5 md:px-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="font-label text-xs font-semibold uppercase tracking-[0.16em] text-primary-container">
                CMS
              </p>
              <h1 className="mt-1 font-headline text-3xl font-medium leading-tight text-on-surface sm:text-4xl">
                Testimonials
              </h1>
              <p className="mt-1 font-body text-sm text-on-surface-variant md:text-base">
                Manage public reviews, featured quotes, client names, and service labels.
              </p>
            </div>
            <button
              type="button"
              onClick={openNew}
              className="inline-flex h-11 items-center justify-center gap-2 bg-primary-container px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
            >
              <Plus size={17} />
              Add Testimonial
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-5xl space-y-4 p-4 sm:p-5 md:p-8 xl:p-10">
          {/* Success toast */}
          {successMsg && (
            <div className="flex items-center gap-3 border border-green-200 bg-green-50 px-4 py-3 text-green-700">
              <CheckCircle2 size={18} className="shrink-0" />
              <p className="font-body text-sm">{successMsg}</p>
            </div>
          )}

          {/* Inline form */}
          {isFormOpen && (
            <section className="border border-primary-container/30 bg-surface-container-lowest p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-headline text-2xl font-medium text-on-surface">
                  {editTarget === "new" ? "New Testimonial" : "Edit Testimonial"}
                </h2>
                <button
                  type="button"
                  onClick={closeForm}
                  aria-label="Close form"
                  className="p-1 text-on-surface-variant hover:text-on-surface"
                >
                  <X size={20} />
                </button>
              </div>

              {formError && (
                <div className="mb-4 flex items-start gap-2 border border-error/30 bg-error-container px-4 py-3 text-on-error-container">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <p className="font-body text-sm">{formError}</p>
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                      Client Name <span className="text-error">*</span>
                    </span>
                    <input
                      type="text"
                      value={form.client_name}
                      onChange={(e) => updateField("client_name", e.target.value)}
                      placeholder="e.g. Folake Adeyemi"
                      className="h-11 w-full border-b-2 border-outline-variant bg-surface-container-low px-3 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                      Service Label
                    </span>
                    <input
                      type="text"
                      value={form.service_label}
                      onChange={(e) => updateField("service_label", e.target.value)}
                      placeholder="e.g. Gel Extensions"
                      className="h-11 w-full border-b-2 border-outline-variant bg-surface-container-low px-3 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                    Quote <span className="text-error">*</span>
                  </span>
                  <textarea
                    value={form.quote}
                    onChange={(e) => updateField("quote", e.target.value)}
                    rows={3}
                    placeholder="Write the client's testimonial in their own words…"
                    className="w-full border-b-2 border-outline-variant bg-surface-container-low px-3 py-2 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                  />
                </label>

                <div>
                  <span className="mb-2 block font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                    Rating
                  </span>
                  <StarRating
                    value={form.rating}
                    onChange={(v) => updateField("rating", v)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                      Sort Order
                    </span>
                    <input
                      type="number"
                      value={form.sort_order}
                      min={0}
                      onChange={(e) =>
                        updateField("sort_order", Number(e.target.value))
                      }
                      className="h-11 w-full border-b-2 border-outline-variant bg-surface-container-low px-3 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                      Avatar URL (optional)
                    </span>
                    <input
                      type="url"
                      value={form.avatar_path}
                      onChange={(e) => updateField("avatar_path", e.target.value)}
                      placeholder="https://…"
                      className="h-11 w-full border-b-2 border-outline-variant bg-surface-container-low px-3 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap gap-6">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={form.is_featured}
                      onChange={(e) => updateField("is_featured", e.target.checked)}
                      className="h-4 w-4 border-outline-variant text-primary-container"
                    />
                    <span className="font-body text-sm text-on-surface-variant">
                      Featured (shown on homepage)
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={form.is_published}
                      onChange={(e) => updateField("is_published", e.target.checked)}
                      className="h-4 w-4 border-outline-variant text-primary-container"
                    />
                    <span className="font-body text-sm text-on-surface-variant">
                      Published (visible on public page)
                    </span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 border-t border-outline-variant/20 pt-5">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="h-11 border border-outline-variant px-5 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:bg-surface-container"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex h-11 items-center gap-2 bg-primary-container px-5 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary disabled:opacity-70"
                  >
                    {saving && <Loader2 size={16} className="animate-spin" />}
                    {saving
                      ? "Saving…"
                      : editTarget === "new"
                        ? "Create Testimonial"
                        : "Save Changes"}
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-outline-variant border-t-primary-container" />
            </div>
          )}

          {/* Empty state */}
          {!loading && reviews.length === 0 && (
            <div className="border border-outline-variant/20 bg-surface-container-lowest p-10 text-center">
              <p className="font-headline text-2xl text-on-surface">
                No testimonials yet
              </p>
              <p className="mt-2 font-body text-sm text-on-surface-variant">
                Click "Add Testimonial" above to add your first client review.
              </p>
            </div>
          )}

          {/* Testimonials list */}
          {!loading &&
            reviews.map((review) => (
              <article
                key={review.id}
                className="border border-outline-variant/20 bg-surface-container-lowest p-5 md:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      {review.is_featured && (
                        <span className="inline-flex items-center gap-1 bg-primary-fixed px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-primary-fixed">
                          <Star size={11} className="fill-current" />
                          Featured
                        </span>
                      )}
                      {!review.is_published && (
                        <span className="bg-surface-container-highest px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                          Draft
                        </span>
                      )}
                      {/* Star display */}
                      <span className="inline-flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            className={
                              i < (review.rating || 5)
                                ? "fill-secondary text-secondary"
                                : "text-outline-variant"
                            }
                          />
                        ))}
                      </span>
                    </div>

                    <h2 className="font-headline text-xl font-medium text-on-surface">
                      {review.client_name}
                    </h2>
                    {review.service_label && (
                      <p className="mt-0.5 font-body text-sm text-on-surface-variant">
                        {review.service_label}
                      </p>
                    )}
                    <p className="mt-3 font-body text-base italic leading-7 text-on-surface">
                      "{review.quote}"
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(review)}
                      aria-label={`Edit testimonial by ${review.client_name}`}
                      className="flex h-9 w-9 items-center justify-center border border-outline-variant text-on-surface-variant transition-colors hover:border-primary-container hover:bg-surface-container hover:text-primary-container"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(review.id)}
                      aria-label={`Delete testimonial by ${review.client_name}`}
                      className="flex h-9 w-9 items-center justify-center border border-outline-variant text-on-surface-variant transition-colors hover:border-error hover:bg-error-container hover:text-on-error-container"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Inline delete confirm */}
                {confirmDeleteId === review.id && (
                  <div className="mt-4 flex flex-col gap-3 border-t border-outline-variant/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-body text-sm text-on-surface">
                      Delete this testimonial? This cannot be undone.
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="h-9 border border-outline-variant px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:bg-surface-container"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === review.id}
                        onClick={() => handleDelete(review.id)}
                        className="inline-flex h-9 items-center gap-2 bg-error px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-error transition-colors hover:opacity-90 disabled:opacity-60"
                      >
                        {deletingId === review.id && (
                          <Loader2 size={14} className="animate-spin" />
                        )}
                        {deletingId === review.id ? "Deleting…" : "Yes, Delete"}
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))}
        </div>
      </main>

      <MobileAdminNav />
    </div>
  );
}
