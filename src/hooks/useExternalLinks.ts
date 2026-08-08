import { useEffect } from "react";
import { externalRel, isExternalHref, openInNewTab } from "../lib/links";

/** Force every outside link to open in a new tab (never the current page). */
export function useExternalLinks() {
  useEffect(() => {
    const stamp = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
        const href = a.getAttribute("href");
        if (!isExternalHref(href)) return;
        a.target = "_blank";
        a.rel = externalRel;
        a.setAttribute("data-external", "true");
      });
    };

    stamp();

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) stamp(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const el = (e.target as Element | null)?.closest?.("a[href]");
      if (!(el instanceof HTMLAnchorElement)) return;

      const raw = el.getAttribute("href");
      if (!isExternalHref(raw)) return;

      // Stop same-tab navigation (critical for mailto leftovers + broken handlers)
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function") {
        e.stopImmediatePropagation();
      }

      openInNewTab(el.href);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      mo.disconnect();
      document.removeEventListener("click", onClick, true);
    };
  }, []);
}
