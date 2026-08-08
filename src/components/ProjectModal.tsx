import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import type { Project } from "../data/portfolioData";
import { openInNewTab } from "../lib/links";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  const gallery = useMemo(() => {
    if (!project) return [] as string[];
    if (project.images?.length) return project.images;
    return project.image ? [project.image] : [];
  }, [project]);

  useEffect(() => {
    if (!project) {
      setActiveSrc(null);
      return;
    }
    setActiveSrc(gallery[0] ?? project.image ?? null);
  }, [project, gallery]);

  useEffect(() => {
    if (!project) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (gallery.length > 1 && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault();
        const idx = Math.max(0, gallery.indexOf(activeSrc ?? gallery[0]));
        const next =
          e.key === "ArrowLeft"
            ? (idx - 1 + gallery.length) % gallery.length
            : (idx + 1) % gallery.length;
        setActiveSrc(gallery[next]);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [project, onClose, gallery, activeSrc]);

  const activeIndex = activeSrc ? gallery.indexOf(activeSrc) : -1;

  const stepImage = (dir: -1 | 1) => {
    if (gallery.length < 2 || activeIndex < 0) return;
    const next = (activeIndex + dir + gallery.length) % gallery.length;
    setActiveSrc(gallery[next]);
  };

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[70] flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-void/80 backdrop-blur-sm md:hidden"
            aria-label="Close project drawer"
            onClick={onClose}
          />

          {/* Left: image stage */}
          <div className="relative hidden min-w-0 flex-1 items-center justify-center bg-black/60 md:flex">
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              aria-label="Close project"
              onClick={onClose}
            />

            <AnimatePresence mode="wait">
              {activeSrc ? (
                <motion.div
                  key={activeSrc}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 flex h-full w-full max-w-5xl flex-col items-center justify-center p-8 lg:p-12"
                >
                  <img
                    src={activeSrc}
                    alt={`${project.title} preview`}
                    className="max-h-[min(78vh,820px)] w-auto max-w-full rounded-sm border border-white/10 object-contain shadow-panel"
                  />
                  {gallery.length > 1 ? (
                    <div className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-label text-mute">
                      <button
                        type="button"
                        onClick={() => stepImage(-1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-fog transition-colors hover:border-signal/40 hover:text-signal"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <span>
                        {activeIndex + 1} / {gallery.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => stepImage(1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-fog transition-colors hover:border-signal/40 hover:text-signal"
                        aria-label="Next image"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  ) : null}
                </motion.div>
              ) : (
                <p className="relative z-10 font-mono text-[11px] uppercase tracking-label text-mute">
                  Select an image
                </p>
              )}
            </AnimatePresence>
          </div>

          {/* Right: details */}
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 ml-auto flex h-full w-full max-w-xl flex-col border-l border-white/10 bg-black/85 shadow-panel backdrop-blur-md"
          >
            {project.image ? (
              <div className="relative h-40 shrink-0 overflow-hidden border-b border-white/10 sm:h-44 md:hidden">
                <img
                  src={activeSrc ?? project.image}
                  alt=""
                  className="h-full w-full object-cover object-top opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
                <div className="absolute bottom-3 left-5 font-mono text-[10px] uppercase tracking-label text-signal">
                  {project.posterLabel ?? project.code}
                </div>
              </div>
            ) : null}

            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
              <div>
                <p className="label mb-2">
                  {project.code}
                  <span className="text-white/20"> · </span>
                  <span className="text-signal">{project.status}</span>
                </p>
                <h2 className="font-display text-2xl font-bold tracking-tight text-chalk">
                  {project.title}
                </h2>
                <p className="mt-1 font-mono text-[11px] text-mute">
                  {project.role} · {project.year}
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                data-cursor="close"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-fog transition-colors hover:border-signal/40 hover:text-chalk focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto px-5 py-6">
              <p className="text-sm leading-relaxed text-fog">
                {project.description}
              </p>

              {gallery.length > 0 ? (
                <div>
                  <p className="label mb-3 flex items-center gap-2">
                    <span className="lime-rule" />
                    Images
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {gallery.map((src) => {
                      const active = src === activeSrc;
                      return (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setActiveSrc(src)}
                          className={`group relative aspect-[16/10] overflow-hidden border bg-black/40 text-left transition-colors ${
                            active
                              ? "border-signal shadow-signal"
                              : "border-white/10 hover:border-signal/40"
                          }`}
                          data-cursor="view"
                          aria-pressed={active}
                          aria-label="Show image preview"
                        >
                          <img
                            src={src}
                            alt=""
                            className="h-full w-full object-cover object-top opacity-85 transition-transform duration-500 group-hover:scale-105"
                          />
                          {active ? (
                            <span className="absolute bottom-2 left-2 rounded-full border border-signal/40 bg-black/70 px-2 py-0.5 font-mono text-[8px] uppercase tracking-label text-signal">
                              Viewing
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <div>
                <p className="label mb-3 flex items-center gap-2">
                  <span className="lime-rule" />
                  Metrics
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-sm border border-white/10 bg-void/50 px-3 py-3"
                    >
                      <p className="font-mono text-[10px] text-mute">{m.label}</p>
                      <p className="mt-1 font-mono text-sm text-signal">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="label mb-3 flex items-center gap-2">
                  <span className="lime-rule" />
                  Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-fog"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="label mb-3 flex items-center gap-2">
                  <span className="lime-rule" />
                  Architecture
                </p>
                <ul className="space-y-2">
                  {project.architecture.map((line) => (
                    <li
                      key={line}
                      className="flex gap-2 font-mono text-xs text-fog"
                    >
                      <span className="text-signal">→</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="label mb-3 flex items-center gap-2">
                  <span className="lime-rule" />
                  Challenges
                </p>
                <div className="space-y-3">
                  {project.challenges.map((c) => (
                    <div
                      key={c.title}
                      className="rounded-sm border border-white/10 bg-void/40 px-3 py-3"
                    >
                      <p className="font-mono text-xs text-chalk">{c.title}</p>
                      <p className="mt-1 text-sm text-mute">{c.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {(project.links?.length ?? 0) > 0 ? (
              <div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-4">
                {project.links?.map((link) => (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    onClick={(e) => {
                      e.preventDefault();
                      openInNewTab(link.href);
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-signal bg-signal px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-label text-void transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                  >
                    <ExternalLink size={14} />
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
