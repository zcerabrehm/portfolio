import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Search, Terminal } from "lucide-react";
import type { CommandItem } from "../data/portfolioData";
import { SITE } from "../data/portfolioData";

interface Props {
  open: boolean;
  query: string;
  onQueryChange: (q: string) => void;
  results: CommandItem[];
  activeIndex: number;
  onActiveIndexChange: (i: number) => void;
  onRun: (item?: CommandItem | null) => void;
  onClose: () => void;
}

export default function CommandPalette({
  open,
  query,
  onQueryChange,
  results,
  activeIndex,
  onActiveIndexChange,
  onRun,
  onClose,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus?.(), 30);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        onActiveIndexChange(
          Math.min(activeIndex + 1, Math.max((results?.length ?? 1) - 1, 0)),
        );
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        onActiveIndexChange(Math.max(activeIndex - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        onRun(results?.[activeIndex]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, activeIndex, results, onActiveIndexChange, onRun]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-void/75 backdrop-blur-sm"
            aria-label="Close command palette"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-sm border border-white/10 bg-black/85 shadow-panel backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-mute">
                <Terminal size={12} className="text-signal" />
                {SITE.brand} // TERMINAL HUD
              </div>
              <span className="font-mono text-[10px] text-signal">
                {SITE.availability}
              </span>
            </div>
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search size={14} className="text-signal" />
              <span className="font-mono text-signal">$</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="search commands, projects, actions…"
                className="w-full bg-transparent font-mono text-sm text-chalk outline-none placeholder:text-mute"
              />
              <kbd className="rounded-full border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-mute">
                ESC
              </kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto py-2">
              {(results?.length ?? 0) === 0 ? (
                <li className="px-4 py-6 font-mono text-xs text-mute">
                  No matches // refine query
                </li>
              ) : (
                results?.map?.((item, i) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onMouseEnter={() => onActiveIndexChange(i)}
                      onClick={() => onRun(item)}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left font-mono text-xs transition-colors ${
                        i === activeIndex
                          ? "bg-signal/10 text-chalk"
                          : "text-fog hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-label text-mute">
                          {item.group}
                        </span>
                        {item.label}
                      </span>
                      <span className="flex items-center gap-2 text-[10px] text-mute">
                        {item.hint}
                        {i === activeIndex ? (
                          <CornerDownLeft size={12} className="text-signal" />
                        ) : null}
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
            <div className="border-t border-white/10 px-4 py-2 font-mono text-[10px] text-mute">
              ↑↓ navigate · ↵ run · esc close · latency {SITE.latencyMs}ms
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
