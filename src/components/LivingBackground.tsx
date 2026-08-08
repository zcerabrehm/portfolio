import { motion } from "framer-motion";

type Variant = "hero" | "slate" | "black" | "carbon" | "ink" | "void";

interface Props {
  variant?: Variant;
}

const orbs: Record<
  Variant,
  { color: string; size: string; x: string; y: string; delay: number; duration: number }[]
> = {
  hero: [
    {
      color: "rgba(204,255,0,0.18)",
      size: "55vw",
      x: "8%",
      y: "12%",
      delay: 0,
      duration: 16,
    },
    {
      color: "rgba(204,255,0,0.08)",
      size: "42vw",
      x: "72%",
      y: "68%",
      delay: -5,
      duration: 20,
    },
  ],
  slate: [
    {
      color: "rgba(255,255,255,0.06)",
      size: "48vw",
      x: "70%",
      y: "15%",
      delay: 0,
      duration: 18,
    },
    {
      color: "rgba(204,255,0,0.1)",
      size: "40vw",
      x: "12%",
      y: "75%",
      delay: -4,
      duration: 22,
    },
    {
      color: "rgba(120,140,255,0.06)",
      size: "30vw",
      x: "50%",
      y: "45%",
      delay: -8,
      duration: 15,
    },
  ],
  black: [
    {
      color: "rgba(204,255,0,0.12)",
      size: "50vw",
      x: "50%",
      y: "0%",
      delay: 0,
      duration: 17,
    },
    {
      color: "rgba(255,255,255,0.04)",
      size: "35vw",
      x: "90%",
      y: "90%",
      delay: -6,
      duration: 21,
    },
  ],
  carbon: [
    {
      color: "rgba(204,255,0,0.09)",
      size: "45vw",
      x: "5%",
      y: "40%",
      delay: 0,
      duration: 19,
    },
    {
      color: "rgba(255,255,255,0.05)",
      size: "38vw",
      x: "85%",
      y: "25%",
      delay: -7,
      duration: 16,
    },
  ],
  ink: [
    {
      color: "rgba(204,255,0,0.16)",
      size: "55vw",
      x: "50%",
      y: "55%",
      delay: 0,
      duration: 14,
    },
    {
      color: "rgba(204,255,0,0.06)",
      size: "70vw",
      x: "50%",
      y: "100%",
      delay: -3,
      duration: 20,
    },
  ],
  void: [
    {
      color: "rgba(255,255,255,0.04)",
      size: "40vw",
      x: "80%",
      y: "20%",
      delay: 0,
      duration: 18,
    },
    {
      color: "rgba(204,255,0,0.07)",
      size: "32vw",
      x: "15%",
      y: "70%",
      delay: -5,
      duration: 22,
    },
  ],
};

export default function LivingBackground({ variant = "void" }: Props) {
  const blobs = orbs[variant] ?? orbs.void;

  return (
    <div className="living-bg" aria-hidden="true">
      <div className={`living-bg__base living-bg__base--${variant}`} />

      {blobs.map((b, i) => (
        <motion.div
          key={`${variant}-${i}`}
          className="living-bg__orb"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            marginLeft: `calc(${b.size} / -2)`,
            marginTop: `calc(${b.size} / -2)`,
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -35, 25, -15, 0],
            scale: [1, 1.12, 0.94, 1.08, 1],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className={`living-bg__grid living-bg__grid--${variant}`} />
      <div className="living-bg__drift" />
      <div className="living-bg__scan" />
      <div className="living-bg__shine" />
    </div>
  );
}
