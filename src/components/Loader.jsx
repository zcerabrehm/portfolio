import { useEffect } from "react";
import gsap from "gsap";
import PropTypes from "prop-types";

/**
 * Full-screen intro: counter + progress, then curtain lift.
 */
export default function Loader({ onComplete }) {
  useEffect(() => {
    const counter = { val: 0 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tl = gsap.timeline({
      onComplete,
      defaults: { ease: "power4.inOut" },
    });

    if (reduce) {
      const el = document.querySelector("[data-loader-count]");
      if (el) el.textContent = "100";
      tl.to("[data-loader]", { autoAlpha: 0, duration: 0.25 }).set(
        "[data-loader]",
        { display: "none" },
      );
      return () => tl.kill();
    }

    tl.to(counter, {
      val: 100,
      duration: 1.55,
      ease: "power3.inOut",
      onUpdate: () => {
        const el = document.querySelector("[data-loader-count]");
        if (el) el.textContent = String(Math.round(counter.val)).padStart(3, "0");
      },
    })
      .to(
        "[data-loader-bar]",
        { scaleX: 1, duration: 1.55, ease: "power3.inOut" },
        0,
      )
      .to(
        "[data-loader-text]",
        { autoAlpha: 0, duration: 0.28, ease: "none" },
        "+=0.12",
      )
      .to(
        "[data-loader-lid]",
        { yPercent: -105, duration: 0.95, stagger: 0.07, ease: "power4.inOut" },
        "-=0.05",
      )
      .set("[data-loader]", { display: "none" });

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      data-loader
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink"
      aria-hidden="true"
    >
      <div className="relative z-10 flex items-center gap-4">
        <span
          data-loader-count
          className="font-mono text-sm tracking-widest text-ember"
        >
          000
        </span>
        <div className="h-px w-36 overflow-hidden bg-white/10 md:w-64">
          <div
            data-loader-bar
            className="h-full w-full origin-left scale-x-0 bg-ember"
          />
        </div>
        <span
          data-loader-text
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/40"
        >
          loading
        </span>
      </div>

      <div
        data-loader-lid
        className="absolute inset-0 z-[2] bg-[#0c0c0e]"
      />
      <div data-loader-lid className="absolute inset-0 z-[1] bg-ink" />
    </div>
  );
}

Loader.propTypes = {
  onComplete: PropTypes.func.isRequired,
};
