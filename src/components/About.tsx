import { useState } from "react";
import { motion } from "framer-motion";
import { ABOUT } from "../data/portfolioData";
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../lib/motion";
import LivingBackground from "./LivingBackground";

export default function About() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section
      id="about"
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
        className="giant-index right-0 top-16 z-[1] opacity-30"
        aria-hidden="true"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 0.3, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        01
      </motion.span>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24 md:py-28">
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

            <div className="mt-8 grid gap-2 text-left sm:grid-cols-3">
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
    </section>
  );
}
