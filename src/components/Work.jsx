import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { loadProjects } from "../lib/loadProjects";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned horizontal scroll case-study track.
 */
export default function Work() {
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    let alive = true;
    loadProjects().then((data) => {
      if (alive) setProjects(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!projects) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -getAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${getAmount() + window.innerHeight * 0.15}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        "[data-work-progress]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => `+=${getAmount() + window.innerHeight * 0.15}`,
            scrub: 1,
          },
        },
      );
    }, pinRef);

    // Refresh after layout settles (images / fonts).
    const t = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(t);
      ctx.revert();
    };
  }, [projects]);

  return (
    <section id="work" ref={pinRef} className="relative overflow-hidden border-t border-white/10">
      <div className="pointer-events-none absolute left-6 top-10 z-20 md:left-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40">
          [ 03 // Featured Work ]
        </p>
      </div>

      <div className="absolute bottom-10 left-6 right-6 z-20 md:left-12 md:right-12">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">
            Case Studies
          </span>
          <div className="relative h-px flex-1 bg-white/10">
            <div
              data-work-progress
              className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-ember"
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">
            {projects ? String(projects.length).padStart(2, "0") : "00"}
          </span>
        </div>
      </div>

      <div className="flex h-screen items-center px-6 md:px-12">
        {projects ? (
          <div ref={trackRef} className="flex items-center gap-12 will-change-transform">
            <div className="mr-4 hidden w-[22vw] shrink-0 flex-col justify-center lg:flex">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-mega text-paper">
                Selected
                <span
                  className="mt-1 block text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(243,243,240,0.4)" }}
                >
                  Projects
                </span>
              </h2>
              <p className="mt-5 max-w-[14rem] font-mono text-[11px] uppercase leading-relaxed tracking-widest text-paper/40">
                Drag the scroll — each card is a shipped system.
              </p>
            </div>

            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}

            <div className="flex h-72 w-56 shrink-0 flex-col justify-between rounded-3xl border border-dashed border-white/10 p-6">
              <span className="font-display text-6xl font-extrabold text-paper/10">
                END
              </span>
              <a
                href="#contact"
                data-cursor="lets talk"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember transition-colors hover:text-paper"
              >
                Start a project →
              </a>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-12">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-[60vh] w-[80vw] shrink-0 animate-pulse-soft rounded-3xl border border-white/5 bg-white/[0.03] md:w-[40vw]"
              />
            ))}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent md:w-24" />
    </section>
  );
}
