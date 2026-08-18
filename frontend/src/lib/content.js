const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// ---------------------------------------------------------------------------
// Stale-While-Revalidate (SWR) localStorage Cache
// ---------------------------------------------------------------------------
// Data is cached in localStorage so it survives page reloads and new tabs.
// On each call: return cached data instantly → fetch fresh data in background
// → update cache. This eliminates the blank-screen wait on repeat visits.
const SWR_PREFIX = "pp_cache_";
const SWR_FRESH_MS = 60_000; // data is "fresh" for 60 s (no refetch at all)

/** Read cached entry from localStorage. Returns { data, timestamp } or null. */
function swrRead(key) {
  try {
    const raw = localStorage.getItem(SWR_PREFIX + key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Write data + timestamp to localStorage cache. */
function swrWrite(key, data) {
  try {
    localStorage.setItem(
      SWR_PREFIX + key,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // localStorage full — silently ignore
  }
}

/**
 * SWR-fetch: returns cached data instantly if available, then revalidates in
 * the background. If no cache exists, falls back to a normal await.
 *
 * @param {string}   cacheKey  Unique key for this endpoint
 * @param {Function} fetcher   Async function that returns fresh data
 * @param {Function} [onUpdate] Optional callback fired when background refresh
 *                              returns newer data (lets React setState again)
 */
async function swrFetch(cacheKey, fetcher, onUpdate) {
  const cached = swrRead(cacheKey);
  const now = Date.now();

  // If cache is fresh enough, return it directly — no fetch at all
  if (cached && now - cached.timestamp < SWR_FRESH_MS) {
    return cached.data;
  }

  // If cache exists but is stale, return it instantly and revalidate in bg
  if (cached) {
    fetcher()
      .then((freshData) => {
        swrWrite(cacheKey, freshData);
        if (onUpdate) onUpdate(freshData);
      })
      .catch(() => {}); // background refresh failed — stale data is still fine
    return cached.data;
  }

  // No cache at all (first visit) — must await the fetch
  const freshData = await fetcher();
  swrWrite(cacheKey, freshData);
  return freshData;
}

/** Invalidate a specific cache key (e.g. after admin saves). */
export function invalidateCache(key) {
  localStorage.removeItem(SWR_PREFIX + key);
}

/** Invalidate ALL SWR caches (e.g. after bulk admin changes). */
export function invalidateAllCaches() {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(SWR_PREFIX))
    .forEach((k) => localStorage.removeItem(k));
}

// ---------------------------------------------------------------------------
// Auth helpers
// ---------------------------------------------------------------------------
const TOKEN_KEY = "theprettyplug_admin_jwt";
const SESSION_KEY = "theprettyplug_admin_session";
const USER_KEY = "theprettyplug_admin_user";

export function getStoredToken() {
  return window.localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  try {
    return JSON.parse(window.localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

export async function loginAdmin(email, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const text = await response.text();
    let detail = "Invalid email or password.";
    try {
      detail = JSON.parse(text).detail || detail;
    } catch {}
    throw new Error(detail);
  }

  const data = await response.json();
  window.localStorage.setItem(TOKEN_KEY, data.access_token);
  window.localStorage.setItem(SESSION_KEY, "active");
  window.localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  return data.user;
}

export function logoutAdmin() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(USER_KEY);
}

// ---------------------------------------------------------------------------
// Proactive session expiry detection
// ---------------------------------------------------------------------------
/** Decode JWT payload without verifying signature (client-side check only). */
function decodeTokenPayload(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/** Returns true if the stored token is missing or past its `exp` claim. */
export function isTokenExpired() {
  const token = getStoredToken();
  if (!token) return true;
  const payload = decodeTokenPayload(token);
  if (!payload || !payload.exp) return true;
  // exp is in seconds; add a 30-second buffer so we log out just before it truly expires
  return Date.now() >= (payload.exp - 30) * 1000;
}

let _sessionWatcherInterval = null;

/**
 * Start a periodic check (every 30 s) that auto-logs out when the JWT expires.
 * Safe to call multiple times — only one interval runs at a time.
 */
export function initSessionWatcher() {
  if (_sessionWatcherInterval) return;

  _sessionWatcherInterval = setInterval(() => {
    // Only act when the user is on an admin page and has a session flag
    const hasSession =
      window.localStorage.getItem(SESSION_KEY) === "active";
    const onAdmin = window.location.pathname.startsWith("/admin");

    if (hasSession && onAdmin && isTokenExpired()) {
      clearInterval(_sessionWatcherInterval);
      _sessionWatcherInterval = null;
      logoutAdmin();
      window.location.href = "/admin/login?expired=1";
    }
  }, 30_000); // check every 30 seconds
}

/** Stop the session watcher (e.g. on manual logout). */
export function stopSessionWatcher() {
  if (_sessionWatcherInterval) {
    clearInterval(_sessionWatcherInterval);
    _sessionWatcherInterval = null;
  }
}

// ---------------------------------------------------------------------------
// Base request helpers
// ---------------------------------------------------------------------------
async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });

  if (!response.ok) {
    // Token expired or invalid — clear session and redirect to login
    if (response.status === 401 && window.location.pathname.startsWith("/admin")) {
      logoutAdmin();
      window.location.href = "/admin/login?expired=1";
      return;
    }

    const text = await response.text();
    const errorMsg = `API error ${response.status}: ${text || response.statusText}`;
    console.error("API Request Failed:", errorMsg);
    throw new Error(errorMsg);
  }

  return response.json();
}

/** Authenticated request — attaches Bearer token from localStorage. */
async function authRequest(path, options = {}) {
  const token = getStoredToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };
  return request(path, { ...options, headers });
}

// ---------------------------------------------------------------------------
// Content API
// ---------------------------------------------------------------------------
export async function getContent(onUpdate) {
  const fetcher = async () => {
    const result = await request("/api/content");
    return result.data;
  };
  return swrFetch("content", fetcher, onUpdate);
}

export async function saveContent(content) {
  try {
    const result = await authRequest("/api/content", {
      method: "PUT",
      body: JSON.stringify(content),
    });
    invalidateCache("content");
    return result.data;
  } catch (error) {
    console.error("Failed to save content:", error.message);
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Settings API
// ---------------------------------------------------------------------------
export async function getSetting(settingKey, onUpdate) {
  const fetcher = async () => {
    const result = await request(`/api/settings/${settingKey}`);
    return result.data;
  };
  try {
    return await swrFetch(`setting_${settingKey}`, fetcher, onUpdate);
  } catch (error) {
    console.warn(`Could not load setting ${settingKey}:`, error.message);
    return null;
  }
}

export async function saveSetting(settingKey, settingValue) {
  try {
    const result = await authRequest(`/api/settings/${settingKey}`, {
      method: "PUT",
      body: JSON.stringify({ value: settingValue }),
    });
    invalidateCache(`setting_${settingKey}`);
    return result.data;
  } catch (error) {
    console.error(`Failed to save setting ${settingKey}:`, error.message);
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Testimonials API
// ---------------------------------------------------------------------------
export async function getTestimonials(onUpdate) {
  const fetcher = async () => {
    const result = await request("/api/testimonials");
    return result.data;
  };
  return swrFetch("testimonials", fetcher, onUpdate);
}

export async function saveTestimonial(testimonial) {
  const method = testimonial.id ? "PUT" : "POST";
  const path = testimonial.id
    ? `/api/testimonials/${testimonial.id}`
    : "/api/testimonials";
  const result = await authRequest(path, {
    method,
    body: JSON.stringify(testimonial),
  });
  invalidateCache("testimonials");
  return result.data;
}

export async function deleteTestimonial(id) {
  const result = await authRequest(`/api/testimonials/${id}`, { method: "DELETE" });
  invalidateCache("testimonials");
  return result;
}

// ---------------------------------------------------------------------------
// FAQs API
// ---------------------------------------------------------------------------
export async function getFAQs(onUpdate) {
  const fetcher = async () => {
    const result = await request("/api/faqs");
    return result.data;
  };
  return swrFetch("faqs", fetcher, onUpdate);
}

export async function saveFAQ(faq) {
  const method = faq.id ? "PUT" : "POST";
  const path = faq.id ? `/api/faqs/${faq.id}` : "/api/faqs";
  const result = await authRequest(path, {
    method,
    body: JSON.stringify(faq),
  });
  invalidateCache("faqs");
  return result.data;
}

export async function deleteFAQ(id) {
  const result = await authRequest(`/api/faqs/${id}`, { method: "DELETE" });
  invalidateCache("faqs");
  return result;
}

// ---------------------------------------------------------------------------
// Gallery API
// ---------------------------------------------------------------------------
export async function getGallery(onUpdate) {
  const fetcher = async () => {
    const result = await request("/api/gallery");
    return result.data;
  };
  return swrFetch("gallery", fetcher, onUpdate);
}

export async function saveGalleryItem(item) {
  const method = item.id ? "PUT" : "POST";
  const path = item.id ? `/api/gallery/${item.id}` : "/api/gallery";
  const result = await authRequest(path, {
    method,
    body: JSON.stringify(item),
  });
  invalidateCache("gallery");
  return result.data;
}

export async function deleteGalleryItem(id) {
  const result = await authRequest(`/api/gallery/${id}`, { method: "DELETE" });
  invalidateCache("gallery");
  return result;
}

export async function deleteGalleryItems(ids) {
  try {
    const result = await authRequest(`/api/gallery`, {
      method: "DELETE",
      body: JSON.stringify(ids),
    });
    invalidateCache("gallery");
    return result;
  } catch (error) {
    console.error("Failed to bulk delete gallery items:", error);
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Media API
// ---------------------------------------------------------------------------
export async function uploadMedia(file) {
  const token = getStoredToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/media/upload`, {
    method: "POST",
    body: formData,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    if (response.status === 401 && window.location.pathname.startsWith("/admin")) {
      logoutAdmin();
      window.location.href = "/admin/login?expired=1";
      return;
    }
    throw new Error("Upload failed");
  }

  const result = await response.json();
  return result.url;
}

// ---------------------------------------------------------------------------
// Services API
// ---------------------------------------------------------------------------
export async function getServices(onUpdate) {
  const fetcher = async () => {
    const result = await request("/api/services");
    return result.data;
  };
  return swrFetch("services", fetcher, onUpdate);
}

export async function saveService(service) {
  const method = service.id ? "PUT" : "POST";
  const path = service.id ? `/api/services/${service.id}` : "/api/services";
  const result = await authRequest(path, {
    method,
    body: JSON.stringify(service),
  });
  invalidateCache("services");
  return result.data;
}

export async function deleteService(id) {
  const result = await authRequest(`/api/services/${id}`, { method: "DELETE" });
  invalidateCache("services");
  return result;
}

// ---------------------------------------------------------------------------
export async function createPublicBooking(bookingData) {
  const response = await fetch(`${API_URL}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Public booking submission failed:", text);
    throw new Error(`Booking submission failed: ${text || response.statusText}`);
  }

  const result = await response.json();
  return result.data;
}

export async function getBookings() {
  const result = await request("/api/bookings");
  return result.data;
}

export async function saveBooking(booking) {
  const method = booking.id ? "PUT" : "POST";
  const path = booking.id ? `/api/bookings/${booking.id}` : "/api/bookings";
  const result = await authRequest(path, {
    method,
    body: JSON.stringify(booking),
  });
  return result.data;
}

export async function updateBookingStatus(id, status) {
  const result = await authRequest(`/api/bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
  return result.data;
}

export async function deleteBooking(id) {
  return await authRequest(`/api/bookings/${id}`, { method: "DELETE" });
}
