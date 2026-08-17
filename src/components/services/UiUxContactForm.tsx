"use client";

import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "projectType" | "message" | "consent", string>>;

export function UiUxContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

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

    if (name.length < 2) nextErrors.name = "Lütfen adınızı ve soyadınızı yazın.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Geçerli bir e-posta adresi yazın.";
    if (!projectType) nextErrors.projectType = "Projenize en yakın seçeneği belirleyin.";
    if (message.length < 20) nextErrors.message = "Projenizi en az 20 karakterle anlatın.";
    if (!consent) nextErrors.consent = "Devam etmek için onay vermeniz gerekiyor.";

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
          company: String(data.get("company") ?? "").trim(),
          projectType,
          message,
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
    <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Ad soyad" name="name" autoComplete="name" error={errors.name} />
        <Field label="E-posta" name="email" type="email" autoComplete="email" error={errors.email} />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Şirket" name="company" autoComplete="organization" optional />
        <div>
          <label className="mb-2.5 block text-sm font-medium text-white/72" htmlFor="projectType">Proje türü</label>
          <select
            className="h-14 w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.055] px-4 text-base text-white outline-none transition-[border-color,background-color,box-shadow] duration-200 focus:border-[#65a5ff]/70 focus:bg-white/[0.075] focus:ring-4 focus:ring-[#3478f6]/10"
            id="projectType"
            name="projectType"
            defaultValue=""
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
          >
            <option value="" disabled>Bir seçenek belirleyin</option>
            <option value="new-product">Yeni ürün</option>
            <option value="improvement">Mevcut ürünü iyileştirme</option>
            <option value="design-system">Tasarım sistemi</option>
            <option value="usability">Kullanılabilirlik incelemesi</option>
          </select>
          {errors.projectType && <ErrorMessage id="projectType-error">{errors.projectType}</ErrorMessage>}
        </div>
      </div>
      <div>
        <label className="mb-2.5 block text-sm font-medium text-white/72" htmlFor="message">Bize biraz anlatın</label>
        <textarea
          className="min-h-36 w-full resize-y rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-4 text-base leading-7 text-white outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-white/28 focus:border-[#65a5ff]/70 focus:bg-white/[0.075] focus:ring-4 focus:ring-[#3478f6]/10"
          id="message"
          name="message"
          placeholder="Ürününüzü, hedefinizi ve çözmek istediğiniz problemi kısaca paylaşın."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <ErrorMessage id="message-error">{errors.message}</ErrorMessage>}
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-white/48">
          <input className="mt-1 h-4 w-4 shrink-0 accent-[#3478f6]" type="checkbox" name="consent" aria-invalid={Boolean(errors.consent)} />
          <span>İletişim bilgilerimin bu talebe dönüş yapılması amacıyla işlenmesini kabul ediyorum.</span>
        </label>
        {errors.consent && <ErrorMessage>{errors.consent}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
        <button
          className="inline-flex h-14 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-[#07111f] transition-[transform,background-color] duration-200 hover:bg-white/90 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Gönderiliyor" : "Görüşme isteği gönder"}
        </button>
        <p className="text-sm text-white/42" aria-live="polite">
          {status === "success" && "Talebiniz ulaştı. En kısa sürede size döneceğiz."}
          {status === "error" && "Şu anda gönderilemedi. Lütfen biraz sonra tekrar deneyin."}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  optional,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
  error?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label className="mb-2.5 block text-sm font-medium text-white/72" htmlFor={name}>
        {label}{optional && <span className="ml-1 font-normal text-white/32">İsteğe bağlı</span>}
      </label>
      <input
        className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 text-base text-white outline-none transition-[border-color,background-color,box-shadow] duration-200 focus:border-[#65a5ff]/70 focus:bg-white/[0.075] focus:ring-4 focus:ring-[#3478f6]/10"
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
