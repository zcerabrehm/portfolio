import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MessageCircle, Terminal } from "lucide-react";
import { SITE } from "../data/portfolioData";
import { fadeUp } from "../lib/motion";
import LivingBackground from "./LivingBackground";

const ParticleScene = lazy(() => import("./ParticleScene"));

const CODE_LOOP: readonly string[] = [
  "$ whoami",
  "hey, i'm alen",
  "full stack + ui/ux · philippines",
  "",
  "$ day_job",
  "web developer · shipping live sites",
  "",
  "$ after_hours",
  "pc tuning · dac/amp setups",
  "low latency audio · side builds",
  "",
  "$ also_into",
  "server security tests",
  "multiplayer db edge cases",
  "",
  "$ status",
  "online · open for collabs",
  "",
];



function lineClassName(line: string): string {
  if (!line) return "h-3";
  if (line.startsWith("✓") || line.startsWith("→")) return "text-mute";
  if (line.startsWith("$")) return "text-signal/90";
  if (line.startsWith("const ") || line.startsWith("if ") || line.startsWith("score") || line.startsWith("export") || line.startsWith("  ") || line.startsWith("queue") || line === "}")
    return "text-fog";
  return "text-fog";
}

function DisplayStack({
  solid,
  mute = false,
}: {
  solid: string;
  mute?: boolean;
}) {
  return (
    <span className={`display-stack ${mute ? "display-stack--mute" : ""}`}>
      <span className="display-stack__outline" aria-hidden="true">
        {solid}
      </span>
      <span className="display-stack__solid">{solid}</span>
    </span>
  );
}

function InfiniteTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;
    let buffer: string[] = [];
    const timers = new Set<number>();

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        if (!cancelled) fn();
      }, ms);
      timers.add(id);
    };

    const tick = () => {
      if (cancelled) return;
      const full = CODE_LOOP[lineIdx % CODE_LOOP.length] ?? "";

      if (charIdx <= full.length) {
        setCurrent(full.slice(0, charIdx));
        charIdx += 1;
        schedule(tick, full === "" ? 180 : 22 + Math.random() * 28);
        return;
      }

      buffer = [...buffer, full].slice(-10);
      setLines(buffer);
      setCurrent("");
      charIdx = 0;
      lineIdx += 1;

      const pause = full.startsWith("$") || full.startsWith("✓") ? 420 : 90;
      schedule(tick, pause);
    };

    schedule(tick, 400);

    const blink = window.setInterval(() => {
      if (!cancelled) setCursorOn((v) => !v);
    }, 530);

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      timers.clear();
      window.clearInterval(blink);
    };
  }, []);

  return (
    <div className="glass mx-auto w-full max-w-md overflow-hidden shadow-panel lg:mx-0 lg:max-w-none">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="flex items-center gap-2 font-mono text-[10px] text-mute">
          <Terminal size={12} className="text-signal" />
          runtime.sh // alenguiwan.dev
        </div>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-signal/80" />
        </div>
      </div>
      <div className="flex h-[150px] flex-col justify-end space-y-1.5 overflow-hidden bg-void/50 p-3 font-mono text-[10px] leading-relaxed sm:h-[200px] sm:p-4 sm:text-xs">
        {lines.map((line, i) => (
          <p
            key={`${i}-${line}-${lines.length}`}
            className={lineClassName(line)}
          >
            {line || "\u00A0"}
          </p>
        ))}
        <p className={lineClassName(current)}>
          {current}
          <span
            className={`ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-signal align-middle ${
              cursorOn ? "opacity-100" : "opacity-0"
            }`}
          />
        </p>
      </div>
      <div className="grid grid-cols-3 border-t border-white/10 font-mono text-[10px]">
        <div className="border-r border-white/10 px-3 py-2">
          <p className="text-mute">NODE</p>
          <p className="text-chalk">edge-01</p>
        </div>
        <div className="border-r border-white/10 px-3 py-2">
          <p className="text-mute">BUILD</p>
          <p className="text-chalk">{SITE.version}</p>
        </div>
        <div className="px-3 py-2">
          <p className="text-mute">MODE</p>
          <p className="text-signal">STRICT</p>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="snap-section relative isolate flex h-[100svh] flex-col overflow-hidden border-b border-white/10 bg-void pt-20 sm:pt-24"
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
        <div className="absolute inset-0 bg-gradient-to-b from-void/50 via-transparent to-void/90" />
      </div>

      <div className="section-frame z-[2]" aria-hidden="true">
        <span className="section-frame__corner tl" />
        <span className="section-frame__corner tr" />
        <span className="section-frame__corner bl" />
        <span className="section-frame__corner br" />
      </div>
      <motion.span
        className="giant-index right-0 top-1/2 z-[1] -translate-y-1/2 opacity-40"
        aria-hidden="true"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 0.4, x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        00
      </motion.span>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="text-center lg:col-span-7 lg:text-left">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mb-3 font-mono text-[11px] uppercase tracking-label text-signal sm:mb-4"
            >
              {SITE.role}
            </motion.p>

            <h1 className="text-balance font-display text-[clamp(2.1rem,7.5vw,5.4rem)] font-bold leading-[0.88] tracking-tightest">
              <motion.span
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mb-1 block"
              >
                <DisplayStack solid="SYSTEMS" />
              </motion.span>
              <motion.span
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mb-1 block"
              >
                <DisplayStack solid="THAT SHIP." />
              </motion.span>
              <motion.span
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="block text-[0.72em]"
              >
                <DisplayStack solid="NOT SLIDES." mute />
              </motion.span>
            </h1>

            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mx-auto mt-4 max-w-md text-pretty font-mono text-[12px] leading-relaxed text-mute sm:mt-5 sm:text-[13px] lg:mx-0"
            >
              Hi, I&apos;m Alen. I design and build web stuff people actually
              use, from clean interfaces to the backend that keeps them running.
              Always happy to talk projects over email or Discord.
            </motion.p>

            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6 lg:justify-start"
            >
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent("Hello from alenguiwan.dev")}`}
                data-cursor="hello"
                className="group inline-flex items-center gap-2 rounded-full border border-signal bg-signal px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-label text-void transition-[transform,box-shadow] duration-200 ease-out-expo hover:-translate-y-0.5 hover:shadow-signal"
              >
                Say Hello
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href={SITE.discord.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="discord"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-5 py-2.5 font-mono text-[11px] uppercase tracking-label text-fog backdrop-blur-md transition-[border-color,color,transform] duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-signal/50 hover:text-chalk"
              >
                <MessageCircle size={14} className="text-signal" />
                Discord
              </a>
            </motion.div>
          </div>

          <motion.div
            custom={6}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 flex justify-center sm:mt-0 lg:col-span-5 lg:justify-end"
          >
            <motion.div
              className="w-full max-w-md lg:max-w-none"
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-full max-w-md scale-95 sm:max-w-none sm:scale-100">
                <InfiniteTerminal />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          custom={7}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8 flex justify-center pb-2 sm:mt-10"
        >
          <a
            href="#about"
            className="group flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-label text-mute transition-colors hover:text-signal"
            data-cursor="scroll"
          >
            <span className="scroll-hint flex h-9 w-6 items-start justify-center rounded-full border border-white/20 pt-1.5">
              <span className="h-1.5 w-1 rounded-full bg-signal" />
            </span>
            <span className="inline-flex items-center gap-2">
              Scroll
              <ArrowDown
                size={12}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
