import { motion } from "framer-motion";
import { EXPERIENCE, SPEC_ROWS, STACK_ITEMS } from "../data/portfolioData";
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../lib/motion";
import LivingBackground from "./LivingBackground";

const maturityStyle: Record<string, string> = {
  PROD: "border-signal/40 bg-signal/10 text-signal",
  BETA: "border-white/20 bg-white/5 text-fog",
  "R&D": "border-white/10 bg-transparent text-mute",
};

const featured = SPEC_ROWS.slice(0, 6);

export default function CapabilitiesTable() {
  return (
    <section
      id="specs"
      className="snap-section relative isolate flex h-[100svh] flex-col justify-center overflow-hidden border-b border-white/10"
    >
      <LivingBackground variant="carbon" />

      <div className="section-frame z-[2]" aria-hidden="true">
        <span className="section-frame__corner tl" />
        <span className="section-frame__corner tr" />
        <span className="section-frame__corner bl" />
        <span className="section-frame__corner br" />
      </div>
      <motion.span
        className="giant-index left-0 top-1/2 z-[1] -translate-y-1/2 opacity-25"
        aria-hidden="true"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 0.25, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        03
      </motion.span>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24">
        <motion.div
          className="mb-6 flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div variants={staggerItem}>
            <p className="section-kicker justify-center md:justify-start">
              <span className="signal-dot" />
              03 · Skills
            </p>
            <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-bold tracking-tightest">
              <span className="display-stack">
                <span className="display-stack__outline" aria-hidden="true">
                  What I do
                </span>
                <span className="display-stack__solid">What I do</span>
              </span>
            </h2>
          </motion.div>
          <motion.p
            variants={staggerItem}
            className="max-w-sm text-pretty font-mono text-[11px] leading-relaxed text-mute"
          >
            Full code, low code, hardware, and UI. From React and Laravel to
            GoHighLevel, WordPress, and ESP32.
          </motion.p>
        </motion.div>

        <motion.div
          className="mb-4 grid gap-2 sm:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {EXPERIENCE.map((job) => (
            <motion.article
              key={job.id}
              variants={staggerItem}
              className="border border-white/10 bg-black/35 p-4 text-left backdrop-blur-md"
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-[10px] uppercase tracking-label text-signal">
                  {job.period}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-label text-mute">
                  {job.role}
                </p>
              </div>
              <h3 className="font-display text-base font-semibold text-chalk">
                {job.org}
              </h3>
              <p className="mt-2 text-pretty text-left text-xs leading-relaxed text-mute">
                {job.detail}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {featured.map((row, i) => (
            <motion.article
              key={row.id}
              variants={staggerItem}
              custom={i}
              whileHover={{ y: -4, borderColor: "rgba(204,255,0,0.35)" }}
              className="group relative overflow-hidden border border-white/10 bg-black/40 p-4 text-left backdrop-blur-md transition-colors sm:p-5"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <span className="font-mono text-[10px] text-signal">
                  {row.index}
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-label ${maturityStyle[row.maturity]}`}
                >
                  {row.maturity}
                </span>
              </div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-label text-mute">
                {row.domain}
              </p>
              <h3 className="font-display text-lg font-semibold tracking-tight text-chalk sm:text-xl">
                {row.capability}
              </h3>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-mute">
                {row.notes}
              </p>
              <div className="mt-4 flex items-end justify-between gap-2 border-t border-white/10 pt-3">
                <p className="font-mono text-[10px] text-fog/80">{row.stack}</p>
                <p className="shrink-0 font-mono text-[10px] text-signal">
                  {row.throughput}
                </p>
              </div>
              <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full border border-white/5 transition-colors group-hover:border-signal/20" />
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-4 flex flex-wrap gap-1.5 sm:mt-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {STACK_ITEMS.map((item) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-2 border border-white/10 bg-black/30 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-label text-fog backdrop-blur-sm"
            >
              {item.name}
              <span className="text-signal">{item.level}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
