import { useEffect, useState } from "react";
import { AdminSidebar, MobileAdminNav } from "../components/AdminSidebar";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { deleteFAQ, getFAQs, saveFAQ } from "../lib/content";
import SeoHead from "../components/SeoHead";

const BLANK_FORM = {
  category: "",
  question: "",
  answer: "",
  sort_order: 0,
  is_published: true,
};

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // null = closed, "new" = new FAQ, id = editing that FAQ
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(BLANK_FORM);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    getFAQs()
      .then((data) => { if (data) setFaqs(data); })
      .catch((err) => console.error("Failed to load FAQs:", err))
      .finally(() => setLoading(false));
  }, []);

  function openNew() {
    setForm(BLANK_FORM);
    setFormError("");
    setEditTarget("new");
  }

  function openEdit(faq) {
    setForm({
      category: faq.category ?? "",
      question: faq.question ?? "",
      answer: faq.answer ?? "",
      sort_order: faq.sort_order ?? 0,
      is_published: faq.is_published ?? true,
    });
    setFormError("");
    setEditTarget(faq.id);
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
    if (!form.category.trim() || !form.question.trim() || !form.answer.trim()) {
      setFormError("Category, question, and answer are all required.");
      return;
    }

    setSaving(true);
    try {
      const payload =
        editTarget === "new" ? form : { id: editTarget, ...form };
      const saved = await saveFAQ(payload);

      setFaqs((prev) => {
        if (editTarget === "new") return [...prev, saved];
        return prev.map((f) => (f.id === editTarget ? saved : f));
      });

      setSuccessMsg(
        editTarget === "new" ? "FAQ created successfully." : "FAQ updated."
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
      await deleteFAQ(id);
      setFaqs((prev) => prev.filter((f) => f.id !== id));
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
      <SeoHead title="FAQ Management | ThePrettyPlug" noindex={true} />
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
                FAQ Content
              </h1>
              <p className="mt-1 font-body text-sm text-on-surface-variant md:text-base">
                Manage public FAQ categories, questions, answers, and display order.
              </p>
            </div>
            <button
              type="button"
              onClick={openNew}
              className="inline-flex h-11 items-center justify-center gap-2 bg-primary-container px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
            >
              <Plus size={17} />
              Add FAQ
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
                  {editTarget === "new" ? "New FAQ" : "Edit FAQ"}
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
                      Category <span className="text-error">*</span>
                    </span>
                    <input
                      type="text"
                      value={form.category}
                      onChange={(e) => updateField("category", e.target.value)}
                      placeholder="e.g. Booking, Services, Payments"
                      className="h-11 w-full border-b-2 border-outline-variant bg-surface-container-low px-3 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                    />
                  </label>

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
                </div>

                <label className="block">
                  <span className="mb-1.5 block font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                    Question <span className="text-error">*</span>
                  </span>
                  <input
                    type="text"
                    value={form.question}
                    onChange={(e) => updateField("question", e.target.value)}
                    placeholder="e.g. How do I book an appointment?"
                    className="h-11 w-full border-b-2 border-outline-variant bg-surface-container-low px-3 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                    Answer <span className="text-error">*</span>
                  </span>
                  <textarea
                    value={form.answer}
                    onChange={(e) => updateField("answer", e.target.value)}
                    rows={4}
                    placeholder="Write a clear, helpful answer…"
                    className="w-full border-b-2 border-outline-variant bg-surface-container-low px-3 py-2 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                  />
                </label>

                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.is_published}
                    onChange={(e) =>
                      updateField("is_published", e.target.checked)
                    }
                    className="h-4 w-4 border-outline-variant text-primary-container"
                  />
                  <span className="font-body text-sm text-on-surface-variant">
                    Published (visible on public FAQ page)
                  </span>
                </label>

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
                    {saving ? "Saving…" : editTarget === "new" ? "Create FAQ" : "Save Changes"}
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
          {!loading && faqs.length === 0 && (
            <div className="border border-outline-variant/20 bg-surface-container-lowest p-10 text-center">
              <p className="font-headline text-2xl text-on-surface">No FAQs yet</p>
              <p className="mt-2 font-body text-sm text-on-surface-variant">
                Click "Add FAQ" above to create your first FAQ entry.
              </p>
            </div>
          )}

          {/* FAQ list */}
          {!loading &&
            faqs.map((faq) => (
              <article
                key={faq.id}
                className="border border-outline-variant/20 bg-surface-container-lowest p-5 md:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="bg-tertiary-fixed px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-tertiary-fixed">
                        {faq.category}
                      </span>
                      {!faq.is_published && (
                        <span className="bg-surface-container-highest px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                          Draft
                        </span>
                      )}
                      <span className="font-label text-[10px] uppercase tracking-[0.12em] text-on-surface-variant">
                        Order: {faq.sort_order}
                      </span>
                    </div>
                    <h2 className="font-headline text-xl font-medium text-on-surface">
                      {faq.question}
                    </h2>
                    <p className="mt-2 font-body text-sm leading-6 text-on-surface-variant">
                      {faq.answer}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(faq)}
                      aria-label={`Edit FAQ: ${faq.question}`}
                      className="flex h-9 w-9 items-center justify-center border border-outline-variant text-on-surface-variant transition-colors hover:border-primary-container hover:bg-surface-container hover:text-primary-container"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(faq.id)}
                      aria-label={`Delete FAQ: ${faq.question}`}
                      className="flex h-9 w-9 items-center justify-center border border-outline-variant text-on-surface-variant transition-colors hover:border-error hover:bg-error-container hover:text-on-error-container"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Inline delete confirm */}
                {confirmDeleteId === faq.id && (
                  <div className="mt-4 flex flex-col gap-3 border-t border-outline-variant/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-body text-sm text-on-surface">
                      Delete this FAQ? This cannot be undone.
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
                        disabled={deletingId === faq.id}
                        onClick={() => handleDelete(faq.id)}
                        className="inline-flex h-9 items-center gap-2 bg-error px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-error transition-colors hover:opacity-90 disabled:opacity-60"
                      >
                        {deletingId === faq.id && (
                          <Loader2 size={14} className="animate-spin" />
                        )}
                        {deletingId === faq.id ? "Deleting…" : "Yes, Delete"}
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
