import { useState } from "react";
import { AlertCircle, ArrowLeft, Clock, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { loginAdmin } from "../lib/content";
import SeoHead from "../components/SeoHead";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const sessionExpired = searchParams.get("expired") === "1";

  const redirectTo = location.state?.from?.pathname ?? "/admin";

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginAdmin(form.email, form.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SeoHead title="Admin Portal Login | ThePrettyPlug" noindex={true} />
      <main className="grid h-screen overflow-hidden grid-cols-1 bg-surface text-on-surface lg:grid-cols-2">
      {/* Left panel — decorative */}
      <section className="relative hidden h-screen overflow-hidden bg-surface-container-low lg:block">
        <img
          src="/images/Timeless Nude Nails Neutral Manicure with Soft Luxury Style.jfif"
          alt="Editorial manicure detail"
          className="h-full w-full object-cover transition-transform duration-[3000ms] hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-primary-container/20" />
        <div className="absolute inset-0 flex flex-col justify-between p-16 text-white">
          <Link to="/" className="font-headline text-3xl font-bold tracking-tight">
            ThePrettyPlug
          </Link>
          <div className="max-w-md">
            <h1 className="mb-4 font-headline text-5xl font-medium leading-tight">
              Manage beauty content with confidence.
            </h1>
            <p className="font-body text-lg leading-7 text-white/90">
              Update the public website, service catalog, gallery, testimonials,
              and booking content from one CMS console.
            </p>
          </div>
        </div>
      </section>

      {/* Right panel — login form */}
      <section className="flex h-screen items-center justify-center overflow-hidden px-5 py-6 sm:px-8 lg:px-16">
        <div className="w-full max-w-[420px]">
          <div className="mb-10 text-center lg:text-left">
            <Link
              to="/"
              className="mb-10 inline-block font-headline text-3xl font-bold tracking-tight text-primary-container lg:hidden"
            >
              ThePrettyPlug
            </Link>
            <p className="mb-3 font-label text-xs font-semibold uppercase tracking-[0.16em] text-primary-container">
              Admin Login
            </p>
            <h2 className="font-headline text-4xl font-medium text-on-surface">
              Welcome Back
            </h2>
            <p className="mt-3 font-body text-base leading-7 text-on-surface-variant">
              Sign in to manage the CMS and beauty suite operations.
            </p>
          </div>

          {/* Session expired banner */}
          {sessionExpired && !error && (
            <div
              role="status"
              className="mb-6 flex items-start gap-3 border border-secondary/30 bg-secondary/10 px-4 py-3"
            >
              <Clock
                size={18}
                className="mt-0.5 shrink-0 text-secondary"
              />
              <p className="font-body text-sm text-on-surface-variant">
                Your session has expired. Please sign in again to continue.
              </p>
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-3 border border-error/30 bg-error-container px-4 py-3"
            >
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0 text-on-error-container"
              />
              <p className="font-body text-sm text-on-error-container">{error}</p>
            </div>
          )}

          <form className="space-y-7" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                Email Address
              </span>
              <div className="flex items-center border-b border-outline-variant focus-within:border-primary-container">
                <Mail size={18} className="mr-3 text-outline" />
                <input
                  id="admin-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  required
                  disabled={loading}
                  placeholder="admin@theprettyplug.com"
                  className="h-12 w-full bg-transparent font-body text-base text-on-surface outline-none placeholder:text-outline-variant disabled:opacity-60"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                Password
              </span>
              <div className="flex items-center border-b border-outline-variant focus-within:border-primary-container">
                <Lock size={18} className="mr-3 text-outline" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  required
                  disabled={loading}
                  placeholder="••••••••"
                  className="h-12 w-full bg-transparent font-body text-base text-on-surface outline-none placeholder:text-outline-variant disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="ml-3 text-on-surface-variant transition-colors hover:text-primary-container"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(event) =>
                    updateField("remember", event.target.checked)
                  }
                  className="h-4 w-4 border-outline-variant text-primary-container"
                />
                <span className="font-body text-sm text-on-surface-variant">
                  Keep me signed in
                </span>
              </label>
            </div>

            <button
              id="admin-login-submit"
              type="submit"
              disabled={loading}
              className="relative h-14 w-full bg-primary-container font-label text-xs font-semibold uppercase tracking-[0.16em] text-on-primary transition-colors hover:bg-primary disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-primary/40 border-t-on-primary" />
                  Signing In…
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-12 border-t border-outline-variant/20 pt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:text-primary-container"
            >
              <ArrowLeft size={16} />
              Return to Website
            </Link>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
