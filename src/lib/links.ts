export function isExternalHref(href: string | undefined | null): boolean {
  if (!href) return false;
  return /^(https?:|mailto:|tel:)/i.test(href) || href.startsWith("//");
}

export const externalRel = "noopener noreferrer";
