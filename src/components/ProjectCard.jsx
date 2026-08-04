import { useRef } from "react";
import PropTypes from "prop-types";

/**
 * Case-study card with cursor parallax tilt + image drift.
 */
export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (imgRef.current) {
      imgRef.current.style.transition =
        "transform 0.3s cubic-bezier(0.16,1,0.3,1)";
      imgRef.current.style.transform = `scale(1.1) translate(${x * -20}px, ${
        y * -16
      }px)`;
    }

    card.style.transform = `perspective(1200px) rotateY(${x * 5}deg) rotateX(${
      y * -4
    }deg)`;
  };

  const handleLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = "scale(1.04) translate(0,0)";
    }
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1200px) rotateY(0deg) rotateX(0deg)";
    }
  };

  return (
    <article
      ref={cardRef}
      data-cursor="view"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative h-[52vh] w-[85vw] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 transition-[box-shadow,border-color] duration-500 md:h-[62vh] md:w-[56vw] lg:w-[46vw]"
      style={{
        willChange: "transform",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${project.accent}22 0%, #121214 45%, #070707 100%)`,
        }}
      >
        <img
          ref={imgRef}
          src={project.image}
          alt={`${project.title} — ${project.tagline}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-75"
          style={{ maxWidth: "none", willChange: "transform", transform: "scale(1.04)" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

        {/* Abstract geometry fallback art */}
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div
            className="absolute -right-10 top-10 h-48 w-48 rounded-full blur-2xl"
            style={{ background: project.accent }}
          />
          <div
            className="absolute bottom-20 left-10 h-32 w-32 rotate-45 border border-white/20"
            style={{ borderColor: `${project.accent}55` }}
          />
        </div>
      </div>

      <span className="absolute left-6 top-6 font-display text-[16vw] font-extrabold leading-none text-white/[0.08] transition-colors duration-500 group-hover:text-ember/20 md:text-8xl">
        {project.index}
      </span>

      <div className="absolute right-6 top-6 rounded-full border border-white/15 bg-ink/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-paper/60 backdrop-blur-md">
        {project.year}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-9">
        <div className="max-w-md">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ember">
            {project.role}
          </p>
          <h3 className="font-display text-3xl font-extrabold uppercase leading-none tracking-tight text-paper md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-2 hidden text-sm leading-relaxed text-paper/55 md:block">
            {project.tagline}
          </p>
          {project.metrics ? (
            <div className="mt-4 hidden gap-6 md:flex">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-display text-lg font-bold text-paper">
                    {m.value}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-paper/40">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {project.stack.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/15 bg-ink/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-paper/70 backdrop-blur-md"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${project.accent}55` }}
      />
    </article>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    index: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    accent: PropTypes.string.isRequired,
    stack: PropTypes.arrayOf(PropTypes.string).isRequired,
    metrics: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
  }).isRequired,
};
