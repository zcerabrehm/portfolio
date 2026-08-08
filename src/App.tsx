import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import CommandPalette from "./components/CommandPalette";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectGrid from "./components/ProjectGrid";
import ProjectModal from "./components/ProjectModal";
import CapabilitiesTable from "./components/CapabilitiesTable";
import CallToAction from "./components/CallToAction";
import FooterTerminal from "./components/FooterTerminal";
import SiteFooter from "./components/SiteFooter";
import CustomCursor from "./components/CustomCursor";
import SectionProgress from "./components/SectionProgress";
import Loader from "./components/Loader";
import { PROJECTS, type Project } from "./data/portfolioData";
import { useCommandPalette } from "./hooks/useCommandPalette";
import { useContentGuard } from "./hooks/useContentGuard";
import { useExternalLinks } from "./hooks/useExternalLinks";
import { playUiTick } from "./lib/uiSound";

function scrollToId(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function App() {
  const [booting, setBooting] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useContentGuard();
  useExternalLinks();

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const openProject = useCallback((projectId: string) => {
    const project = PROJECTS.find((p) => p.id === projectId) ?? null;
    setActiveProject(project);
  }, []);

  const copyEmail = useCallback(
    async (email: string) => {
      try {
        await navigator.clipboard.writeText(email);
        playUiTick("copy");
        showToast("Email copied");
      } catch {
        showToast("Copy failed. Use the mail button instead.");
      }
    },
    [showToast],
  );

  const palette = useCommandPalette({
    onNavigate: scrollToId,
    onOpenProject: openProject,
    onCopyEmail: copyEmail,
  });

  return (
    <div className="relative min-h-screen bg-void text-chalk">
      {booting ? <Loader onDone={() => setBooting(false)} /> : null}

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div className="grain-overlay" aria-hidden="true" />
      <CustomCursor />
      <SectionProgress />

      <div
        className={`relative z-10 transition-opacity duration-500 ${
          booting ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <Navbar onOpenPalette={() => palette.setOpen(true)} />

        <main id="main">
          <Hero />
          <About />
          <ProjectGrid onOpen={setActiveProject} />
          <CapabilitiesTable />
          <CallToAction onCopyEmail={copyEmail} />
        </main>

        <FooterTerminal toast={toast} onCopyEmail={copyEmail} />
        <SiteFooter />
      </div>

      <CommandPalette
        open={palette.open}
        query={palette.query}
        onQueryChange={palette.setQuery}
        results={palette.results}
        activeIndex={palette.activeIndex}
        onActiveIndexChange={palette.setActiveIndex}
        onRun={palette.run}
        onClose={palette.close}
      />

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}
