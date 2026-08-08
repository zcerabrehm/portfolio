import { useEffect } from "react";
import { externalRel, isExternalHref } from "../lib/links";

/** Ensure every external / mailto / tel anchor opens in a new tab. */
export function useExternalLinks() {
  useEffect(() => {
    const apply = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
        const href = a.getAttribute("href");
        if (!isExternalHref(href)) return;
        if (a.target !== "_blank") a.target = "_blank";
        const rel = a.getAttribute("rel") ?? "";
        if (!/\bnoopener\b/.test(rel) || !/\bnoreferrer\b/.test(rel)) {
          a.rel = externalRel;
        }
      });
    };

    apply();
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) apply(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);
}
