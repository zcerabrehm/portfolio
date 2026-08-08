import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "../data/portfolioData";

interface Props {
  onDone: () => void;
}

export default function Loader({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease out
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.min(100, Math.round(eased * 100));
      setProgress(next);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        window.setTimeout(onDone, 420);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grain-overlay !z-[201] opacity-[0.04]" aria-hidden="true" />
          <motion.p
            className="mb-6 font-mono text-[10px] uppercase tracking-label text-mute"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            booting {SITE.handle}
          </motion.p>
          <motion.h1
            className="font-display text-[clamp(1.5rem,6vw,2.75rem)] font-bold tracking-tightest text-chalk"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
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
                transition={{ ease: "linear", duration: 0.05 }}
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
