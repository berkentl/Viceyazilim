"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { NAV_ITEMS, type NavItem } from "@/lib/navigation";

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

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
      className="fixed inset-0 z-40 flex flex-col bg-bg/95 backdrop-blur-2xl"
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

      <div className="flex flex-1 items-center justify-center px-6 pb-24 md:px-12">
        <AnimatePresence mode="wait">
          {!drilledInto ? (
            <motion.ul
              key="top"
              className="flex flex-col items-center gap-2 text-center"
            >
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
          ) : hasCategories(drilledItem!) ? (
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT_QUART }}
              className="grid w-full max-w-4xl grid-cols-1 gap-10 md:grid-cols-2"
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
              className="flex flex-col items-center gap-2 text-center"
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

      <nav className="flex items-center justify-center gap-6 border-t border-hairline px-6 py-5 md:justify-start md:px-12">
        {NAV_ITEMS.map((item) => {
          const linkClassName = `text-[13px] transition-colors duration-200 ${
            item.label === drilledInto
              ? "font-medium text-fg"
              : "text-fg-subtle hover:text-fg-muted"
          }`;
          return "href" in item ? (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={linkClassName}
            >
              {item.label}
            </Link>
          ) : (
            <button
              key={item.label}
              type="button"
              onClick={() => openItem(item)}
              className={linkClassName}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
}
