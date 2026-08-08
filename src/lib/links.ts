export function isExternalHref(href: string | undefined | null): boolean {
  if (!href) return false;
  return /^(https?:|mailto:|tel:)/i.test(href) || href.startsWith("//");
}

export const externalRel = "noopener noreferrer";

export function mailHref(email: string, subject?: string): string {
  const base = `mailto:${email}`;
  if (!subject) return base;
  return `${base}?subject=${encodeURIComponent(subject)}`;
}

/** Open any outside URL (http/mailto/tel) in a new tab/window. */
export function openInNewTab(href: string) {
  const opened = window.open(href, "_blank", "noopener,noreferrer");
  if (opened) {
    opened.opener = null;
    return;
  }
  // Popup blocked — still navigate out of the current page context
  const a = document.createElement("a");
  a.href = href;
  a.target = "_blank";
  a.rel = externalRel;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
