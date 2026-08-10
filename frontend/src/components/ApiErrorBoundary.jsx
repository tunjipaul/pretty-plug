import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

/**
 * Hook for catching and handling API errors in components.
 * Usage: const { error, clearError, setError } = useApiError();
 */
export function useApiError() {
  const [error, setError] = useState(null);

  return {
    error,
    setError,
    clearError: () => setError(null),
  };
}

/**
 * Error display component that shows backend API errors to users.
 * Wraps error messages with retry capabilities.
 */
export function ApiErrorDisplay({ error, onDismiss, onRetry }) {
  if (!error) return null;

  const message =
    typeof error === "string"
      ? error
      : error?.message || "An unexpected error occurred";

  return (
    <div className="fixed top-4 right-4 max-w-md rounded border border-red-500 bg-red-50 p-4 shadow-lg z-50">
      <div className="flex items-start gap-3">
        <AlertTriangle size={20} className="mt-0.5 shrink-0 text-red-600" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-900">Error</h3>
          <p className="mt-1 text-sm text-red-800">{message}</p>
          <div className="mt-3 flex gap-2">
            {onRetry && (
              <button
                onClick={onRetry}
                className="text-xs font-semibold text-red-700 underline hover:text-red-900"
              >
                Retry
              </button>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-xs font-semibold text-red-700 underline hover:text-red-900"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-500 hover:text-red-700"
            aria-label="Close error"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Higher-order component to wrap admin pages with error handling.
 * Usage: export default withApiErrorBoundary(MyAdminPage);
 */
export function withApiErrorBoundary(Component) {
  return function WrappedComponent(props) {
    const [error, setError] = useState(null);
    const [retryKey, setRetryKey] = useState(0);

    // Capture unhandled rejections from async API calls
    useEffect(() => {
      const handleError = (event) => {
        if (event.reason) {
          setError(event.reason);
        }
      };

      window.addEventListener("unhandledrejection", handleError);
      return () => window.removeEventListener("unhandledrejection", handleError);
    }, []);

    return (
      <>
        <Component
          {...props}
          apiError={error}
          setApiError={setError}
          retryKey={retryKey}
        />
        <ApiErrorDisplay
          error={error}
          onDismiss={() => setError(null)}
          onRetry={() => {
            setError(null);
            setRetryKey((k) => k + 1);
          }}
        />
      </>
    );
  };
}
