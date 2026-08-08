import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryCard } from "../data/portfolioData";
import { GALLERY_ROW_A, GALLERY_ROW_B } from "../data/portfolioData";
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../lib/motion";
import LivingBackground from "./LivingBackground";

const FRAMES: GalleryCard[] = [
  ...(GALLERY_ROW_A ?? []).slice(0, 4),
  ...(GALLERY_ROW_B ?? []).slice(0, 2),
].filter(Boolean);

const layoutClass = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-4 md:row-span-1",
] as const;

function FrameTile({
  card,
  index,
  featured = false,
  onSelect,
}: {
  card: GalleryCard;
  index: number;
  featured?: boolean;
  onSelect: (card: GalleryCard) => void;
}) {
  return (
    <motion.button
      type="button"
      data-cursor="view"
      onClick={() => onSelect(card)}
      variants={staggerItem}
      custom={index}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className={`gallery-card group relative min-h-[120px] w-full overflow-hidden text-left ${
        featured ? "min-h-[220px] sm:min-h-[280px]" : "min-h-[120px] sm:min-h-[140px]"
      } ${layoutClass[index] ?? ""}`}
    >
      <img
        src={card.image}
        alt={card.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-70 saturate-[0.85] transition-[transform,opacity,filter] duration-700 ease-out-expo group-hover:scale-105 group-hover:opacity-95 group-hover:saturate-100"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-signal/[0.08]" />
        <div className="absolute inset-0 ring-1 ring-inset ring-signal/40" />
      </div>

      <div className="absolute left-3 top-3 flex items-center gap-2">
        <span className="rounded-full border border-white/15 bg-black/55 px-2 py-0.5 font-mono text-[9px] uppercase tracking-label text-signal backdrop-blur-sm">
          {card.tag}
        </span>
        <span className="font-mono text-[9px] text-mute/80">{card.year}</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <p className="mb-0.5 font-mono text-[9px] uppercase tracking-label text-white/35">
          {String(index + 1).padStart(2, "0")} // {card.id.toUpperCase()}
        </p>
        <h3
          className={`font-display font-semibold tracking-tight text-chalk ${
            featured ? "text-xl sm:text-2xl md:text-3xl" : "text-sm sm:text-base"
          }`}
        >
          {card.title}
        </h3>
      </div>
    </motion.button>
  );
}

function Lightbox({
  card,
  onClose,
}: {
  card: GalleryCard | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!card) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [card, onClose]);

  return (
    <AnimatePresence>
      {card ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            aria-label="Close preview"
            onClick={onClose}
          />
          <motion.figure
            className="relative z-10 w-full max-w-4xl overflow-hidden border border-white/15 bg-void shadow-panel"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={card.image}
              alt={card.title}
              className="max-h-[70vh] w-full object-cover"
            />
            <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-label text-signal">
                  {card.tag}
                  <span className="text-white/25"> · </span>
                  {card.year}
                </p>
                <p className="font-display text-lg font-semibold text-chalk">
                  {card.title}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-label text-mute transition-colors hover:border-signal/40 hover:text-signal"
              >
                Close
              </button>
            </figcaption>
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function GalleryRows() {
  const [active, setActive] = useState<GalleryCard | null>(null);

  return (
    <section
      id="gallery"
      className="snap-section relative isolate flex h-[100svh] flex-col justify-center overflow-hidden border-b border-white/10"
    >
      <LivingBackground variant="slate" />

      <div className="section-frame z-[2]" aria-hidden="true">
        <span className="section-frame__corner tl" />
        <span className="section-frame__corner tr" />
        <span className="section-frame__corner bl" />
        <span className="section-frame__corner br" />
      </div>

      <motion.span
        className="giant-index -left-4 top-14 z-[1] opacity-40 md:top-16"
        aria-hidden="true"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 0.4, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        02
      </motion.span>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24">
        <motion.div
          className="mb-5 text-center sm:mb-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div variants={staggerItem}>
            <p className="section-kicker justify-center">
              <span className="signal-dot" />
              02 · Gallery
            </p>
            <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-bold tracking-tightest">
              <span className="display-stack">
                <span className="display-stack__outline" aria-hidden="true">
                  Off the clock
                </span>
                <span className="display-stack__solid">Off the clock</span>
              </span>
            </h2>
            <p className="mx-auto mt-2 max-w-md font-mono text-[12px] leading-relaxed text-mute">
              Things I geek out on when I am not shipping client work. Click a
              tile to zoom.
            </p>
          </motion.div>
          <motion.p
            variants={staggerItem}
            className="mt-2 font-mono text-[10px] uppercase tracking-label text-mute"
          >
            {String(FRAMES.length).padStart(2, "0")} tiles
          </motion.p>
        </motion.div>

        <motion.div
          className="grid max-h-[min(62vh,560px)] flex-1 grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:grid-rows-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {FRAMES.map((card, i) => (
            <FrameTile
              key={card.id}
              card={card}
              index={i}
              featured={i === 0}
              onSelect={setActive}
            />
          ))}
        </motion.div>
      </div>

      <Lightbox card={active} onClose={() => setActive(null)} />
    </section>
  );
}
