import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "../data/portfolioData";
import { useLocalTime } from "../hooks/useLocalTime";

interface Props {
  onOpenPalette: () => void;
}

export default function Navbar({ onOpenPalette }: Props) {
  const time = useLocalTime();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={`pointer-events-auto mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-full border px-2 py-1.5 shadow-dock backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ease-out-expo sm:px-3 ${
          scrolled
            ? "border-white/15 bg-black/55"
            : "border-white/10 bg-black/40"
        }`}
      >
        <a
          href="#top"
          className="brand-mark shrink-0 rounded-full px-2.5 py-1.5 text-[10px] sm:px-3 sm:text-[11px]"
          data-cursor="home"
          aria-label={SITE.brand}
        >
          {SITE.brand}
        </a>

        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS?.map?.((link) => (
            <a
              key={link.id}
              href={link.href}
              data-cursor="visit"
              className="rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-label text-mute transition-colors duration-200 hover:bg-white/5 hover:text-chalk"
            >
              <span className="mr-1 text-signal/70">{link.shortcut}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-void/60 px-3 py-1.5 font-mono text-[10px] text-mute lg:flex">
            <span className="signal-dot" />
            <time suppressHydrationWarning>{time}</time>
          </div>

          <button
            type="button"
            onClick={onOpenPalette}
            data-cursor="command"
            className="group hidden items-center gap-2 rounded-full border border-white/10 bg-void/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-label text-mute transition-[border-color,color,background-color] duration-200 hover:border-signal/40 hover:bg-signal/10 hover:text-chalk md:flex"
            aria-label="Open command palette"
          >
            <kbd className="rounded-full border border-white/10 bg-black/40 px-1.5 py-0.5 text-[9px] text-mute">
              Ctrl+K
            </kbd>
          </button>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-void/50 text-fog md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <div
        className={`pointer-events-auto mx-auto mt-2 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md md:hidden ${
          mobileOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col gap-1 p-3">
          {NAV_LINKS?.map?.((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-white/5 bg-white/[0.03] px-4 py-3 font-mono text-xs uppercase tracking-label text-fog transition-colors hover:border-signal/30 hover:text-chalk"
            >
              <span className="mr-2 text-signal/70">{link.shortcut}</span>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
