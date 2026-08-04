import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Word-by-word masked reveal on scroll for About / ethos copy.
 */
export function useScrollReveal(selector = "[data-reveal-lines]") {
  const scope = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(selector);

      targets.forEach((target) => {
        if (reduce) return;

        const text = target.textContent.trim();
        target.textContent = "";
        const words = text.split(/\s+/);
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline";

        words.forEach((word, i) => {
          const mask = document.createElement("span");
          mask.style.display = "inline-block";
          mask.style.overflow = "hidden";
          mask.style.verticalAlign = "top";
          mask.style.marginRight = i === words.length - 1 ? "0" : "0.28em";

          const inner = document.createElement("span");
          inner.className = "reveal-inner";
          inner.style.display = "inline-block";
          inner.style.transform = "translateY(115%)";
          inner.style.willChange = "transform";
          inner.textContent = word;
          mask.appendChild(inner);
          wrapper.appendChild(mask);
        });

        target.appendChild(wrapper);

        gsap.to(target.querySelectorAll(".reveal-inner"), {
          y: "0%",
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.028,
          scrollTrigger: {
            trigger: target,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray("[data-reveal-card]").forEach((card, i) => {
        gsap.from(card, {
          y: 48,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: reduce ? 0 : i * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }, scope);

    return () => ctx.revert();
  }, [selector]);

  return scope;
}
