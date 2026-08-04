import { useEffect, useRef, useState } from "react";

/**
 * Lightweight IntersectionObserver fade-in for non-GSAP sections.
 */
export function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, visible };
}
