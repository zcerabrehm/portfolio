import { useState, useEffect } from "react";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import TechStack from "./components/TechStack";
import Footer from "./components/Footer";

/**
 * Single-page immersive portfolio shell.
 * Heavy modules (WebGL, GSAP sections) stay isolated for a light first paint.
 */
export default function App() {
  const { rootRef } = useSmoothScroll();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <div
      ref={rootRef}
      id="app"
      className="relative min-h-screen w-full overflow-x-clip bg-ink text-paper"
    >
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div className="grain-overlay" aria-hidden="true" />

      {!loading && <CustomCursor />}

      <Navbar />

      <main>
        <Hero ready={!loading} />
        <About />
        <div
          className="pointer-events-none mx-auto h-px w-[92%] bg-gradient-to-r from-transparent via-white/15 to-transparent"
          aria-hidden="true"
        />
        <Work />
        <TechStack />
      </main>

      <Footer />
    </div>
  );
}
