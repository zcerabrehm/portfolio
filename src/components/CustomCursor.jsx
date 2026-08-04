import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE =
  "a, button, [data-magnetic], [data-cursor], input, textarea, [role='button']";

/**
 * Dual-layer morphing cursor — fine pointers only.
 */
export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [pressed, setPressed] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const ringX = useSpring(mx, { damping: 28, stiffness: 340, mass: 0.55 });
  const ringY = useSpring(my, { damping: 28, stiffness: 340, mass: 0.55 });

  const dotRef = useRef(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFinePointer(mq.matches);
    if (!mq.matches) return;

    document.body.classList.add("custom-cursor-active");

    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const leave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);

    const over = (e) => {
      const el = e.target.closest(INTERACTIVE);
      const custom = el?.getAttribute("data-cursor");
      setLabel(custom ?? "");
      setHovering(!!el);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseover", over);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseover", over);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!finePointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <motion.div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.35 : 1 }}
        transition={{ duration: 0.15 }}
      />

      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-white/55"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 92 : 42,
          height: hovering ? 92 : 42,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.82 : 1,
          backgroundColor: hovering
            ? "rgba(232,255,77,0.14)"
            : "rgba(232,255,77,0)",
          borderColor: hovering
            ? "rgba(232,255,77,0.55)"
            : "rgba(255,255,255,0.55)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
      >
        {hovering && label ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-[72%] truncate text-center font-mono text-[9px] uppercase tracking-widest text-paper"
          >
            {label}
          </motion.span>
        ) : null}
      </motion.div>
    </div>
  );
}
