"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import Link from "next/link";
import { KVKK_NOTICE_VERSION } from "@/lib/privacy";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<
  Record<"name" | "email" | "projectType" | "message" | "consent", string>
>;

export function UiUxContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const reduceMotion = useSafeReducedMotion();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  useGSAP(
    () => {
      const form = formRef.current;
      if (!form || reduceMotion) return;

      const fields = gsap.utils.toArray<HTMLElement>("[data-contact-field]");
      gsap.fromTo(
        fields,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: form,
            start: "top 78%",
            once: true,
          },
        },
      );
    },
    { scope: formRef, dependencies: [reduceMotion], revertOnUpdate: true },
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: FieldErrors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const projectType = String(data.get("projectType") ?? "");
    const message = String(data.get("message") ?? "").trim();
    const consent = data.get("consent") === "on";
    const website = String(data.get("website") ?? "");

    if (name.length < 2) nextErrors.name = "Lütfen adınızı yazın.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Geçerli bir e-posta adresi yazın.";
    if (!projectType) nextErrors.projectType = "Bir proje türü seçin.";
    if (message.length < 20) nextErrors.message = "En az 20 karakterle kısaca anlatın.";
    if (!consent) nextErrors.consent = "Devam etmek için onay vermelisiniz.";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: "",
          projectType,
          message,
          consent,
          consentVersion: KVKK_NOTICE_VERSION,
          source: "/hizmetler/ui-ux",
          website,
        }),
      });

      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} className="grid content-start gap-x-8 md:grid-cols-2" onSubmit={handleSubmit} noValidate>
      <input className="sr-only" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <LineField label="Ad soyad" name="name" autoComplete="name" error={errors.name} />
      <LineField label="E-posta" name="email" type="email" autoComplete="email" error={errors.email} />

      <div data-contact-field className="border-b border-white/[0.13] py-6 md:col-span-2">
        <label className="block text-[0.78rem] font-medium text-white/42" htmlFor="projectType">Proje türü</label>
        <select
          className="mt-3 h-10 w-full appearance-none bg-transparent text-lg font-medium text-white outline-none md:text-xl"
          id="projectType"
          name="projectType"
          defaultValue=""
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={errors.projectType ? "projectType-error" : undefined}
        >
          <option value="" disabled className="bg-[#07111f]">Bir seçenek belirleyin</option>
          <option value="new-product" className="bg-[#07111f]">Yeni ürün</option>
          <option value="improvement" className="bg-[#07111f]">Mevcut ürünü iyileştirme</option>
          <option value="design-system" className="bg-[#07111f]">Tasarım sistemi</option>
          <option value="usability" className="bg-[#07111f]">Kullanılabilirlik incelemesi</option>
        </select>
        {errors.projectType && <ErrorMessage id="projectType-error">{errors.projectType}</ErrorMessage>}
      </div>

      <div data-contact-field className="border-b border-white/[0.13] py-6 md:col-span-2">
        <label className="block text-[0.78rem] font-medium text-white/42" htmlFor="message">Kısaca projeniz</label>
        <textarea
          className="mt-3 min-h-28 w-full resize-none bg-transparent text-lg leading-8 text-white outline-none placeholder:text-white/24 md:text-xl"
          id="message"
          name="message"
          placeholder="Neyi daha iyi hâle getirmek istiyorsunuz?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <ErrorMessage id="message-error">{errors.message}</ErrorMessage>}
      </div>

      <div data-contact-field className="py-6 md:col-span-2">
        <label className="flex max-w-lg cursor-pointer items-start gap-3 text-sm leading-6 text-white/40">
          <input
            className="mt-1 h-4 w-4 shrink-0 accent-[#72a9ff]"
            type="checkbox"
            name="consent"
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            <Link className="text-white/70 underline decoration-white/25 underline-offset-4" href="/kvkk-aydinlatma-metni">
              KVKK Aydınlatma Metni
            </Link>’ni okudum; bilgilerimin talebime dönüş yapılması için işlenmesini anladım.
          </span>
        </label>
        {errors.consent && <ErrorMessage>{errors.consent}</ErrorMessage>}
      </div>

      <div data-contact-field className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center md:col-span-2">
        <button
          className="group inline-flex h-14 w-fit items-center gap-5 rounded-full bg-white pl-6 pr-2 text-sm font-semibold text-[#07111f] transition-[transform,background-color] duration-200 hover:bg-[#edf3ff] active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
          type="submit"
          disabled={status === "submitting"}
        >
          <span>{status === "submitting" ? "Gönderiliyor" : "Görüşme isteği gönder"}</span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#dce7f7] transition-transform duration-300 group-hover:rotate-6">
            <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
          </span>
        </button>
        <p className="text-sm leading-6 text-white/42" aria-live="polite">
          {status === "success" && "Talebiniz ulaştı. En kısa sürede size döneceğiz."}
          {status === "error" && "Şu anda gönderilemedi. Lütfen biraz sonra tekrar deneyin."}
        </p>
      </div>
    </form>
  );
}

function LineField({
  label,
  name,
  type = "text",
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <div data-contact-field className="border-b border-white/[0.13] py-6">
      <label className="block text-[0.78rem] font-medium text-white/42" htmlFor={name}>{label}</label>
      <input
        className="mt-3 h-10 w-full bg-transparent text-lg font-medium text-white outline-none md:text-xl"
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
    </div>
  );
}

function ErrorMessage({ children, id }: { children: string; id?: string }) {
  return <p id={id} className="mt-2 text-sm text-[#ffb4aa]">{children}</p>;
}
