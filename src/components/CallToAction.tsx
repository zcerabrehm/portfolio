import { lazy, Suspense, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { CTA, SITE } from "../data/portfolioData";
import { useMagnetic } from "../hooks/useMagnetic";
import { playUiTick } from "../lib/uiSound";
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../lib/motion";
import LivingBackground from "./LivingBackground";

const ParticleScene = lazy(() => import("./ParticleScene"));

interface Props {
  onCopyEmail: (email: string) => void;
}

export default function CallToAction({ onCopyEmail }: Props) {
  const primaryRef = useMagnetic<HTMLAnchorElement>(0.32);
  const secondaryRef = useMagnetic<HTMLButtonElement>(0.28);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    playUiTick("copy");
    onCopyEmail(SITE.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, [onCopyEmail]);

  return (
    <section
      id="engage"
      className="snap-section relative isolate flex flex-col justify-center border-b border-white/10 bg-void"
    >
      <LivingBackground variant="hero" />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <ParticleScene
            accent="#CCFF00"
            className="!absolute !inset-0 !h-full !w-full"
          />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void/85" />
      </div>

      <div className="section-frame z-[2]" aria-hidden="true">
        <span className="section-frame__corner tl" />
        <span className="section-frame__corner tr" />
        <span className="section-frame__corner bl" />
        <span className="section-frame__corner br" />
      </div>
      <motion.span
        className="giant-index right-0 top-1/3 z-[1] opacity-30"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 0.3, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        04
      </motion.span>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="overflow-hidden border border-white/10 bg-black/35 p-6 shadow-panel backdrop-blur-md sm:p-10 md:p-14"
        >
          <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div className="max-w-2xl">
              <motion.p
                variants={staggerItem}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-4 py-2 font-mono text-[10px] uppercase tracking-label text-signal shadow-signal"
              >
                {CTA.badge}
              </motion.p>

              <motion.h2
                variants={staggerItem}
                className="font-display text-[clamp(2.2rem,6vw,4.25rem)] font-bold leading-[0.95] tracking-tightest"
              >
                <span className="display-stack block">
                  <span className="display-stack__outline" aria-hidden="true">
                    {CTA.headline}
                  </span>
                  <span className="display-stack__solid">{CTA.headline}</span>
                </span>
                <span className="mx-auto mt-3 block max-w-xl text-[0.42em] font-semibold leading-snug tracking-tight text-mute sm:text-[0.38em] md:mx-0">
                  <span className="whitespace-nowrap">Real systems.</span>{" "}
                  <span className="whitespace-nowrap">Real constraints.</span>
                </span>
              </motion.h2>

              <motion.p
                variants={staggerItem}
                className="mx-auto mt-5 max-w-lg text-pretty text-sm leading-relaxed text-mute/90 sm:text-[15px] md:mx-0"
              >
                {CTA.body}
              </motion.p>
            </div>

            <motion.div
              variants={staggerItem}
              className="flex w-full max-w-md flex-col gap-3"
            >
              <motion.a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(CTA.mailSubject)}`}
                ref={primaryRef}
                data-magnetic
                data-cursor="engage"
                onClick={() => playUiTick("tap")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-between gap-3 rounded-full border border-signal bg-signal px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-label text-void transition-shadow duration-300 hover:shadow-signal"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail size={14} />
                  {CTA.primaryLabel}
                </span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </motion.a>

              <motion.button
                type="button"
                ref={secondaryRef}
                data-magnetic
                data-cursor="copy"
                onClick={handleCopy}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-between gap-3 rounded-full border border-white/15 bg-black/40 px-6 py-4 font-mono text-[11px] uppercase tracking-label text-fog backdrop-blur-md transition-[border-color,color] duration-200 hover:border-signal/50 hover:text-chalk"
              >
                <span className="inline-flex items-center gap-2">
                  {copied ? (
                    <Check size={14} className="text-signal" />
                  ) : (
                    <Copy size={14} />
                  )}
                  {copied ? CTA.copiedLabel : CTA.secondaryLabel}
                </span>
                <span className="truncate text-[10px] text-mute">
                  {SITE.email}
                </span>
              </motion.button>

              <div className="grid grid-cols-3 gap-2 rounded-sm border border-white/10 bg-void/50 p-3 font-mono text-[10px]">
                {CTA.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
                  >
                    <p className="text-mute">{stat.label}</p>
                    <p className="mt-0.5 font-display text-lg font-bold tracking-tight text-signal sm:text-xl">
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              <a
                href="#contact"
                data-cursor="scroll"
                className="text-center font-mono text-[10px] uppercase tracking-label text-mute transition-colors hover:text-signal"
              >
                More ways to reach me ↓
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
