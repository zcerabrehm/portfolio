import { useEffect } from "react";
import { externalRel, isExternalHref, openInNewTab } from "../lib/links";

/** Force every outside link (http/https/mailto/tel) to open in a new tab. */
export function useExternalLinks() {
  useEffect(() => {
    const stamp = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
        const href = a.getAttribute("href");
        if (!isExternalHref(href)) return;
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", externalRel);
        a.setAttribute("data-external", "true");
      });
    };

    stamp();

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLAnchorElement) {
            stamp(node.parentNode ?? document);
          } else if (node instanceof HTMLElement) {
            stamp(node);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const el = (e.target as Element | null)?.closest?.("a[href]");
      if (!(el instanceof HTMLAnchorElement)) return;

      const href = el.getAttribute("href");
      if (!isExternalHref(href)) return;

      e.preventDefault();
      e.stopPropagation();
      openInNewTab(el.href);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      mo.disconnect();
      document.removeEventListener("click", onClick, true);
    };
  }, []);
}
