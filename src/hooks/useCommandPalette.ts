import { useCallback, useEffect, useMemo, useState } from "react";
import { COMMANDS, type CommandItem } from "../data/portfolioData";

interface Options {
  onNavigate: (id: string) => void;
  onOpenProject: (projectId: string) => void;
  onCopyEmail: (email: string) => void;
}

function score(item: CommandItem, q: string): number {
  if (!q) return 1;
  const hay = `${item.label} ${item.hint} ${item.keywords?.join?.(" ") ?? ""}`.toLowerCase();
  if (hay.includes(q)) return q.length / Math.max(hay.length, 1) + 1;
  return item.keywords?.some?.((k) => k?.includes?.(q)) ? 0.5 : 0;
}

export function useCommandPalette({
  onNavigate,
  onOpenProject,
  onCopyEmail,
}: Options) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const q = query?.trim?.().toLowerCase?.() ?? "";
    return (COMMANDS ?? [])
      .map((item) => ({ item, s: score(item, q) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((r) => r.item);
  }, [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isPalette = (e.metaKey || e.ctrlKey) && e.key?.toLowerCase?.() === "k";
      if (isPalette) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const run = useCallback(
    (item?: CommandItem | null) => {
      if (!item) return;
      if (item.action === "scroll") onNavigate(item.payload);
      if (item.action === "project") onOpenProject(item.payload);
      if (item.action === "copy-email") onCopyEmail(item.payload);
      if (item.action === "external" && item.payload) {
        window.open(item.payload, "_blank", "noopener,noreferrer");
      }
      close();
    },
    [close, onCopyEmail, onNavigate, onOpenProject],
  );

  return {
    open,
    setOpen,
    query,
    setQuery,
    results,
    activeIndex,
    setActiveIndex,
    run,
    close,
  };
}
