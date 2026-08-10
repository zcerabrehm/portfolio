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

const stackByCategory = {
  runtime: STACK_ITEMS.filter((s) => s.category === "runtime"),
  lowcode: STACK_ITEMS.filter((s) => s.category === "lowcode"),
  hardware: STACK_ITEMS.filter((s) => s.category === "hardware"),
};

const categoryLabel: Record<keyof typeof stackByCategory, string> = {
  runtime: "Full code",
  lowcode: "Low code",
  hardware: "Hardware",
};

const bentoSpan = [
  "sm:col-span-2 lg:col-span-4 lg:row-span-2",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

export default function CapabilitiesTable() {
  const [lead, ...rest] = SPEC_ROWS;

  return (
    <section
      id="specs"
      className="snap-section snap-section--flow relative isolate flex flex-col justify-center border-b border-white/10"
    >
      <LivingBackground variant="carbon" />

      <div className="section-frame z-[2]" aria-hidden="true">
        <span className="section-frame__corner tl" />
        <span className="section-frame__corner tr" />
        <span className="section-frame__corner bl" />
        <span className="section-frame__corner br" />
      </div>
      <motion.span
        className="giant-index left-0 top-24 z-[1] opacity-20"
        aria-hidden="true"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 0.2, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        03
      </motion.span>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center px-4 py-14 sm:px-6 sm:py-16 md:py-18">
        <motion.div
          className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-3 sm:mb-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div variants={staggerItem} className="min-w-0">
            <p className="section-kicker">
              <span className="signal-dot" />
              03 · Skills
            </p>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tightest">
              <span className="display-stack">
                <span className="display-stack__outline" aria-hidden="true">
                  What I do
                </span>
                <span className="display-stack__solid">What I do</span>
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="flex flex-wrap gap-1.5"
          >
            {EXPERIENCE.map((job) => (
              <div
                key={job.id}
                className="inline-flex items-center gap-2 border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-label backdrop-blur-sm"
              >
                <span className="text-signal">{job.period}</span>
                <span className="text-mute">·</span>
                <span className="text-chalk">{job.org}</span>
                <span className="hidden text-mute sm:inline">· {job.detail}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-2 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {lead ? (
            <motion.article
              variants={staggerItem}
              whileHover={{ y: -2, borderColor: "rgba(204,255,0,0.35)" }}
              className={`group relative flex flex-col justify-between overflow-hidden border border-signal/30 bg-gradient-to-br from-signal/12 via-black/50 to-black/70 p-4 text-left backdrop-blur-md sm:p-5 ${bentoSpan[0]}`}
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-signal">
                    {lead.index}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-label ${maturityStyle[lead.maturity]}`}
                  >
                    {lead.maturity}
                  </span>
                </div>
                <p className="mb-1 font-mono text-[9px] uppercase tracking-label text-mute">
                  {lead.domain}
                </p>
                <h3 className="font-display text-2xl font-bold tracking-tight text-chalk sm:text-[1.75rem]">
                  {lead.capability}
                </h3>
                <p className="mt-2 font-mono text-[11px] text-fog">
                  {lead.notes}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
                {lead.stack.split(" · ").map((tech) => (
                  <span
                    key={tech}
                    className="border border-white/10 bg-black/30 px-2 py-1 font-mono text-[9px] uppercase tracking-label text-fog"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border border-signal/15" />
            </motion.article>
          ) : null}

          {rest.map((row, i) => (
            <motion.article
              key={row.id}
              variants={staggerItem}
              whileHover={{ y: -2, borderColor: "rgba(204,255,0,0.35)" }}
              className={`group relative flex min-h-[118px] flex-col justify-between overflow-hidden border border-white/10 bg-black/40 p-3.5 text-left backdrop-blur-md transition-colors sm:p-4 ${bentoSpan[i + 1] ?? "lg:col-span-4"}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="mb-1 font-mono text-[9px] uppercase tracking-label text-mute">
                    {row.domain}
                  </p>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-chalk">
                    {row.capability}
                  </h3>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-label ${maturityStyle[row.maturity]}`}
                >
                  {row.maturity}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {row.stack.split(" · ").slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="border border-white/10 bg-black/30 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-label text-mute"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-2 grid gap-2 sm:grid-cols-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.08, duration: 0.45 }}
        >
          {(Object.keys(stackByCategory) as (keyof typeof stackByCategory)[]).map(
            (cat) => (
              <div
                key={cat}
                className="border border-white/10 bg-black/30 px-3 py-2.5 backdrop-blur-sm"
              >
                <p className="mb-2 font-mono text-[9px] uppercase tracking-label text-signal">
                  {categoryLabel[cat]}
                </p>
                <div className="flex flex-wrap gap-1">
                  {stackByCategory[cat].map((item) => (
                    <span
                      key={item.id}
                      className="inline-flex items-center gap-1.5 border border-white/10 bg-black/40 px-2 py-1 font-mono text-[9px] uppercase tracking-label text-fog"
                      title={item.note}
                    >
                      {item.name}
                      <span className="text-signal">{item.level}</span>
                    </span>
                  ))}
                </div>
              </div>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
}
