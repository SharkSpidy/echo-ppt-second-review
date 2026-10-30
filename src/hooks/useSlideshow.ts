import { useCallback, useEffect, useRef, useState } from "react";

interface ExitingSlide {
  index: number;
  direction: "left" | "right";
}

/**
 * Drives the whole presentation: current slide index, the outgoing
 * slide's exit direction (for the left/right drift animation), and
 * keyboard + swipe navigation. Mirrors the behavior of the original
 * vanilla-JS slideshow, just reframed as state instead of direct DOM
 * class manipulation.
 */
export function useSlideshow(slideCount: number) {
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState<ExitingSlide | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= slideCount || index === current) return;
      const direction: "left" | "right" = index > current ? "left" : "right";
      setExiting({ index: current, direction });
      setCurrent(index);
    },
    [current, slideCount]
  );

  const goNext = useCallback(() => goToSlide(current + 1), [current, goToSlide]);
  const goPrev = useCallback(() => goToSlide(current - 1), [current, goToSlide]);

  // Called once the outgoing slide's CSS transition finishes, so it's
  // reset and ready to animate in cleanly the next time it's shown.
  const clearExiting = useCallback((index: number) => {
    setExiting((prev) => (prev && prev.index === index ? null : prev));
  }, []);

  // ---- Keyboard navigation ----
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          goToSlide(current + 1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          goToSlide(current - 1);
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(slideCount - 1);
          break;
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [current, slideCount, goToSlide]);

  // ---- Basic touch/swipe support ----
  useEffect(() => {
    function handleTouchStart(e: TouchEvent) {
      touchStartX.current = e.touches[0].clientX;
    }
    function handleTouchEnd(e: TouchEvent) {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) goToSlide(current + 1); // swipe left -> next
        else goToSlide(current - 1); // swipe right -> previous
      }
      touchStartX.current = null;
    }
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [current, goToSlide]);

  return { current, exiting, goToSlide, goNext, goPrev, clearExiting };
}
