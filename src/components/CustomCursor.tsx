import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE =
  "a, button, [data-magnetic], [data-cursor], input, textarea, [role='button']";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [pressed, setPressed] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const ringX = useSpring(mx, { damping: 28, stiffness: 340, mass: 0.55 });
  const ringY = useSpring(my, { damping: 28, stiffness: 340, mass: 0.55 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFinePointer(mq.matches);
    if (!mq.matches) return undefined;

    document.body.classList.add("custom-cursor-active");
    let hasMoved = false;

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!hasMoved) {
        hasMoved = true;
        setVisible(true);
      }
    };

    const leave = () => setVisible(false);
    const enter = () => {
      if (hasMoved) setVisible(true);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const el = t?.closest?.(INTERACTIVE) as HTMLElement | null;
      setLabel(el?.getAttribute?.("data-cursor") ?? "");
      setHovering(!!el);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseover", over);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseover", over);
    };
  }, [mx, my]);

  if (!finePointer) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-signal will-change-transform"
        style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.35 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-white/55 will-change-transform"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 92 : 42,
          height: hovering ? 92 : 42,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.82 : 1,
          backgroundColor: hovering
            ? "rgba(204,255,0,0.14)"
            : "rgba(204,255,0,0)",
          borderColor: hovering
            ? "rgba(204,255,0,0.55)"
            : "rgba(255,255,255,0.55)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
      >
        {hovering && label ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-[72%] truncate text-center font-mono text-[9px] uppercase tracking-widest text-chalk"
          >
            {label}
          </motion.span>
        ) : null}
      </motion.div>
    </div>
  );
}
