"use client";

import { useSyncExternalStore } from "react";

/*
 * "Loader finished" signal (two26's loaderComplete event, as a tiny store).
 * The loader plays once per full page load; client-side navigation keeps it done, so later pages
 * start their hero entrance right away.
 */
let done = false;
const listeners = new Set<() => void>();

export function markLoaderDone() {
  if (done) return;
  done = true;
  listeners.forEach((l) => l());
}

export function isLoaderDone() {
  return done;
}

/** Runs `cb` once the loader is done (immediately if it already is). Returns an unsubscribe. */
export function onLoaderDone(cb: () => void): () => void {
  if (done) {
    cb();
    return () => {};
  }
  const l = () => {
    listeners.delete(l);
    cb();
  };
  listeners.add(l);
  return () => listeners.delete(l);
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** React hook: false while the loader is on screen, then true. Always false on the server. */
export function useLoaderDone(): boolean {
  return useSyncExternalStore(subscribe, () => done, () => false);
}
