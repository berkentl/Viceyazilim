"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react";
import Image, { type StaticImageData } from "next/image";
import {
  IconArrowLeft,
  IconArrowRight,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
  items: ReactElement[];
  initialScroll?: number;
  scrollDriven?: boolean;
  trackRef?: RefObject<HTMLDivElement | null>;
}

export type AppleCardData = {
  src: string | StaticImageData;
  title: string;
  category: string;
  description: string;
  textTone: "dark" | "light";
  details: Array<{
    title: string;
    description: string;
  }>;
};

const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
}>({
  onCardClose: () => undefined,
});

export function Carousel({
  items,
  initialScroll = 0,
  scrollDriven = false,
  trackRef,
}: CarouselProps) {
  const internalCarouselRef = useRef<HTMLDivElement>(null);
  const carouselRef = trackRef ?? internalCarouselRef;
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const reduceMotion = useReducedMotion();

  const checkScrollability = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollLeft = scrollDriven ? 0 : initialScroll;
    const updateScrollability = () => {
      const { scrollLeft, scrollWidth, clientWidth } = carousel;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
    };

    updateScrollability();

    const resizeObserver = new ResizeObserver(updateScrollability);
    resizeObserver.observe(carousel);

    return () => resizeObserver.disconnect();
  }, [initialScroll, scrollDriven, carouselRef]);

  const scrollByCard = (direction: -1 | 1) => {
    carouselRef.current?.scrollBy({
      left: direction * Math.min(window.innerWidth * 0.82, 420),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const handleCardClose = (index: number) => {
    if (scrollDriven) return;

    const card = carouselRef.current?.querySelector<HTMLElement>(
      `[data-carousel-index="${index}"]`,
    );

    card?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose }}>
      <div className="relative w-full">
        <div
          ref={carouselRef}
          onScroll={scrollDriven ? undefined : checkScrollability}
          aria-label="Web tasarım yaklaşımımız"
          className={`flex w-full gap-4 px-5 [scrollbar-width:none] sm:gap-5 md:px-10 xl:pl-[max(2.5rem,calc((100vw-80rem)/2))] [&::-webkit-scrollbar]:hidden ${
            scrollDriven
              ? "overflow-x-hidden pb-8 pt-10 md:pb-6 md:pt-6"
              : "snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-8 pt-10 md:pb-10 md:pt-14"
          }`}
        >
          {items.map((item, index) => (
            <div
              key={`vice-card-${index}`}
              data-carousel-index={index}
              className={`shrink-0 last:pr-5 md:last:pr-10 ${
                scrollDriven ? "" : "snap-center first:snap-start"
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {!scrollDriven && (
          <div className="mx-auto flex max-w-7xl justify-end gap-2 px-5 md:px-10">
            <CarouselButton
              label="Önceki kart"
              disabled={!canScrollLeft}
              onClick={() => scrollByCard(-1)}
            >
              <IconArrowLeft aria-hidden="true" className="h-5 w-5" />
            </CarouselButton>
            <CarouselButton
              label="Sonraki kart"
              disabled={!canScrollRight}
              onClick={() => scrollByCard(1)}
            >
              <IconArrowRight aria-hidden="true" className="h-5 w-5" />
            </CarouselButton>
          </div>
        )}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselButton({
  children,
  disabled,
  label,
  onClick,
}: {
  children: ReactNode;
  disabled: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="vice-carousel-button flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/10 transition-[background-color,transform,opacity] duration-150 ease-out-quart active:scale-[0.96] disabled:cursor-default disabled:opacity-25 disabled:active:scale-100"
    >
      {children}
    </button>
  );
}

export function Card({
  card,
  index,
}: {
  card: AppleCardData;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const { onCardClose } = useContext(CarouselContext);
  const reduceMotion = useReducedMotion();

  const handleClose = useCallback(() => {
    setOpen(false);
    onCardClose(index);
  }, [index, onCardClose]);

  const handleOutsideClick = useCallback(() => {
    if (open) handleClose();
  }, [handleClose, open]);

  useOutsideClick(dialogRef, handleOutsideClick);

  useEffect(() => {
    if (!open) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [handleClose, open]);

  const modalMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: {
          opacity: 0,
          transform: "scale(0.96)",
        },
        animate: {
          opacity: 1,
          transform: "scale(1)",
        },
        exit: {
          opacity: 0,
          transform: "scale(0.96)",
        },
      };

  const isDarkText = card.textTone === "dark";

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[70] overflow-y-auto px-4 py-6 sm:px-6 md:py-10">
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-0 bg-[#02050a]/84 backdrop-blur-xl"
            />
            <motion.div
              {...modalMotion}
              transition={{
                duration: reduceMotion ? 0.16 : 0.25,
                ease: [0.23, 1, 0.32, 1],
              }}
              ref={dialogRef}
              id={`apple-card-dialog-${index}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`apple-card-title-${index}`}
              aria-describedby={`apple-card-description-${index}`}
              className="relative z-10 mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-[#0b111a] text-white shadow-[0_36px_120px_rgba(0,0,0,0.5)] ring-1 ring-white/10 sm:rounded-[2.5rem]"
            >
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Kartı kapat"
                onClick={handleClose}
                className="vice-card-close-button absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#111318] transition-[background-color,transform] duration-150 ease-out-quart active:scale-[0.96] sm:right-7 sm:top-7"
              >
                <IconX aria-hidden="true" className="h-5 w-5" />
              </button>

              <div className="px-6 pb-6 pt-9 sm:px-10 sm:pb-10 sm:pt-11 md:px-12">
                <p className="pr-14 text-sm font-medium tracking-[-0.01em] text-white/48">
                  {card.category}
                </p>
                <h3
                  id={`apple-card-title-${index}`}
                  className="mt-4 max-w-3xl pr-10 text-[clamp(2.35rem,6vw,5rem)] font-semibold leading-[0.96] tracking-[-0.055em]"
                >
                  {card.title}
                </h3>
                <p
                  id={`apple-card-description-${index}`}
                  className="mt-5 max-w-2xl text-base leading-relaxed text-white/58 sm:text-lg"
                >
                  {card.description}
                </p>

                <div className="mt-9 grid gap-4 md:grid-cols-[0.88fr_1.12fr]">
                  <div className="flex flex-col gap-4">
                    {card.details.map((detail) => (
                      <article
                        key={detail.title}
                        className="flex min-h-48 flex-1 flex-col justify-end rounded-[1.5rem] bg-white/[0.055] p-6 ring-1 ring-white/[0.06] sm:p-7"
                      >
                        <h4 className="text-xl font-semibold leading-tight tracking-[-0.03em] sm:text-2xl">
                          {detail.title}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-white/52 sm:text-base">
                          {detail.description}
                        </p>
                      </article>
                    ))}
                  </div>

                  <div className="relative min-h-[30rem] overflow-hidden rounded-[1.5rem] bg-white/[0.04] ring-1 ring-white/[0.06] md:min-h-[35rem]">
                    <Image
                      src={card.src}
                      alt=""
                      fill
                      sizes="(max-width: 767px) 100vw, 480px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-controls={`apple-card-dialog-${index}`}
        className="vice-approach-card group relative aspect-[2/3] w-[78vw] max-w-[22rem] overflow-hidden rounded-[1.75rem] bg-[#111927] text-left shadow-[0_24px_80px_rgba(0,0,0,0.16)] ring-1 ring-white/10 transition-transform duration-150 ease-out-quart active:scale-[0.985] md:w-[24rem] md:max-w-none md:rounded-[2rem]"
      >
        <Image
          src={card.src}
          alt=""
          fill
          sizes="(max-width: 767px) 78vw, 384px"
          className="object-cover"
        />

        <div
          className={`relative z-10 flex h-full w-full flex-col p-7 sm:p-8 ${
            isDarkText ? "text-[#111823]" : "text-white"
          }`}
        >
          <span
            className={`absolute right-7 top-7 flex h-11 w-11 items-center justify-center rounded-full sm:right-8 sm:top-8 ${
              isDarkText
                ? "bg-[#101722] text-white"
                : "bg-white/92 text-[#111318]"
            }`}
          >
            <span aria-hidden="true" className="relative h-4 w-4">
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
              <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
            </span>
            <span className="sr-only">Detayı aç</span>
          </span>

          <div className="max-w-[16rem] pr-2">
            <p
              className={`text-sm font-medium tracking-[-0.01em] ${
                isDarkText ? "text-[#111823]/52" : "text-white/58"
              }`}
            >
              {card.category}
            </p>
            <h3 className="mt-3 text-[1.9rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-[2.1rem]">
              {card.title}
            </h3>
            <p
              className={`mt-4 text-sm leading-relaxed sm:text-[0.95rem] ${
                isDarkText ? "text-[#111823]/58" : "text-white/56"
              }`}
            >
              {card.description}
            </p>
          </div>
        </div>
      </button>
    </>
  );
}
