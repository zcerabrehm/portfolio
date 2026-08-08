import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { PROJECTS, type Project } from "../data/portfolioData";
import {
  cardIn,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../lib/motion";
import LivingBackground from "./LivingBackground";

interface Props {
  onOpen: (project: Project) => void;
}

const statusColor: Record<Project["status"], string> = {
  PROD: "text-signal border-signal/40 bg-signal/10",
  BETA: "text-fog border-white/20 bg-white/5",
  ARCHIVED: "text-mute border-white/10 bg-transparent",
};

export default function ProjectGrid({ onOpen }: Props) {
  const solo = PROJECTS.length === 1;

  return (
    <section
      id="work"
      className="snap-section relative isolate flex h-[100svh] flex-col justify-center overflow-hidden border-b border-white/10"
    >
      <LivingBackground variant="black" />

      <div className="section-frame z-[2]" aria-hidden="true">
        <span className="section-frame__corner tl" />
        <span className="section-frame__corner tr" />
        <span className="section-frame__corner bl" />
        <span className="section-frame__corner br" />
      </div>
      <motion.span
        className="giant-index right-[-2vw] top-12 z-[1] opacity-40"
        aria-hidden="true"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 0.4, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        02
      </motion.span>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-14 sm:px-6 sm:py-20 md:py-24">
        <motion.div
          className="mb-6 flex flex-col items-center gap-4 text-center sm:mb-8 md:flex-row md:items-end md:justify-between md:text-left"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div variants={staggerItem}>
            <p className="section-kicker justify-center md:justify-start">
              <span className="signal-dot" />
              02 · Work
            </p>
            <h2 className="font-display text-[clamp(1.85rem,4.5vw,3.25rem)] font-bold tracking-tightest">
              <span className="display-stack">
                <span className="display-stack__outline" aria-hidden="true">
                  Projects
                </span>
                <span className="display-stack__solid">Projects</span>
              </span>
            </h2>
          </motion.div>
          <motion.p
            variants={staggerItem}
            className="max-w-xs font-mono text-[11px] leading-relaxed text-mute"
          >
            Work I have shipped with a team. Open a card for the stack, problems
            we hit, and how it is built.
          </motion.p>
        </motion.div>

        <motion.div
          className={solo ? "grid gap-3" : "grid gap-3 sm:grid-cols-2"}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          style={{ perspective: 1200 }}
        >
          {PROJECTS.map((project, i) => (
            <motion.button
              key={project.id}
              type="button"
              data-cursor="view"
              onClick={() => onOpen(project)}
              variants={cardIn}
              custom={i}
              whileHover={{
                y: -6,
                transition: { duration: 0.3 },
              }}
              className={`group relative overflow-hidden border border-white/10 bg-white/[0.02] text-left transition-[border-color,box-shadow] duration-500 ease-out-expo hover:border-signal/45 hover:shadow-signal ${
                solo
                  ? "grid md:grid-cols-[1.35fr_1fr]"
                  : `grid grid-cols-[1.1fr_1fr] ${i % 2 === 1 ? "sm:translate-y-4" : ""}`
              }`}
            >
              <div
                className={`relative overflow-hidden border-white/10 ${
                  solo
                    ? "min-h-[200px] border-b md:min-h-[280px] md:border-b-0 md:border-r"
                    : "min-h-[140px] border-r sm:min-h-[168px]"
                }`}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top opacity-80 saturate-90 transition-[transform,opacity,filter] duration-700 ease-out-expo group-hover:scale-105 group-hover:opacity-95 group-hover:saturate-100"
                  />
                ) : (
                  <div className="absolute inset-0 bg-surface" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/70" />
                <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-label text-fog backdrop-blur-sm">
                    {project.posterLabel ?? project.code}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-label backdrop-blur-sm ${statusColor[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="relative flex flex-col justify-between p-4 sm:p-6">
                <div>
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div>
                      <p className="label mb-1.5">
                        {project.code}
                        <span className="text-white/20"> · </span>
                        {project.year}
                        <span className="text-white/20"> · </span>
                        {project.role}
                      </p>
                      <h3
                        className={`font-display font-bold tracking-tight text-chalk ${
                          solo ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
                        }`}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-signal transition-all duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-void group-hover:rotate-12">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <p
                    className={`leading-relaxed text-mute ${
                      solo
                        ? "text-sm sm:text-[15px]"
                        : "line-clamp-2 text-xs sm:text-[13px]"
                    }`}
                  >
                    {project.summary}
                  </p>
                </div>

                <div className="mt-5">
                  <div className="mb-3 h-px w-full origin-left bg-white/10">
                    <div className="h-px w-0 bg-signal transition-all duration-500 group-hover:w-full" />
                  </div>
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, solo ? 5 : 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-label text-fog"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.metrics.slice(0, solo ? 3 : 2).map((m) => (
                        <div
                          key={m.label}
                          className="text-right font-mono text-[9px]"
                        >
                          <p className="text-mute">{m.label}</p>
                          <p className="text-signal">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {solo ? (
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-label text-mute transition-colors group-hover:text-signal">
                      View details →
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
