import { useScrollReveal } from "../hooks/useScrollReveal";

const PRINCIPLES = [
  {
    n: "01",
    title: "Full-Stack Architecture",
    body: "Own the pipeline end-to-end — from React interfaces to Node/Laravel services to Postgres data — so systems stay coherent, testable, and fast.",
  },
  {
    n: "02",
    title: "AI + Computer Vision",
    body: "Embed models where they matter: YOLO/SSD detection at the edge, RAG-assisted language tools, and analytics that turn pixels into decisions.",
  },
  {
    n: "03",
    title: "Performance First",
    body: "Code-splitting, GPU-friendly motion, and ruthless asset discipline. Every millisecond and kilobyte is a design decision, not an afterthought.",
  },
];

/**
 * Ethos — scroll-triggered masked text + principle cards.
 */
export default function About() {
  const scope = useScrollReveal();

  return (
    <section
      ref={scope}
      id="about"
      className="relative border-t border-white/10 px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40">
          [ 02 // Ethos ]
        </p>

        <h2
          data-reveal-lines
          className="max-w-5xl font-display text-[clamp(1.8rem,4.5vw,4rem)] font-bold leading-[1.12] tracking-tight text-paper"
        >
          I believe the most interesting products live at the intersection of
          software architecture and applied machine intelligence — where a
          camera can count inventory, and a model can tutor a learner.
        </h2>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <article
              key={p.n}
              data-reveal-card
              data-cursor="read"
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition-colors duration-500 hover:border-ember/40"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "rgba(232,255,77,0.15)" }}
              />
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl font-extrabold text-ember/20 transition-colors duration-500 group-hover:text-ember/60">
                  {p.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/30">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-8 font-display text-xl font-bold text-paper">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/55">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
