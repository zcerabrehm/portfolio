import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Subtle staggered entrance after the loader curtain lifts.
 */
export function useIntroAnimation(ready = false) {
  const scope = useRef(null);

  useEffect(() => {
    if (!ready) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-intro]", { clearProps: "all", autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set("[data-intro]", { y: 28, autoAlpha: 0 });

      gsap.to("[data-intro]", {
        y: 0,
        autoAlpha: 1,
        duration: 1.05,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.06,
      });
    }, scope);

    return () => ctx.revert();
  }, [ready]);

  return scope;
}
