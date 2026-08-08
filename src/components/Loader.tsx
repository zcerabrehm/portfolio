import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "../data/portfolioData";

interface Props {
  onDone: () => void;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function buildStutterPlan(): number[] {
  const stalls = new Set<number>();
  const count = 3 + Math.floor(Math.random() * 3); // 3–5 stalls
  while (stalls.size < count) {
    stalls.add(Math.round(rand(8, 92)));
  }
  return [...stalls].sort((a, b) => a - b);
}

export default function Loader({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let value = 0;
    let timer = 0;
    const stalls = new Set(buildStutterPlan());
    const hit = new Set<number>();

    const finish = () => {
      if (cancelled) return;
      setProgress(100);
      setLeaving(true);
      window.setTimeout(() => {
        if (!cancelled) onDone();
      }, 320);
    };

    const step = () => {
      if (cancelled) return;

      if (value >= 100) {
        finish();
        return;
      }

      // Near the end, snap cleanly
      if (value >= 96) {
        value = 100;
        setProgress(100);
        timer = window.setTimeout(finish, rand(40, 90));
        return;
      }

      const atStall =
        stalls.has(value) && !hit.has(value)
          ? true
          : [...stalls].some((s) => !hit.has(s) && value >= s && value < s + 3);

      if (atStall) {
        const mark =
          [...stalls].find((s) => !hit.has(s) && value >= s && value < s + 3) ??
          value;
        hit.add(mark);
        // Brief freeze at a random milestone
        timer = window.setTimeout(step, rand(70, 180));
        return;
      }

      // Uneven chunk sizes — feels like real asset loads
      const chunk =
        value < 20
          ? rand(2, 7)
          : value < 55
            ? rand(1, 5)
            : value < 80
              ? rand(2, 8)
              : rand(3, 9);

      value = Math.min(100, Math.round(value + chunk));
      setProgress(value);

      const delay =
        value < 15
          ? rand(18, 40)
          : value < 70
            ? rand(22, 55)
            : rand(16, 42);

      timer = window.setTimeout(step, delay);
    };

    timer = window.setTimeout(step, rand(80, 160));

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grain-overlay !z-[201] opacity-[0.04]" aria-hidden="true" />
          <motion.p
            className="mb-6 font-mono text-[10px] uppercase tracking-label text-mute"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            booting {SITE.handle}
          </motion.p>
          <motion.h1
            className="font-display text-[clamp(1.5rem,6vw,2.75rem)] font-bold tracking-tightest text-chalk"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
          >
            <span className="display-stack">
              <span className="display-stack__outline" aria-hidden="true">
                {SITE.brand}
              </span>
              <span className="display-stack__solid">{SITE.brand}</span>
            </span>
          </motion.h1>
          <div className="mt-10 w-[min(280px,70vw)]">
            <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-label text-mute">
              <span>load</span>
              <span className="text-signal">{String(progress).padStart(3, "0")}%</span>
            </div>
            <div className="h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-px bg-signal"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.08 }}
              />
            </div>
          </div>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-label text-mute/60">
            systems that ship
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
