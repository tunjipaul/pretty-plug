import { useState, useRef, useEffect } from "react";

/**
 * SmoothImage — a drop-in <img> replacement that crossfades beautifully
 * when the image src changes (e.g. fallback → backend image via SWR).
 *
 * Features:
 * - Shimmer skeleton while loading
 * - Fade-up + scale reveal on first load
 * - Smooth crossfade when src changes (old image slides out, new slides in)
 */
export default function SmoothImage({ src, alt, className = "", ...rest }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [prevSrc, setPrevSrc] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const imgRef = useRef(null);

  // Detect src change → trigger crossfade
  useEffect(() => {
    if (src && src !== currentSrc) {
      // Start crossfade: keep old image visible, preload new one
      setPrevSrc(currentSrc);
      setTransitioning(true);
      setLoaded(false);

      const preload = new Image();
      preload.onload = () => {
        setCurrentSrc(src);
        setLoaded(true);
        // Remove old image after transition completes
        setTimeout(() => {
          setPrevSrc(null);
          setTransitioning(false);
        }, 600);
      };
      preload.onerror = () => {
        // If new image fails, keep the old one
        setPrevSrc(null);
        setTransitioning(false);
        setLoaded(true);
      };
      preload.src = src;
    }
  }, [src]);

  // Handle initial load
  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="smooth-image-wrapper" style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Shimmer skeleton — shown while first image loads */}
      {!loaded && !prevSrc && (
        <div className="smooth-image-skeleton" />
      )}

      {/* Previous image (crossfade out) */}
      {prevSrc && (
        <img
          src={prevSrc}
          alt=""
          aria-hidden="true"
          className={className}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            opacity: transitioning && loaded ? 0 : 1,
            transform: transitioning && loaded ? "scale(1.02)" : "scale(1)",
            zIndex: 1,
          }}
        />
      )}

      {/* Current image (crossfade in) */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`${className} ${loaded ? "smooth-image-loaded" : "smooth-image-loading"}`}
        onLoad={handleLoad}
        style={{
          position: prevSrc ? "absolute" : "relative",
          inset: prevSrc ? 0 : undefined,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 2,
        }}
        {...rest}
      />
    </div>
  );
}
