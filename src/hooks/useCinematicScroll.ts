import { useEffect } from "react";
import { useLenis } from "@/components/LenisContext";

const STORAGE_KEY = "tl_wedding_visited";
const START_DELAY_MS = 1800; // delay before auto-scroll begins

/**
 * Cinematic auto-scroll hook using Lenis native scrollTo.
 * - Fires ONLY on first visit (localStorage guard).
 * - Uses Lenis's built-in easing for smooth, coordinated scrolling.
 * - User interaction (wheel/touch/click/key) cancels it instantly.
 */
export function useCinematicScroll() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    localStorage.setItem(STORAGE_KEY, "1");

    let cancelled = false;
    let timerId: ReturnType<typeof setTimeout>;

    const cancel = () => {
      if (cancelled) return;
      cancelled = true;
      lenis.stop();
      // re-enable user scrolling immediately
      lenis.start();
      removeListeners();
    };

    const addListeners = () => {
      window.addEventListener("wheel", cancel, { passive: true });
      window.addEventListener("touchstart", cancel, { passive: true });
      window.addEventListener("keydown", cancel);
      window.addEventListener("mousedown", cancel);
    };

    const removeListeners = () => {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
      window.removeEventListener("mousedown", cancel);
    };

    const triggerScroll = () => {
      if (cancelled) return;

      const target = document.documentElement.scrollHeight - window.innerHeight;
      if (target <= 0) return;

      addListeners();

      // Use Lenis native scrollTo — perfectly synced with its rAF loop
      // Dynamically calculate duration based on height so speed is always perfect
      const duration = Math.max(15, target / 200); 

      lenis.scrollTo(target, {
        duration,             // adjust duration based on full height
        easing: (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        onComplete: () => removeListeners(),
      });
    };

    timerId = setTimeout(() => {
      if (cancelled) return;
      if (document.readyState === "complete") {
        triggerScroll();
      } else {
        window.addEventListener("load", triggerScroll);
      }
    }, START_DELAY_MS);

    return () => {
      clearTimeout(timerId);
      cancel();
    };
  }, [lenis]);
}

