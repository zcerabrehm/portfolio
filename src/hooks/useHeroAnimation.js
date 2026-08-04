import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Hero entrance: masked headline lines, faded meta, magnetic CTA scale-in.
 */
export function useHeroAnimation(ready = true) {
  const scope = useRef(null);

  useEffect(() => {
    if (!ready) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          ["[data-hero-mask]", "[data-hero-fade]", "[data-hero-cta]"],
          { clearProps: "all", autoAlpha: 1, y: 0, yPercent: 0, scale: 1 },
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.set("[data-hero-mask]", { yPercent: 115 })
        .set("[data-hero-fade]", { y: 32, autoAlpha: 0 })
        .set("[data-hero-cta]", { autoAlpha: 0 })
        .to("[data-hero-mask]", {
          yPercent: 0,
          duration: 1.35,
          stagger: 0.13,
          delay: 0.08,
        })
        .to(
          "[data-hero-fade]",
          { y: 0, autoAlpha: 1, duration: 0.95, stagger: 0.09 },
          "-=0.85",
        )
        .fromTo(
          "[data-hero-cta]",
          { scale: 0.88, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.85 },
          "-=0.55",
        );

      gsap.to("[data-hero-drift]", {
        y: 12,
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, scope);

    return () => ctx.revert();
  }, [ready]);

  return scope;
}
