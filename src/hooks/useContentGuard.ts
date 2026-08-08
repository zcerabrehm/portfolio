import { useEffect } from "react";

/** Soft client-side deterrents for right-click and common inspect shortcuts. */
export function useContentGuard() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key?.toLowerCase?.() ?? "";
      const ctrl = e.ctrlKey || e.metaKey;

      // F12
      if (e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl+Shift+I / J / C
      if (ctrl && e.shiftKey && ["i", "j", "c"].includes(key)) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl+U (view source)
      if (ctrl && key === "u") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);
}
