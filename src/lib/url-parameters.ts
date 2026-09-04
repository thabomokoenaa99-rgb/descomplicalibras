const HTTP_PROTOCOLS = new Set(["http:", "https:"]);

/**
 * Copies every parameter from `sourceSearch` to `href` without replacing
 * parameters that are already defined by the destination.
 */
export function mergeUrlSearchParams(
  href: string,
  sourceSearch: string,
  baseHref = "http://localhost/",
) {
  if (!sourceSearch || href.startsWith("#")) return href;

  let destination: URL;
  try {
    destination = new URL(href, baseHref);
  } catch {
    return href;
  }

  if (!HTTP_PROTOCOLS.has(destination.protocol)) return href;

  const sourceParams = new URLSearchParams(sourceSearch);
  const destinationKeys = new Set(destination.searchParams.keys());
  sourceParams.forEach((value, key) => {
    if (!destinationKeys.has(key)) {
      destination.searchParams.append(key, value);
    }
  });

  if (/^https?:\/\//i.test(href)) return destination.toString();
  if (href.startsWith("//")) {
    return `//${destination.host}${destination.pathname}${destination.search}${destination.hash}`;
  }

  return `${destination.pathname}${destination.search}${destination.hash}`;
}

export function urlWithCurrentSearchParams(href: string) {
  if (typeof window === "undefined") return href;
  return mergeUrlSearchParams(href, window.location.search, window.location.href);
}
