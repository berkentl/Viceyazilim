"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowUpRight,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  Phone,
  WhatsappLogo,
} from "@phosphor-icons/react";

import { UiUxContactForm } from "@/components/services/UiUxContactForm";

type ContactMode = "callback" | "direct";

const contactRows = [
  {
    label: "E-posta",
    value: "info@viceyazilim.com",
    href: "mailto:info@viceyazilim.com",
    icon: EnvelopeSimple,
  },
  {
    label: "Telefon",
    value: "+90 552 688 75 56",
    href: "tel:+905526887556",
    icon: Phone,
  },
  {
    label: "WhatsApp Web",
    value: "+90 530 138 21 59",
    href: "https://wa.me/905301382159",
    icon: WhatsappLogo,
  },
] as const;

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/viceyazilim",
    icon: InstagramLogo,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/viceyazilim",
    icon: FacebookLogo,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/905301382159",
    icon: WhatsappLogo,
  },
] as const;

export function UiUxContactChoice() {
  const [mode, setMode] = useState<ContactMode>("callback");
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!panelRef.current) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.48,
          ease: "power3.out",
          clearProps: "opacity,transform,visibility",
        },
      );
    },
    { dependencies: [mode], scope: rootRef },
  );

  return (
    <div ref={rootRef} className="mx-auto max-w-6xl">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-[#82b4ff]">İletişim</p>
        <h2
          id="ui-ux-contact-title"
          className="mt-4 text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.94] tracking-[-0.065em]"
        >
          Projenizi konuşalım.
        </h2>
      </div>

      <div
        className="mt-10 inline-flex rounded-full border border-white/[0.12] bg-white/[0.035] p-1.5 md:mt-14"
        role="tablist"
        aria-label="İletişim tercihi"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "callback"}
          onClick={() => setMode("callback")}
          className={`rounded-full px-5 py-3 text-sm font-medium transition-colors duration-200 md:px-7 ${
            mode === "callback"
              ? "bg-[#f5f5f7] text-[#07111f]"
              : "text-white/55 hover:text-white"
          }`}
        >
          Biz size ulaşalım
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "direct"}
          onClick={() => setMode("direct")}
          className={`rounded-full px-5 py-3 text-sm font-medium transition-colors duration-200 md:px-7 ${
            mode === "direct"
              ? "bg-[#f5f5f7] text-[#07111f]"
              : "text-white/55 hover:text-white"
          }`}
        >
          Siz bize ulaşın
        </button>
      </div>

      <div ref={panelRef} className="mt-8 md:mt-10">
        {mode === "callback" ? (
          <div
            role="tabpanel"
            className="rounded-[2rem] border border-white/[0.1] bg-white/[0.035] p-5 md:rounded-[2.5rem] md:p-10"
          >
            <div className="mb-9 max-w-xl md:mb-12">
              <p className="text-sm text-white/42">Biz size ulaşalım</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                Kısa bilgileri bırakın.
              </h3>
              <p className="mt-4 max-w-lg text-base leading-7 text-white/45">
                İhtiyacınızı anlayıp doğru kapsamla size geri dönelim.
              </p>
            </div>
            <UiUxContactForm />
          </div>
        ) : (
          <div
            role="tabpanel"
            className="rounded-[2rem] border border-white/[0.1] bg-white/[0.035] p-5 md:rounded-[2.5rem] md:p-10"
          >
            <div className="max-w-xl">
              <p className="text-sm text-white/42">Siz bize ulaşın</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                Doğrudan konuşalım.
              </h3>
            </div>

            <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {contactRows.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center gap-4 py-5 md:gap-6 md:py-6"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/[0.12] text-white/75 transition-colors duration-200 group-hover:bg-white group-hover:text-[#07111f]">
                    <Icon size={20} weight="regular" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-white/35">{label}</span>
                    <span className="mt-1 block truncate text-base font-medium text-white/88 md:text-lg">
                      {value}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-white/32 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </a>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/[0.12] text-white/62 transition-colors duration-200 hover:bg-white hover:text-[#07111f]"
                >
                  <Icon size={20} weight="regular" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
