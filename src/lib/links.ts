export function isExternalHref(href: string | undefined | null): boolean {
  if (!href) return false;
  return /^(https?:|mailto:|tel:)/i.test(href) || href.startsWith("//");
}

export const externalRel = "noopener noreferrer";

/**
 * Real HTTPS compose URL so email CTAs open in a new browser tab.
 * (mailto: cannot open a tab — browsers hand it off / navigate the current page.)
 */
export function mailHref(email: string, subject?: string): string {
  const q = new URLSearchParams({
    view: "cm",
    fs: "1",
    tf: "1",
    to: email,
  });
  if (subject) q.set("su", subject);
  return `https://mail.google.com/mail/?${q.toString()}`;
}

/** Native mailto — only for copy/fallback, not primary navigation. */
export function mailtoHref(email: string, subject?: string): string {
  const base = `mailto:${email}`;
  if (!subject) return base;
  return `${base}?subject=${encodeURIComponent(subject)}`;
}

/**
 * Open outside URLs in a new tab.
 * Do not pass a features string to window.open — some browsers then navigate the current tab.
 */
export function openInNewTab(href: string) {
  if (typeof window === "undefined") return;

  // Prefer a user-gesture window.open with no features string
  const opened = window.open(href, "_blank");
  if (opened) {
    try {
      opened.opener = null;
    } catch {
      /* ignore */
    }
    return;
  }

  // Popup blocked: synthetic anchor with target=_blank only (never same-tab assign)
  const a = document.createElement("a");
  a.href = href;
  a.target = "_blank";
  a.rel = externalRel;
  a.referrerPolicy = "no-referrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
