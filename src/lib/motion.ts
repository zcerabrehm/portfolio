import type { Variants, Transition } from "framer-motion";

export const easeOutExpo: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 + i * 0.08,
      duration: 0.85,
      ease: easeOutExpo,
    },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.75, ease: easeOutExpo },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -64 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 64 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 56 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

export const cardIn: Variants = {
  hidden: { opacity: 0, y: 64, scale: 0.94, rotateX: 8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(12% 12% 12% 12%)", opacity: 0 },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 1.05, ease: easeOutExpo },
  },
};

export const lineGrow: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -4% 0px",
} as const;

export const viewportReplay = {
  once: false,
  amount: 0.35,
} as const;
