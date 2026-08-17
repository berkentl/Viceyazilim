import Image, { getImageProps } from "next/image";
import type { ArtworkTone, Reference } from "@/lib/references";

/**
 * One project banner, framed the way Apple frames a product card: a single
 * rounded surface, the work inside it, and the copy set in live type.
 *
 * Two card shapes, chosen per project by `reference.mobile.kind`:
 *
 *   artwork — the same photograph in two crops. A `<picture>` swaps between
 *             them at the breakpoint, so exactly one file is ever fetched.
 *
 *   stacked — the wide photograph on desktop, and on a phone a flat surface
 *             carrying the copy with the image beneath it. Structurally
 *             different enough that the two are separate elements swapped by
 *             CSS; that costs one extra image fetch on this card, which is the
 *             price of neither width being a compromise.
 *
 * All motion is applied to the whole card, never to the artwork inside it: a
 * parallax or hover zoom means scaling an image past its frame, which would
 * crop the composition the artwork was built around.
 */

/** Type colours. The copy always sits on a surface, so it takes the opposite. */
const TONE = {
  light: {
    heading: "text-[#1d1d1f]",
    body: "text-[#1d1d1f]/70",
    label: "text-[#1d1d1f]/55",
    button: "bg-[#1d1d1f] text-white",
    logo: { src: "/brand/lockup-black.png", width: 4000, height: 2068 },
  },
  dark: {
    heading: "text-white",
    body: "text-white/75",
    label: "text-white/60",
    button: "bg-white text-[#1d1d1f]",
    logo: { src: "/brand/lockup-white.png", width: 2400, height: 1210 },
  },
} as const;

/**
 * `md:` variants are written out rather than composed at runtime — Tailwind
 * only generates classes it can find as literal strings in the source.
 */
const TONE_MD = {
  light: {
    heading: "md:text-[#1d1d1f]",
    body: "md:text-[#1d1d1f]/70",
    label: "md:text-[#1d1d1f]/55",
    button: "md:bg-[#1d1d1f] md:text-white",
  },
  dark: {
    heading: "md:text-white",
    body: "md:text-white/75",
    label: "md:text-white/60",
    button: "md:bg-white md:text-[#1d1d1f]",
  },
} as const;

const FRAME =
  "relative overflow-hidden rounded-[22px] shadow-[0_10px_40px_-16px_rgba(0,0,0,0.5)] ring-1 ring-hairline transition-shadow duration-500 ease-out group-hover:shadow-[0_28px_70px_-20px_rgba(0,0,0,0.65)] md:rounded-[28px]";
const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

export function ReferenceBanner({
  reference,
  preload = false,
}: {
  reference: Reference;
  preload?: boolean;
}) {
  const href = reference.liveUrl ?? `/referanslar/${reference.slug}`;
  const isExternal = Boolean(reference.liveUrl);

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group block rounded-[22px] outline-none focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-4 focus-visible:ring-offset-bg md:rounded-[28px]"
    >
      <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-1">
        {reference.mobile.kind === "artwork" ? (
          <ArtworkCard reference={reference} preload={preload} />
        ) : (
          <>
            <div className="md:hidden">
              <StackedCard reference={reference} preload={preload} />
            </div>
            <div className="hidden md:block">
              <WideCard reference={reference} preload={preload} />
            </div>
          </>
        )}
      </div>
    </a>
  );
}

/**
 * One photograph in two crops. `<picture>` picks the crop per breakpoint so
 * only the one that will be shown is ever downloaded.
 */
function ArtworkCard({ reference, preload }: { reference: Reference; preload: boolean }) {
  const { wide, mobile } = reference;
  if (mobile.kind !== "artwork") return null;

  // No `preload` here: with a <picture>, preloading forces *both* sources to
  // download. fetchPriority is the documented way to prioritise the one the
  // browser actually picks.
  const common = { alt: reference.imageAlt, sizes: "(min-width: 768px) 92vw, 100vw" };
  const {
    props: { srcSet: wideSrcSet },
  } = getImageProps({ ...common, ...wide });
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({ ...common, ...mobile });

  return (
    // The phone ratio comes from the crop itself, via a custom property: an
    // inline `aspect-ratio` would win over any breakpoint class, leaving the
    // card stuck at portrait height on desktop.
    <div
      className={`${FRAME} aspect-[var(--crop-aspect)] bg-bg-elevated md:aspect-[264/100]`}
      style={{ "--crop-aspect": `${mobile.width}/${mobile.height}` } as React.CSSProperties}
    >
      <picture className="block h-full w-full">
        <source media="(min-width: 768px)" srcSet={wideSrcSet} />
        <source srcSet={mobileSrcSet} />
        <img
          {...imgProps}
          alt={reference.imageAlt}
          fetchPriority={preload ? "high" : undefined}
          className="h-full w-full object-cover"
        />
      </picture>

      <Logo tone={wide.tone} mobileTone={mobile.tone} />
      <Copy
        reference={reference}
        tone={mobile.tone}
        desktopTone={wide.tone}
        className="absolute inset-x-0 top-0 px-6 pt-[4.75rem] md:inset-y-0 md:right-auto md:w-[46%] md:justify-center md:px-12 md:pt-0 lg:px-16"
      />
    </div>
  );
}

/** Wide-only card, used at `md` and up for every project with a stacked phone card. */
function WideCard({ reference, preload }: { reference: Reference; preload: boolean }) {
  const { wide } = reference;

  return (
    <div className={`${FRAME} aspect-[264/100] bg-bg-elevated`}>
      <ViewportImage
        source={wide}
        alt={reference.imageAlt}
        sizes="92vw"
        media="(min-width: 768px)"
        prioritize={preload}
        className="h-full w-full object-cover"
      />
      <Logo tone={wide.tone} />
      <Copy
        reference={reference}
        tone={wide.tone}
        className="absolute inset-y-0 left-0 w-[46%] justify-center px-12 lg:px-16"
      />
    </div>
  );
}

/**
 * Phone-width card whose surface is drawn rather than photographed: the copy
 * gets flat, predictable ground at the top and the image sits below it. That
 * removes the need to either veil the artwork or crop it to make room for
 * type — the two simply do not overlap.
 */
function StackedCard({ reference, preload }: { reference: Reference; preload: boolean }) {
  const { mobile } = reference;
  if (mobile.kind !== "stacked") return null;

  return (
    <div className={`${FRAME} flex flex-col`} style={{ background: mobile.surface }}>
      <Logo tone={mobile.tone} />
      <Copy reference={reference} tone={mobile.tone} className="px-6 pb-8 pt-[4.75rem]" />
      <ViewportImage
        source={mobile}
        alt={reference.imageAlt}
        sizes="(min-width: 768px) 0px, 100vw"
        media="(max-width: 767px)"
        prioritize={preload}
        className={
          mobile.fit === "inset"
            ? "mx-auto mt-auto w-[72%] max-w-[280px] drop-shadow-[0_24px_50px_rgba(0,0,0,0.28)]"
            : "mt-auto w-full"
        }
      />
    </div>
  );
}

function ViewportImage({
  source,
  alt,
  sizes,
  media,
  prioritize,
  className,
}: {
  source: { src: string; width: number; height: number };
  alt: string;
  sizes: string;
  media: string;
  prioritize: boolean;
  className: string;
}) {
  const {
    props: { srcSet, ...imageProps },
  } = getImageProps({
    ...source,
    alt,
    sizes,
    loading: prioritize ? "eager" : "lazy",
    fetchPriority: prioritize ? "high" : undefined,
  });

  return (
    <picture className="contents">
      <source media={media} srcSet={srcSet} sizes={sizes} />
      <img
        {...imageProps}
        src={TRANSPARENT_PIXEL}
        srcSet={undefined}
        alt={alt}
        className={className}
      />
    </picture>
  );
}

function Logo({ tone, mobileTone }: { tone: ArtworkTone; mobileTone?: ArtworkTone }) {
  const desktop = TONE[tone].logo;
  const phone = TONE[mobileTone ?? tone].logo;
  const sameAsset = desktop.src === phone.src;

  return (
    <>
      <Image
        src={phone.src}
        width={phone.width}
        height={phone.height}
        alt=""
        aria-hidden="true"
        className={`absolute left-5 top-5 z-10 h-7 w-auto ${
          sameAsset ? "md:left-12 md:top-10 md:h-[38px] lg:left-16 lg:h-[44px]" : "md:hidden"
        }`}
      />
      {!sameAsset && (
        <Image
          src={desktop.src}
          width={desktop.width}
          height={desktop.height}
          alt=""
          aria-hidden="true"
          className="absolute left-12 top-10 z-10 hidden h-[38px] w-auto md:block lg:left-16 lg:h-[44px]"
        />
      )}
    </>
  );
}

/**
 * The words. `tone` styles it at phone width, `desktopTone` takes over from
 * `md` up when the surface underneath changes colour between the two crops.
 */
function Copy({
  reference,
  tone,
  desktopTone,
  className = "",
}: {
  reference: Reference;
  tone: ArtworkTone;
  desktopTone?: ArtworkTone;
  className?: string;
}) {
  const at = (key: "heading" | "body" | "label" | "button") =>
    desktopTone && desktopTone !== tone
      ? `${TONE[tone][key]} ${TONE_MD[desktopTone][key]}`
      : TONE[tone][key];

  return (
    <div className={`z-10 flex flex-col items-start ${className}`}>
      <span className={`text-[12px] font-medium uppercase tracking-[0.14em] ${at("label")}`}>
        {reference.client}
      </span>

      <h3
        className={`mt-3 max-w-[15ch] text-[clamp(1.55rem,3.1vw,2.6rem)] font-bold leading-[1.08] tracking-[-0.03em] ${at("heading")}`}
      >
        {reference.headline}
      </h3>

      <p className={`mt-4 max-w-[38ch] text-[15px] leading-relaxed ${at("body")}`}>
        {reference.body}
      </p>

      <span className={`mt-4 text-[13px] ${at("label")}`}>{reference.discipline}</span>
      <span className={`mt-1 text-[13px] ${at("label")}`}>{reference.stack}</span>

      {/* A span, not a button: the whole card is already the link, and nesting
          an interactive element inside an anchor is invalid. */}
      <span
        className={`mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium transition-transform duration-200 ease-out group-active:scale-[0.97] ${at("button")}`}
      >
        Projeyi İncele
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
          <path
            d="M3.5 8h9M9 4.5L12.5 8 9 11.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
