/**
 * Single source of truth for contact data (CLAUDE.md §7).
 * Confirmed by the user: D6 (WhatsApp), D7 (email), D11 (Instagram), D17 (pre-filled text).
 */

const whatsappNumber = "59179559006";
const whatsappMessage = "Hola, quiero más información sobre DigitalHouse Growth Studio.";
const email = "digitalhouse.gs@gmail.com";
const instagramHandle = "digitalhouse.gs";

export const contact = {
  phoneDisplay: "+591 79559006",
  phoneE164: `+${whatsappNumber}`,
  whatsappNumber,
  whatsappMessage,
  whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  email,
  mailto: `mailto:${email}`,
  instagramHandle,
  instagramLabel: `@${instagramHandle}`,
  instagramUrl: `https://www.instagram.com/${instagramHandle}/`,
} as const;
