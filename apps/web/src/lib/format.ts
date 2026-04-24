export function buildCanonical(baseUrl: string, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl.replace(/\/$/, "")}${normalized === "/" ? "" : normalized}`;
}

export function formatNpr(amount: number): string {
  return new Intl.NumberFormat("en-NP", { maximumFractionDigits: 0 }).format(amount);
}
