import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { loadTechStack } from "../lib/loadProjects";
import { useReveal } from "../hooks/useReveal";

/**
 * Dual-direction infinite marquee arsenal.
 */
export default function TechStack() {
  const [tech, setTech] = useState([]);
  const { ref, visible } = useReveal(0.12);

  useEffect(() => {
    let alive = true;
    loadTechStack().then((data) => {
      if (alive) setTech(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  const rowA = useMemo(() => [...tech, ...tech], [tech]);
  const rowB = useMemo(() => {
    const rev = [...tech].reverse();
    return [...rev, ...rev];
  }, [tech]);

  if (tech.length === 0) {
    return (
      <section
        id="arsenal"
        className="border-t border-white/10 px-6 py-28 md:px-12"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40">
          [ 04 // Technical Arsenal ]
        </p>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="arsenal"
      className="relative overflow-hidden border-t border-white/10 py-28"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40">
              [ 04 // Technical Arsenal ]
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.95] tracking-mega text-paper">
              What I build
              <span
                className="block text-transparent"
                style={{ WebkitTextStroke: "1px rgba(243,243,240,0.4)" }}
              >
                with daily
              </span>
            </h2>
          </div>
          <p className="max-w-xs font-mono text-xs uppercase tracking-widest text-paper/40">
            React · Node · Laravel · Cloud · Python · LLMs — production-tested
          </p>
        </div>
      </div>

      <div
        className={`transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex overflow-hidden border-y border-white/5 py-6">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {rowA.map((t, i) => (
              <MarqueeItem key={`a-${i}`} item={t} />
            ))}
          </div>
          <div
            className="flex shrink-0 animate-marquee items-center gap-10 pr-10"
            aria-hidden="true"
          >
            {rowA.map((t, i) => (
              <MarqueeItem key={`a2-${i}`} item={t} />
            ))}
          </div>
        </div>

        <div className="mt-2 flex overflow-hidden border-b border-white/5 py-6">
          <div className="flex shrink-0 animate-marquee-reverse items-center gap-10 pr-10 opacity-45">
            {rowB.map((t, i) => (
              <MarqueeItem key={`b-${i}`} item={t} />
            ))}
          </div>
          <div
            className="flex shrink-0 animate-marquee-reverse items-center gap-10 pr-10 opacity-45"
            aria-hidden="true"
          >
            {rowB.map((t, i) => (
              <MarqueeItem key={`b2-${i}`} item={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeItem({ item }) {
  return (
    <span
      data-cursor="stack"
      className="group flex shrink-0 items-center gap-5 whitespace-nowrap"
    >
      <span className="font-display text-[clamp(1.5rem,3.8vw,3rem)] font-bold uppercase tracking-tight text-paper/65 transition-colors duration-300 group-hover:text-ember">
        {item.name}
      </span>
      <span className="text-xl text-ember/45 transition-colors group-hover:text-ember">
        {item.icon}
      </span>
      <span className="text-paper/15">/</span>
    </span>
  );
}

MarqueeItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
};
