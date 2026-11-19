"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Ids of the page regions that become inert while a modal layer is open. */
const BACKGROUND_IDS = ["site-header-bar", "contenido", "site-footer"];

/**
 * Shared behavior for full-screen layers (contact overlay, mobile menu):
 * focus moves inside and is trapped there, Escape closes, the page behind becomes inert and
 * stops scrolling, and focus returns to whatever opened the layer.
 */
export function useModal(ref: RefObject<HTMLElement | null>, open: boolean, onClose: () => void, initialFocus?: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const layer = ref.current;
    if (!open || !layer) return;

    const opener = document.activeElement as HTMLElement | null;
    const background = BACKGROUND_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el && !el.contains(layer));
    background.forEach((el) => (el.inert = true));
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    (initialFocus?.current ?? layer.querySelector<HTMLElement>(FOCUSABLE) ?? layer).focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(layer.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      background.forEach((el) => (el.inert = false));
      root.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, [ref, open, onClose, initialFocus]);
}
