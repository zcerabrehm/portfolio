import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function App() {
  // --- 1. MOUSE SPOTLIGHT TRACKING ---
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // --- 2. LIVE CLOCK TELEMETRY ---
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#070707] text-[#f3f3f3] font-sans overflow-hidden flex flex-col justify-between selection:bg-white selection:text-black">
      {/* ========================================== */}
      {/* 1. FONTS & GLASS HUD STYLING               */}
      {/* ========================================== */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        .font-primary {
          font-family: 'Neue Machina', 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .font-accent {
          font-family: 'GalleryModern', 'Instrument Serif', 'Playfair Display', serif;
        }
        .font-mono-tech {
          font-family: 'JetBrains Mono', monospace;
        }

        .glass-hud {
          background: rgba(18, 18, 18, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .glass-card-hover {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-card-hover:hover {
          border-color: rgba(255, 255, 255, 0.35);
          box-shadow: 0 0 30px -5px rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
        }
      `,
        }}
      />

      {/* ========================================== */}
      {/* 2. BACKGROUND: 3-BLOB CHROME LAVA + MOUSE  */}
      {/* ========================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {/* Interactive Mouse X-Ray Spotlight */}
        <motion.div
          className="absolute -top-64 -left-64 h-[550px] w-[550px] rounded-full bg-gradient-to-r from-white/20 via-neutral-300/15 to-transparent blur-[100px] z-10"
          style={{ x: smoothX, y: smoothY }}
        />

        {/* Lava Lamp Blob 1: High-Contrast Chrome Wax */}
        <motion.div
          className="absolute top-[10%] left-[10%] h-[550px] w-[550px] md:h-[700px] md:w-[700px] rounded-full bg-gradient-to-tr from-white/25 via-neutral-400/20 to-transparent blur-[110px]"
          animate={{
            x: ["0%", "45%", "15%", "-20%", "0%"],
            y: ["0%", "-15%", "30%", "15%", "0%"],
            scale: [1, 1.2, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Lava Lamp Blob 2: Mercury Drift */}
        <motion.div
          className="absolute top-[25%] right-[10%] h-[500px] w-[500px] md:h-[650px] md:w-[650px] rounded-full bg-gradient-to-bl from-neutral-200/25 via-neutral-500/25 to-transparent blur-[120px]"
          animate={{
            x: ["0%", "-45%", "-10%", "25%", "0%"],
            y: ["0%", "25%", "-25%", "-10%", "0%"],
            scale: [1, 0.85, 1.25, 0.95, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Lava Lamp Blob 3: Center Core Sheen */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[750px] rounded-full bg-gradient-to-r from-neutral-300/20 via-white/10 to-neutral-500/20 blur-[130px]"
          animate={{
            scale: [1, 1.35, 0.9, 1],
            opacity: [0.6, 1, 0.7, 0.6],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Editorial Geometric Crosshairs (HUD Framing) */}
      <div className="pointer-events-none absolute inset-8 md:inset-16 lg:inset-24 flex justify-between items-between z-10 opacity-25">
        <div className="absolute top-0 left-0 font-mono-tech text-xs">+</div>
        <div className="absolute top-0 right-0 font-mono-tech text-xs">+</div>
        <div className="absolute bottom-0 left-0 font-mono-tech text-xs">+</div>
        <div className="absolute bottom-0 right-0 font-mono-tech text-xs">
          +
        </div>
      </div>

      {/* Crisp Editorial Film Grain Overlay (6% Opacity) */}
      <div
        className="pointer-events-none fixed inset-0 z-10 h-full w-full opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ========================================== */}
      {/* 3. HEADER / NAVIGATION                     */}
      {/* ========================================== */}
      <header className="w-full px-8 md:px-16 lg:px-24 pt-8 md:pt-10 flex items-center justify-between z-20">
        {/* Left: ALEN.DEV Logo Only */}
        <a
          href="/"
          className="font-primary text-sm md:text-base font-bold tracking-widest uppercase text-white hover:opacity-80 transition-opacity"
        >
          ALEN<span className="text-neutral-500">.</span>DEV
        </a>

        {/* Right: Live Time & Status Pill */}
        <div className="flex items-center gap-3">
          {/* Live Telemetry Time Pill */}
          <div className="hidden sm:flex items-center px-4 py-1.5 rounded-full glass-hud text-xs font-mono-tech tracking-wider text-neutral-300">
            <span>{time || "00:00:00"}</span>
          </div>

          {/* Cooking Status Badge */}
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-hud text-xs font-mono-tech tracking-wider text-neutral-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            COOKING IN PROGRESS
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* 4. HERO SECTION (TIGHTENED & BALANCED)     */}
      {/* ========================================== */}
      <main className="w-full px-8 md:px-16 lg:px-24 py-8 md:py-16 my-auto flex flex-col justify-center max-w-7xl mx-auto z-20 font-primary">
        {/* Top Editorial Index Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 font-mono-tech text-xs md:text-sm tracking-widest text-neutral-400 mb-4 md:mb-6 uppercase"
        >
          <span>[ 01 // WORK IN PROGRESS ]</span>
          <span className="h-px w-10 bg-white/20 hidden sm:inline-block" />
        </motion.div>

        {/* Stacked Heading & Vertically Centered Copy */}
        <div className="flex flex-col">
          {/* Line 1: WORK IN */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tight uppercase leading-none text-white select-none"
          >
            WORK IN
          </motion.h1>

          {/* Line 2: progress. + Vertically Centered Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
          >
            {/* Left Column: progress. (Tighter top margin tuck: -mt-4 sm:-mt-8 md:-mt-10) */}
            <div className="lg:col-span-6 xl:col-span-7">
              <span className="font-accent italic text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] xl:text-[10.5rem] tracking-normal lowercase leading-[1.05] px-6 -mx-6 pb-6 -mb-6 sm:px-8 sm:-mx-8 sm:pb-8 sm:-mb-8 bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent block -mt-4 sm:-mt-8 md:-mt-10 select-none">
                progress.
              </span>
            </div>

            {/* Right Column: Original Copy & Stack Card */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center gap-5 max-w-md my-auto">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-neutral-300 font-normal">
                Currently brewing coffee, building a wordpress site, automating
                leads and pipeline triggers, and polishing pixels behind the
                scenes. The full experience is dropping soon, but you don't have
                to wait to say hello :)
              </p>

              {/* Glassmorphic Automation & CMS Stack Card */}
              <div className="p-4 rounded-2xl glass-hud glass-card-hover group cursor-default">
                <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-400 mb-2">
                  <span className="tracking-wider">
                    WHAT I DO RIGHT NOW: CORE AUTOMATION & CMS STACK
                  </span>
                  <span className="text-white opacity-60 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300">
                    ✦
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-200 leading-relaxed">
                  GoHighLevel • CRM Automation • WordPress • Shopify • Wix •
                  WooCommerce • More Info soon.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons (Closer to text block: mt-6 md:mt-8) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap items-center gap-4 mt-6 md:mt-8"
        >
          {/* Primary Button */}
          <a
            href="mailto:alenguiwan@gmail.com"
            className="px-8 py-4 rounded-full bg-white text-black font-medium text-sm md:text-base tracking-wide transition-all duration-300 hover:bg-neutral-200 hover:-translate-y-0.5 shadow-xl shadow-white/10"
          >
            Get in Touch
          </a>

          {/* Secondary Button */}
          <a
            href="sms:+639213041571"
            className="px-8 py-4 rounded-full glass-hud hover:border-white/40 text-white font-medium text-sm md:text-base tracking-wide transition-all duration-300 hover:bg-white/10"
          >
            Direct SMS ↗
          </a>
        </motion.div>
      </main>

      {/* ========================================== */}
      {/* 5. EDITORIAL FOOTER                        */}
      {/* ========================================== */}
      <footer className="w-full px-8 md:px-16 lg:px-24 pb-8 md:pb-10 z-20 flex flex-col gap-8">
        {/* Rotating Circular Stamp Badge */}
        <div className="flex justify-center items-center relative my-2">
          <motion.div
            className="relative flex items-center justify-center w-28 h-28 md:w-32 md:h-32 select-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 100 100"
            >
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="transparent"
              />
              <text className="font-mono-tech text-[10.5px] uppercase tracking-[0.22em] fill-neutral-400">
                <textPath xlinkHref="#circlePath">
                  LAUNCHING SOON • PORTFOLIO 2026 •
                </textPath>
              </text>
            </svg>
          </motion.div>

          <div className="absolute text-white text-base pointer-events-none select-none">
            ✦
          </div>
        </div>

        {/* Bottom Horizontal Line */}
        <div className="w-full h-px bg-white/10" />

        {/* Footer: Left Copyright & Right All Rights Reserved */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech tracking-wider text-neutral-500 uppercase">
          <span>© 2026 ALEN GUIWAN</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </footer>
    </div>
  );
}
