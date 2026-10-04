import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ABOUT, SITE } from "../data/portfolioData";
import { openInNewTab } from "../lib/links";
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../lib/motion";
import LivingBackground from "./LivingBackground";

const shots = [
  {
    src: "/projects/about/chess.png",
    alt: "Alen playing chess",
    label: "my losing hobby",
    pos: "object-[center_40%]",
  },
  {
    src: "/projects/about/photography.jpg",
    alt: "Alen with a camera",
    label: "my expensive hobby",
    pos: "object-[30%_center]",
  },
];

export default function About() {
  const [imgOk, setImgOk] = useState(true);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section
      id="about"
      className="snap-section relative isolate flex flex-col justify-center border-b border-white/10"
    >
      <LivingBackground variant="slate" />

      <div className="section-frame z-[2]" aria-hidden="true">
        <span className="section-frame__corner tl" />
        <span className="section-frame__corner tr" />
        <span className="section-frame__corner bl" />
        <span className="section-frame__corner br" />
      </div>
      <motion.span
        className="giant-index right-0 top-16 z-[1] opacity-30"
        aria-hidden="true"
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 0.3, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        01
      </motion.span>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <motion.div
          className="mb-8 text-center sm:mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.p
            variants={staggerItem}
            className="section-kicker justify-center"
          >
            <span className="signal-dot" />
            {ABOUT.kicker}
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tightest"
          >
            <span className="display-stack">
              <span className="display-stack__outline" aria-hidden="true">
                {ABOUT.title}
              </span>
              <span className="display-stack__solid">{ABOUT.title}</span>
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div
            variants={staggerItem}
            className="relative mx-auto w-full max-w-[240px] sm:max-w-sm lg:col-span-5 lg:mx-0"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-white/15 bg-black/50">
              {imgOk ? (
                <img
                  src={ABOUT.image}
                  alt="Portrait of Alen"
                  className="h-full w-full object-cover object-top"
                  onError={() => setImgOk(false)}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(160deg,#141416_0%,#0a0a0c_100%)] p-6 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-white/20 font-mono text-[11px] uppercase tracking-label text-mute">
                    Photo
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-label text-mute">
                    {ABOUT.imageLabel}
                  </p>
                  <p className="max-w-[14rem] font-mono text-[10px] leading-relaxed text-mute/70">
                    Add public/projects/about/portrait.jpg
                  </p>
                </div>
              )}
            </div>
            <div
              className="pointer-events-none absolute -bottom-3 -right-3 h-full w-full border border-signal/20"
              aria-hidden="true"
            />
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="text-center lg:col-span-7 lg:text-left"
          >
            <div className="mx-auto max-w-xl space-y-4 lg:mx-0">
              {ABOUT.body.map((para) => (
                <p
                  key={para.slice(0, 28)}
                  className="text-pretty text-[15px] leading-relaxed text-fog sm:text-base"
                >
                  {para}
                </p>
              ))}
            </div>

            <a
              href={SITE.spotify.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="spotify"
              onClick={(e) => {
                e.preventDefault();
                openInNewTab(SITE.spotify.href);
              }}
              className="mt-6 flex items-center gap-3 border border-white/15 bg-black/40 p-2 text-left transition-colors hover:border-signal/40"
            >
                <img
                  src="/projects/about/spotify.png"
                  alt=""
                  className="h-16 w-16 shrink-0 bg-black object-contain p-1"
                />
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-label text-signal">
                    Off the clock
                  </span>
                  <span className="mt-0.5 block font-display text-lg font-semibold text-chalk">
                    Spotify
                  </span>
                  <span className="block font-mono text-[11px] text-mute">
                    or check out what I vibe with :)
                  </span>
                </span>
            </a>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {shots.map((shot, i) => (
                <button
                  key={shot.label}
                  type="button"
                  onClick={() => setOpen(i)}
                  className="relative overflow-hidden border border-white/15 bg-black/50 text-left transition-colors hover:border-signal/40"
                >
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className={`aspect-[4/3] w-full object-cover ${shot.pos}`}
                  />
                  <span className="absolute bottom-1.5 left-1.5 max-w-[90%] border border-white/15 bg-black/70 px-1.5 py-0.5 font-mono text-[10px] normal-case tracking-normal text-chalk">
                    {shot.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-2 text-left sm:grid-cols-3">
              {ABOUT.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="border border-white/10 bg-black/35 px-3 py-3 text-left backdrop-blur-md"
                >
                  <p className="font-mono text-[10px] uppercase tracking-label text-mute">
                    {fact.label}
                  </p>
                  <p className="mt-1 font-mono text-[12px] text-chalk">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {open != null
        ? createPortal(
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8">
              <button
                type="button"
                className="absolute inset-0 bg-black/80"
                aria-label="Close photo"
                onClick={() => setOpen(null)}
              />
              <figure className="relative z-10 w-full max-w-4xl overflow-hidden border border-white/15 bg-black">
                <img
                  src={shots[open].src}
                  alt={shots[open].alt}
                  className="max-h-[78vh] w-full object-contain"
                />
                <figcaption className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
                  <p className="font-mono text-[12px] normal-case tracking-normal text-mute">
                    {shots[open].label}
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    className="rounded-full border border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-label text-mute hover:border-signal/40 hover:text-signal"
                  >
                    Close
                  </button>
                </figcaption>
              </figure>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
