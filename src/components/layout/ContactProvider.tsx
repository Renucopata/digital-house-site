"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type ContactState = { isOpen: boolean; open: () => void; close: () => void };

const ContactContext = createContext<ContactState | null>(null);

/** Open/close state of the contact overlay; every "Hablemos" CTA opens it (CLAUDE.md N6). */
export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);
  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}

export function useContact(): ContactState {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used inside <ContactProvider>");
  return ctx;
}
