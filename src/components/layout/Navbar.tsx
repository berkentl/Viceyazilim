"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { BrandGlyph } from "@/components/BrandGlyph";
import { NavMenuOverlay } from "./NavMenuOverlay";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-4">
        <div className="flex items-center gap-3 rounded-full bg-bg-elevated/85 py-2 pl-3 pr-2 ring-1 ring-hairline backdrop-blur-xl">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 pl-1"
          >
            <BrandGlyph className="h-8 w-6" />
            <span className="text-[15px] font-semibold tracking-tight text-fg">
              VICE
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-elevated-hover transition-colors duration-200 hover:bg-hairline-strong"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-full origin-center bg-fg transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                  open ? "translate-y-[5.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] w-full origin-center bg-fg transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                  open ? "-translate-y-[5.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && <NavMenuOverlay onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
