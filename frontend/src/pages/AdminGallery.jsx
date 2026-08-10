import { useEffect, useState } from "react";
import { AdminSidebar, MobileAdminNav } from "../components/AdminSidebar";
import {
  Trash,
  Upload,
  X,
} from "lucide-react";
import { getGallery, saveGalleryItem, uploadMedia, deleteGalleryItem, deleteGalleryItems } from "../lib/content";

function resolveImageUrl(p) {
  if (!p) return "";
  if (typeof p === "string") return p;
  if (typeof p === "object") {
    return (
      p.publicUrl || p.publicURL || p.public_url || p.url ||
      Object.values(p).find((v) => typeof v === "string" && v.startsWith("http")) ||
      ""
    );
  }
  return "";
}

// ---------------------------------------------------------------------------
// Edit Modal
// ---------------------------------------------------------------------------
function EditGalleryModal({ item, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: item.title ?? "",
    category: item.category ?? "",
    is_published: item.is_published ?? true,
    is_featured: item.is_featured ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = { ...item, ...form };
      const saved = await saveGalleryItem(payload);
      onSaved(saved);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md overflow-hidden rounded-none border border-outline-variant/20 bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-outline-variant/20 px-6 py-5">
          <h2 className="font-headline text-2xl font-medium text-on-surface">Edit Image Info</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <X size={20} />
          </button>
        </div>

        <div className="h-48 w-full bg-surface-container-highest">
          <img
            src={resolveImageUrl(item.image_path)}
            alt={form.title}
            className="h-full w-full object-cover"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
          {error && <p className="bg-red-50 px-4 py-3 font-body text-sm text-red-600">{error}</p>}

          <label className="block">
            <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">Title</span>
            <input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="mt-2 h-11 w-full border border-outline-variant/40 bg-surface-container-lowest px-4 font-body text-sm outline-none transition-colors focus:border-primary-container"
              placeholder="e.g. Silk Lash Extension"
              required
            />
          </label>

          <label className="block">
            <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">Category</span>
            <input
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="mt-2 h-11 w-full border border-outline-variant/40 bg-surface-container-lowest px-4 font-body text-sm outline-none transition-colors focus:border-primary-container"
              placeholder="e.g. Lashes"
            />
          </label>

          <div className="flex gap-6">
            <label className="flex cursor-pointer items-center gap-3">
              <div
                onClick={() => update("is_published", !form.is_published)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  form.is_published ? "bg-primary-container" : "bg-outline-variant"
                }`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  form.is_published ? "translate-x-5" : "translate-x-0.5"
                }`} />
              </div>
              <span className="font-label text-xs font-semibold uppercase tracking-[0.10em] text-on-surface">Published</span>
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
              <span className="font-label text-xs font-semibold uppercase tracking-[0.10em] text-on-surface">Featured</span>
            </label>
          </div>

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
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getGallery().then((data) => {
      if (data) setItems(data);
      setLoading(false);
    });
  }, []);

  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      setSelectAll(next.size === items.length && items.length > 0);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selectAll) {
      setSelected(new Set());
      setSelectAll(false);
    } else {
      setSelected(new Set(items.map((i) => i.id)));
      setSelectAll(true);
    }
  }

  async function handleDeleteSingle(id) {
    if (!confirm("Delete this image?")) return;
    try {
      setError(null);
      await deleteGalleryItem(id);
      setItems((prev) => prev.filter((p) => p.id !== id));
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (err) {
      setError(`Delete failed: ${err.message || "Unknown error"}`);
    }
  }

  async function handleBulkDelete() {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    if (!confirm(`Delete ${ids.length} images?`)) return;
    try {
      setError(null);
      await deleteGalleryItems(ids);
      setItems((prev) => prev.filter((p) => !selected.has(p.id)));
      setSelected(new Set());
      setSelectAll(false);
    } catch (err) {
      setError(`Bulk delete failed: ${err.message || "Unknown error"}`);
    }
  }

  async function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadMedia(file);
      const newItem = {
        title: "New Work",
        category: "General",
        image_path: url,
        is_published: true,
        is_featured: false,
      };
      const saved = await saveGalleryItem(newItem);
      setItems((prev) => [saved, ...prev]);
      setEditingItem(saved); // Open edit modal immediately for the new upload
    } catch (err) {
      setError(`Upload failed: ${err.message || "Unknown error"}`);
    } finally {
      setUploading(false);
      // Reset input
      event.target.value = "";
    }
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      <AdminSidebar />

      {editingItem && (
        <EditGalleryModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSaved={(saved) => {
            setItems((prev) => prev.map((item) => (item.id === saved.id ? saved : item)));
          }}
        />
      )}

      <main className="min-h-screen pb-28 lg:ml-64 lg:pb-0">
        <header className="sticky top-0 z-40 border-b border-outline-variant/30 bg-surface/90 px-4 py-4 backdrop-blur-md sm:px-5 md:px-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="font-label text-xs font-semibold uppercase tracking-[0.16em] text-primary-container">
                CMS
              </p>
              <h1 className="mt-1 font-headline text-3xl font-medium leading-tight text-on-surface sm:text-4xl">
                Gallery & Portfolio
              </h1>
              <p className="mt-1 font-body text-sm text-on-surface-variant md:text-base">
                Manage public portfolio images, categories, captions, and featured work.
              </p>
            </div>
            <label className={`inline-flex h-11 cursor-pointer items-center justify-center gap-2 px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
              uploading ? "bg-surface-container text-on-surface-variant cursor-not-allowed" : "bg-primary-container text-on-primary hover:bg-primary"
            }`}>
              {uploading ? (
                <>Uploading...</>
              ) : (
                <>
                  <Upload size={17} />
                  Upload New Image
                  <input type="file" className="hidden" onChange={handleUpload} accept="image/*" disabled={uploading} />
                </>
              )}
            </label>
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-5 md:p-8 xl:p-10">
          {error && <div className="bg-red-50 p-4 font-body text-red-600">{error}</div>}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
                <span className="font-body text-sm text-on-surface-variant">Select all</span>
              </label>
              <button
                onClick={handleBulkDelete}
                disabled={selected.size === 0}
                className="inline-flex h-9 items-center gap-2 rounded px-3 py-2 bg-red-600 font-label text-xs font-semibold uppercase tracking-[0.12em] text-white transition-opacity disabled:opacity-50"
              >
                <Trash size={14} /> Delete Selected
              </button>
            </div>
          </div>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-4/3 w-full animate-pulse bg-surface-container-highest" />
              ))
            ) : items.length === 0 ? (
              <div className="col-span-full border border-outline-variant/20 bg-surface-container-lowest p-16 text-center">
                <p className="font-headline text-2xl text-on-surface">No images found</p>
                <p className="mt-2 font-body text-sm text-on-surface-variant">
                  Upload an image to start building your gallery.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <article
                  key={item.id}
                  className="group relative overflow-hidden border border-outline-variant/20 bg-surface-container-lowest transition-colors hover:border-primary-container/40"
                >
                  <div className="absolute z-10 m-3">
                    <input
                      type="checkbox"
                      checked={selected.has(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="h-4 w-4"
                    />
                  </div>
                  <img
                    src={resolveImageUrl(item.image_path)}
                    alt={item.title}
                    className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <span className="bg-tertiary-fixed px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-tertiary-fixed">
                        {item.category || "General"}
                      </span>
                      <span className={`font-label text-[10px] font-bold uppercase tracking-[0.12em] ${
                        item.is_featured ? "text-primary-container" : "text-on-surface-variant"
                      }`}>
                        {item.is_featured ? "★ Featured" : item.is_published ? "Published" : "Hidden"}
                      </span>
                    </div>
                    <h2 className="font-headline text-xl font-medium text-on-surface line-clamp-1">
                      {item.title}
                    </h2>
                    
                    <div className="mt-5 flex items-center justify-between border-t border-outline-variant/10 pt-4">
                      <button
                        onClick={() => handleDeleteSingle(item.id)}
                        className="inline-flex items-center gap-2 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-red-600 hover:text-red-700"
                      >
                        <Trash size={14} /> Delete
                      </button>
                      <button
                        onClick={() => setEditingItem(item)}
                        className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-primary-container hover:text-primary"
                      >
                        Edit Info →
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        </div>
      </main>
      <MobileAdminNav />
    </div>
  );
}
