"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * SSR-safe reduced-motion check. `window.matchMedia` resolves synchronously
 * on the client, so reading it directly during render disagrees with the
 * server's motion-on default for anyone with the OS preference on — React
 * treats that as a hydration mismatch and discards+rebuilds the whole tree.
 * `useSyncExternalStore`'s server snapshot pins the first client render to
 * match the server; it then re-renders once with the real value, and stays
 * subscribed to live OS-level changes afterward.
 */
export function useSafeReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
