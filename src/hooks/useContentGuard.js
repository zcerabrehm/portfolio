import { useEffect } from "react";

/**
 * Light client-side deterrents: no context menu, block common devtools shortcuts.
 * Not a hard security boundary — just raises the bar for casual inspection.
 */
export function useContentGuard() {
  useEffect(() => {
    const onContextMenu = (e) => {
      e.preventDefault();
    };

    const onKeyDown = (e) => {
      const key = e.key?.toLowerCase?.() ?? "";
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;

      // F12
      if (e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl/Cmd + Shift + I / J / C
      if (ctrl && shift && ["i", "j", "c"].includes(key)) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl/Cmd + U (view source)
      if (ctrl && key === "u") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onSelectStart = (e) => {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) {
        return;
      }
      e.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("selectstart", onSelectStart);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("selectstart", onSelectStart);
    };
  }, []);
}
