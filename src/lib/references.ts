/**
 * The reference portfolio, as data.
 *
 * The artwork carries only the visual — product photography, a device, a site
 * mockup. Every word is rendered from here as live text in the site's own
 * typeface, so it stays selectable, searchable, readable by screen readers,
 * and reflows on a phone instead of being frozen into an image.
 *
 * ── ADDING A PROJECT ────────────────────────────────────────────────────
 * Drop the artwork into `public/referanslar/`, then add an entry below.
 * Array order is display order.
 *
 *   wide    3200×1212, ratio 2.64:1. Leave the left ~45% clear; the copy is
 *           laid over it.
 *
 *   mobile  Pick the treatment that suits the crop you have:
 *
 *           "artwork" — the portrait fills the card and the copy sits on it.
 *                       Needs a genuinely clear zone across its top third.
 *
 *           "stacked" — the card supplies a flat surface, the copy sits on
 *                       that, and the image sits below it. Use when the crop
 *                       has no clear zone (`fit: "bleed"`, and set `surface`
 *                       to the crop's own background colour so the two meet
 *                       invisibly) or when the image is a cut-out device on
 *                       transparency (`fit: "inset"`).
 *
 * `tone` says how the surface under the copy reads, so the type can take the
 * opposite and stay legible.
 */

export type ArtworkTone = "light" | "dark";

export type MobileTreatment =
  | { kind: "artwork"; src: string; width: number; height: number; tone: ArtworkTone }
  | {
      kind: "stacked";
      src: string;
      width: number;
      height: number;
      /** Any CSS background value; applied to the whole card. */
      surface: string;
      tone: ArtworkTone;
      /** "bleed" = full-width image at the bottom. "inset" = centred cut-out. */
      fit: "bleed" | "inset";
    };

export type Reference = {
  slug: string;
  client: string;
  headline: string;
  body: string;
  discipline: string;
  /**
   * What the live site is actually built with. Verified against the running
   * site — never inferred, since it is a public technical claim about a
   * client's product.
   */
  stack: string;
  liveUrl: string | null;
  wide: { src: string; width: number; height: number; tone: ArtworkTone };
  mobile: MobileTreatment;
  /** Describes the artwork itself, for readers who cannot see it. */
  imageAlt: string;
};

/** Apple-style brushed silver, used behind cut-out devices. */
const SILVER_SURFACE =
  "linear-gradient(170deg,#fcfcfd 0%,#f1f1f4 42%,#e4e5e9 100%)";

export const REFERENCES: Reference[] = [
  {
    slug: "dunyanin-cicegi",
    client: "Dünyanın Çiçeği",
    headline: "Zarif bir çiçek alışveriş deneyimi.",
    body: "Premium çiçekçilik markası için sade, duygusal ve dönüşüm odaklı bir e-ticaret deneyimi.",
    discipline: "E-Ticaret / UI Tasarım / Geliştirme",
    stack: "Next.js · Tailwind CSS · Supabase",
    liveUrl: "https://dunyanincicegi.com",
    wide: {
      src: "/referanslar/dunyanin-cicegi-wide.png",
      width: 3200,
      height: 1212,
      tone: "light",
    },
    mobile: {
      kind: "stacked",
      src: "/referanslar/dunyanin-cicegi-portrait.png",
      width: 1122,
      height: 1402,
      // Sampled from the crop's own top edge, so the card surface and the
      // photograph meet without a visible seam.
      surface: "#efcdaa",
      tone: "light",
      fit: "bleed",
    },
    imageAlt:
      "Krem zemin üzerinde taş vazoda şakayık düzenlemesi ve yanında Dünyanın Çiçeği e-ticaret sitesinin ekran görüntüsü.",
  },
  {
    slug: "aura-gym-ankara",
    client: "Aura GYM Ankara",
    headline: "Gücü hissettiren bir spor deneyimi.",
    body: "Ankara'nın premium spor salonu için üyeliğe yönlendiren, güçlü bir görsel kimliğe sahip web sitesi.",
    discipline: "Web Tasarım / UI & UX / Geliştirme",
    stack: "Astro · Tailwind CSS · GSAP",
    liveUrl: "https://auragymankara.com",
    wide: {
      src: "/referanslar/aura-gym-ankara-wide.png",
      width: 3200,
      height: 1212,
      tone: "light",
    },
    mobile: {
      kind: "stacked",
      src: "/referanslar/aura-gym-ankara-device.png",
      width: 1024,
      height: 1536,
      surface: SILVER_SURFACE,
      tone: "light",
      fit: "inset",
    },
    imageAlt:
      "Aura GYM Ankara web sitesinin dizüstü bilgisayar ve telefon ekranındaki görünümü.",
  },
  {
    slug: "bali-sapanca-bungalov",
    client: "Bali Sapanca Bungalov",
    headline: "Doğanın kalbinde prestijli konaklama.",
    body: "Sapanca'da özel havuzlu bungalov konaklaması için rezervasyona yönlendiren bir web deneyimi.",
    discipline: "Web Tasarım / UI & UX / Geliştirme",
    stack: "React · React Router · Tailwind CSS",
    liveUrl: "https://balisapancabungalov.com",
    wide: {
      src: "/referanslar/bali-sapanca-bungalov-wide.png",
      width: 3200,
      height: 1212,
      tone: "light",
    },
    mobile: {
      kind: "stacked",
      src: "/referanslar/bali-sapanca-bungalov-portrait.png",
      width: 1122,
      height: 1402,
      // Identical to the crop's own top edge, so the empty upper half of the
      // photograph simply continues the card and reads as breathing room.
      surface: "#f0ebe3",
      tone: "light",
      fit: "bleed",
    },
    imageAlt:
      "Kırık beyaz zeminde podyum üzerinde Bali Sapanca Bungalov web sitesinin telefon ve dizüstü bilgisayardaki görünümü.",
  },
];

/** The homepage shows a subset; /referanslar shows everything. */
export const FEATURED_REFERENCES = REFERENCES.slice(0, 3);

export function getReference(slug: string): Reference | undefined {
  return REFERENCES.find((reference) => reference.slug === slug);
}
