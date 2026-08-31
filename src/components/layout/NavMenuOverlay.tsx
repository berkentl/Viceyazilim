"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { FacebookLogo } from "@phosphor-icons/react/dist/ssr/FacebookLogo";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr/InstagramLogo";
import { Phone } from "@phosphor-icons/react/dist/ssr/Phone";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { NAV_ITEMS, type NavItem } from "@/lib/navigation";

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

const SOCIAL_LINKS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/905301382159",
    icon: WhatsappLogo,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591721100777&notif_id=1787612471739199&notif_t=page_user_activity&ref=notif",
    icon: FacebookLogo,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/viceyazilim",
    icon: InstagramLogo,
  },
] as const;

function hasCategories(
  item: NavItem,
): item is Extract<NavItem, { categories: unknown }> {
  return "categories" in item;
}

function hasLinks(item: NavItem): item is Extract<NavItem, { links: unknown }> {
  return "links" in item;
}

export function NavMenuOverlay({ onClose }: { onClose: () => void }) {
  const [drilledInto, setDrilledInto] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const drilledItem = NAV_ITEMS.find((item) => item.label === drilledInto);

  function openItem(item: NavItem) {
    if (hasCategories(item)) {
      setDrilledInto(item.label);
      setActiveCategory(item.categories[0].label);
    } else if (hasLinks(item)) {
      setDrilledInto(item.label);
      setActiveCategory(null);
    }
  }

  function goBack() {
    setDrilledInto(null);
    setActiveCategory(null);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT_QUART }}
      className="mobile-menu-overlay fixed inset-0 z-40 flex flex-col bg-bg/95 backdrop-blur-2xl"
    >
      <div className="flex items-center px-6 pt-24 md:px-12">
        {drilledInto && (
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-2 text-[14px] text-fg-muted transition-colors duration-200 hover:text-fg"
          >
            <ArrowLeft size={16} weight="light" />
            Geri
          </button>
        )}
      </div>

      <div className="flex min-h-0 flex-1 items-stretch justify-stretch overflow-y-auto px-6 pb-4 md:items-center md:justify-center md:px-12 md:pb-24">
        <AnimatePresence mode="wait">
          {!drilledInto ? (
            <motion.div
              key="top"
              className="flex min-h-full w-full flex-col items-center md:min-h-0 md:w-auto"
            >
              <motion.ul className="flex flex-col items-center gap-2 pt-[clamp(7rem,18vh,10rem)] text-center md:pt-0">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      duration: 0.5,
                      ease: EASE_OUT_QUART,
                      delay: index * 0.05,
                    }}
                  >
                    {"href" in item ? (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="text-[clamp(2rem,6vw,3.25rem)] font-semibold tracking-tight text-fg/55 transition-colors duration-200 hover:text-fg"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openItem(item)}
                        className="text-[clamp(2rem,6vw,3.25rem)] font-semibold tracking-tight text-fg/55 transition-colors duration-200 hover:text-fg"
                      >
                        {item.label}
                      </button>
                    )}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{
                  duration: 0.22,
                  ease: EASE_OUT_QUART,
                  delay: NAV_ITEMS.length * 0.05 + 0.12,
                }}
                className="mt-auto flex w-[min(19rem,calc(100vw-4rem))] flex-col items-center pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
              >
                <a
                  href="tel:+905526887556"
                  className="mb-4 flex items-center gap-4 text-[15px] font-medium text-fg/78 transition-colors duration-200 hover:text-fg focus-visible:text-fg focus-visible:outline-none"
                >
                  <Phone size={24} weight="light" />
                  <span>+90 552 688 75 56</span>
                </a>

                <Link
                  href="/iletisim"
                  onClick={onClose}
                  className="mobile-offer-cta flex w-full items-center justify-center rounded-full px-6 py-4 text-base font-semibold text-bg transition-transform duration-150 ease-out-quart active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#79dfff]"
                >
                  <span>Teklif Al</span>
                </Link>

                <nav
                  aria-label="Sosyal medya"
                  className="mt-9 flex items-center gap-8"
                >
                  {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="text-fg/38 transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-fg focus-visible:text-fg focus-visible:outline-none"
                    >
                      <Icon size={24} weight="regular" />
                    </a>
                  ))}
                </nav>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: 0.45,
                  ease: EASE_OUT_QUART,
                  delay: NAV_ITEMS.length * 0.05 + 0.08,
                }}
                className="hidden w-[19rem] flex-col items-center pt-8 md:flex"
              >
                <a
                  href="tel:+905526887556"
                  className="mb-7 flex items-center gap-4 text-[15px] font-medium text-fg/78 transition-colors duration-200 hover:text-fg focus-visible:text-fg focus-visible:outline-none"
                >
                  <Phone size={24} weight="light" />
                  <span>+90 552 688 75 56</span>
                </a>

                <Link
                  href="/iletisim"
                  onClick={onClose}
                  className="mobile-offer-cta flex w-full items-center justify-center rounded-full px-6 py-4 text-base font-semibold text-bg transition-transform duration-150 ease-out-quart active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#79dfff]"
                >
                  <span>Teklif Al</span>
                </Link>

                <nav
                  aria-label="Sosyal medya"
                  className="mt-9 flex items-center gap-8"
                >
                  {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="text-fg/38 transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-fg focus-visible:text-fg focus-visible:outline-none"
                    >
                      <Icon size={24} weight="regular" />
                    </a>
                  ))}
                </nav>
              </motion.div>
            </motion.div>
          ) : hasCategories(drilledItem!) ? (
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT_QUART }}
              className="grid w-full max-w-4xl self-center grid-cols-1 gap-10 md:grid-cols-2"
            >
              <ul className="flex flex-col gap-3">
                {drilledItem.categories.map((category) => {
                  const active = category.label === activeCategory;
                  return (
                    <li key={category.label}>
                      <button
                        type="button"
                        onClick={() => setActiveCategory(category.label)}
                        className={`flex items-center gap-2 text-[clamp(1.5rem,4vw,2.25rem)] font-semibold tracking-tight transition-colors duration-200 ${
                          active ? "text-fg" : "text-fg/40 hover:text-fg/70"
                        }`}
                      >
                        {category.label}
                        {active && <span aria-hidden="true">→</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <AnimatePresence mode="wait">
                <motion.ul
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: EASE_OUT_QUART }}
                  className="flex flex-col gap-2.5"
                >
                  {drilledItem.categories
                    .find((category) => category.label === activeCategory)
                    ?.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="text-[15px] text-fg-muted transition-colors duration-200 hover:text-fg"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                </motion.ul>
              </AnimatePresence>
            </motion.div>
          ) : hasLinks(drilledItem!) ? (
            <motion.ul
              key="links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT_QUART }}
              className="flex self-center flex-col items-center gap-2 text-center"
            >
              {drilledItem.links.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: EASE_OUT_QUART,
                    delay: index * 0.05,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="text-[clamp(1.75rem,5vw,2.75rem)] font-semibold tracking-tight text-fg/70 transition-colors duration-200 hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}
