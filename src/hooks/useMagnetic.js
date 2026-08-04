import { useCallback, useEffect, useRef } from "react";

/**
 * Magnetic pull toward cursor. Attach returned callback ref to the element.
 */
export function useMagnetic(strength = 0.35) {
  const elRef = useRef(null);

  const handleMove = useCallback(
    (e) => {
      const el = elRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transition = "transform 0.22s cubic-bezier(0.16,1,0.3,1)";
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength],
  );

  const handleLeave = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    el.style.transition = "transform 0.65s cubic-bezier(0.16,1,0.3,1)";
    el.style.transform = "translate(0px, 0px)";
  }, []);

  const magneticRef = useCallback(
    (node) => {
      const previous = elRef.current;
      if (previous) {
        previous.removeEventListener("mousemove", handleMove);
        previous.removeEventListener("mouseleave", handleLeave);
      }
      elRef.current = node;
      if (node) {
        node.addEventListener("mousemove", handleMove);
        node.addEventListener("mouseleave", handleLeave);
      }
    },
    [handleMove, handleLeave],
  );

  useEffect(() => {
    return () => {
      if (elRef.current) {
        elRef.current.removeEventListener("mousemove", handleMove);
        elRef.current.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, [handleMove, handleLeave]);

  return magneticRef;
}
