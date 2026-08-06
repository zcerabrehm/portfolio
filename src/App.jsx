import { lazy, Suspense, useEffect, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";
import { useContentGuard } from "./hooks/useContentGuard";
import { useIntroAnimation } from "./hooks/useIntroAnimation";
import { useMagnetic } from "./hooks/useMagnetic";

const ParticleScene = lazy(() => import("./components/ParticleScene"));

/**
 * Temporary single-screen WIP placeholder.
 * Full portfolio sections remain in src/components for later restore.
 */
export default function App() {
  useContentGuard();
  const magneticRef = useMagnetic(0.35);
  const [loading, setLoading] = useState(true);
  const introScope = useIntroAnimation(!loading);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* Viewport-fixed backdrop — outside #app so overflow never trims edges */}
      <div
        className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-screen"
        aria-hidden="true"
      >
        <div
          className="mesh-blob"
          style={{
            width: "70vw",
            height: "70vw",
            top: "-18%",
            left: "-15%",
            background:
              "radial-gradient(circle, rgba(232,255,77,0.22) 0%, transparent 70%)",
            animationDelay: "0s",
          }}
        />
        <div
          className="mesh-blob"
          style={{
            width: "60vw",
            height: "60vw",
            bottom: "-12%",
            right: "-15%",
            background:
              "radial-gradient(circle, rgba(124,156,255,0.18) 0%, transparent 70%)",
            animationDelay: "-6s",
          }}
        />
        <div
          className="mesh-blob"
          style={{
            width: "45vw",
            height: "45vw",
            top: "30%",
            left: "35%",
            background:
              "radial-gradient(circle, rgba(255,184,108,0.12) 0%, transparent 70%)",
            animationDelay: "-11s",
          }}
        />
        {!loading && (
          <Suspense fallback={null}>
            <ParticleScene
              accent="#e8ff4d"
              className="!fixed !inset-0 !h-[100dvh] !w-screen"
            />
          </Suspense>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink" />
      </div>

      <div className="grain-overlay" aria-hidden="true" />
      {!loading && <CustomCursor />}

      <div
        id="app"
        ref={introScope}
        className="relative z-10 flex min-h-[100dvh] w-full flex-col bg-transparent text-paper"
      >
        <header className="relative flex items-center justify-between px-6 py-6 md:px-12">
          <a
            href="#app"
            data-cursor="home"
            data-intro
            className="group relative inline-flex items-baseline font-display text-lg font-bold uppercase tracking-widest text-paper transition-[letter-spacing,color] duration-500 ease-out hover:tracking-[0.28em]"
          >
            <span className="relative">
              Alen
              <span className="text-ember transition-all duration-500 ease-out group-hover:drop-shadow-[0_0_12px_rgba(232,255,77,0.85)]">
                .
              </span>
              dev
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-ember transition-all duration-500 ease-out group-hover:w-full group-hover:shadow-[0_0_8px_rgba(232,255,77,0.6)]" />
            </span>
          </a>
          <span
            data-intro
            className="flex max-w-[min(100%,14rem)] items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/70 backdrop-blur-md sm:max-w-none sm:px-4 sm:text-[11px] sm:tracking-widest"
          >
            <span className="relative inline-block h-1.5 w-1.5 shrink-0">
              <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-ember opacity-75" />
              <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember" />
            </span>
            <span className="truncate">Under development</span>
          </span>
        </header>

        <main className="relative flex flex-1 flex-col px-6 pt-16 text-center md:px-12">
          <div className="flex flex-1 flex-col items-center justify-center">
            <p
              data-intro
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ember backdrop-blur-md"
            >
              <span className="inline-block h-px w-6 bg-ember" />
              Under development
            </p>

            <div className="mx-auto w-full max-w-full">
              <h1 className="w-full max-w-full text-center font-display text-[clamp(2.05rem,11.2vw,7.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-paper sm:tracking-mega md:text-[clamp(2.6rem,10vw,7.5rem)]">
                <span className="block overflow-hidden">
                  <span data-intro className="block">
                    Work In
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    data-intro
                    className="block text-transparent"
                    style={{ WebkitTextStroke: "1.5px rgba(243,243,240,0.45)" }}
                  >
                    Progress
                  </span>
                </span>
              </h1>

              <p
                data-intro
                className="mt-8 w-full text-base leading-relaxed text-paper/60 md:text-lg"
              >
                Things are still coming together over here. While the portfolio
                is in progress, you can still reach out to me :)
              </p>
            </div>

            <div
              data-intro
              className="mt-12 flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="mailto:alenguiwan@gmail.com"
                ref={magneticRef}
                data-cursor="say hi"
                data-magnetic
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ember px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-paper"
              >
                <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="relative transition-colors duration-300 group-hover:text-ink">
                  Say hello
                </span>
                <span className="relative text-ember transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink">
                  →
                </span>
              </a>

              <a
                href="https://discord.com/users/688631280656580679"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="discord"
                title="Add me on Discord: 09002"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-4 font-mono text-sm uppercase tracking-[0.15em] text-paper/60 transition-colors hover:border-ember hover:text-paper"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-xs">
                  ⌘
                </span>
                Discord · 09002
              </a>
            </div>
          </div>

          <div
            data-intro
            className="mt-6 mb-10 flex flex-col items-center gap-2"
          >
            <span
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-ember/40 bg-ember/10 font-mono text-lg text-ember animate-float"
              aria-hidden="true"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-ember/20" />
              <span className="relative">✦</span>
            </span>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-paper/50">
              <span className="relative inline-block h-1.5 w-1.5 shrink-0">
                <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 animate-pulse-soft rounded-full bg-ember" />
              </span>
              Portfolio launching soon
            </p>
          </div>
        </main>

        <footer
          data-intro
          className="relative border-t border-white/10 px-6 py-6 md:px-12"
        >
          <div className="flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40 sm:justify-between">
            <span>© {new Date().getFullYear()} Alen Guiwan</span>
          </div>
        </footer>
      </div>
    </>
  );
}
