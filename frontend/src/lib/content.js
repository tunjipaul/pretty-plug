const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// ---------------------------------------------------------------------------
// Cache
// ---------------------------------------------------------------------------
let _cachedContent = null;
let _cachedContentExpiresAt = 0;
const _CONTENT_TTL_MS = 30_000;

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
// Base request helpers
// ---------------------------------------------------------------------------
async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });

  if (!response.ok) {
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
export async function getContent() {
  const now = Date.now();
  if (_cachedContent && now < _cachedContentExpiresAt) {
    return _cachedContent;
  }

  try {
    const result = await request(`/api/content`);
    _cachedContent = result.data;
    _cachedContentExpiresAt = now + _CONTENT_TTL_MS;
    return result.data;
  } catch (error) {
    console.error("Failed to load content:", error.message);
    throw error;
  }
}

export async function saveContent(content) {
  try {
    const result = await authRequest("/api/content", {
      method: "PUT",
      body: JSON.stringify(content),
    });
    _cachedContent = result.data;
    _cachedContentExpiresAt = Date.now() + _CONTENT_TTL_MS;
    return result.data;
  } catch (error) {
    console.error("Failed to save content:", error.message);
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Settings API
// ---------------------------------------------------------------------------
export async function getSetting(settingKey) {
  try {
    const result = await request(`/api/settings/${settingKey}`);
    return result.data;
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
    return result.data;
  } catch (error) {
    console.error(`Failed to save setting ${settingKey}:`, error.message);
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Testimonials API
// ---------------------------------------------------------------------------
export async function getTestimonials() {
  const result = await request("/api/testimonials");
  return result.data;
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
  return result.data;
}

export async function deleteTestimonial(id) {
  return await authRequest(`/api/testimonials/${id}`, { method: "DELETE" });
}

// ---------------------------------------------------------------------------
// FAQs API
// ---------------------------------------------------------------------------
export async function getFAQs() {
  const result = await request("/api/faqs");
  return result.data;
}

export async function saveFAQ(faq) {
  const method = faq.id ? "PUT" : "POST";
  const path = faq.id ? `/api/faqs/${faq.id}` : "/api/faqs";
  const result = await authRequest(path, {
    method,
    body: JSON.stringify(faq),
  });
  return result.data;
}

export async function deleteFAQ(id) {
  return await authRequest(`/api/faqs/${id}`, { method: "DELETE" });
}

// ---------------------------------------------------------------------------
// Gallery API
// ---------------------------------------------------------------------------
export async function getGallery() {
  const result = await request("/api/gallery");
  return result.data;
}

export async function saveGalleryItem(item) {
  const method = item.id ? "PUT" : "POST";
  const path = item.id ? `/api/gallery/${item.id}` : "/api/gallery";
  const result = await authRequest(path, {
    method,
    body: JSON.stringify(item),
  });
  return result.data;
}

export async function deleteGalleryItem(id) {
  return await authRequest(`/api/gallery/${id}`, { method: "DELETE" });
}

export async function deleteGalleryItems(ids) {
  try {
    const result = await authRequest(`/api/gallery`, {
      method: "DELETE",
      body: JSON.stringify(ids),
    });
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
    throw new Error("Upload failed");
  }

  const result = await response.json();
  return result.url;
}

// ---------------------------------------------------------------------------
// Services API
// ---------------------------------------------------------------------------
export async function getServices() {
  const result = await request("/api/services");
  return result.data;
}

export async function saveService(service) {
  const method = service.id ? "PUT" : "POST";
  const path = service.id ? `/api/services/${service.id}` : "/api/services";
  const result = await authRequest(path, {
    method,
    body: JSON.stringify(service),
  });
  return result.data;
}

export async function deleteService(id) {
  return await authRequest(`/api/services/${id}`, { method: "DELETE" });
}

// ---------------------------------------------------------------------------
// Bookings API
// ---------------------------------------------------------------------------
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
