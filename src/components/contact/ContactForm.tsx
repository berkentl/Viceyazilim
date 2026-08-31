"use client";

import {
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { Check } from "@phosphor-icons/react/dist/csr/Check";
import { PaperPlaneTilt } from "@phosphor-icons/react/dist/csr/PaperPlaneTilt";
import styles from "./ContactPage.module.css";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldName =
  | "name"
  | "email"
  | "phone"
  | "projectType"
  | "message"
  | "consent";
type FieldErrors = Partial<Record<FieldName, string>>;

const PROJECT_TYPES = [
  { value: "web-design", label: "Web tasarım" },
  { value: "web-software", label: "Web yazılım" },
  { value: "ecommerce", label: "E-ticaret" },
  { value: "ui-ux", label: "UI & UX" },
  { value: "digital-marketing", label: "Dijital pazarlama" },
  { value: "other", label: "Diğer" },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  function clearError(field: FieldName) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const projectType = String(data.get("projectType") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const consent = data.get("consent") === "on";
    const nextErrors: FieldErrors = {};

    if (name.length < 2) nextErrors.name = "Adınızı ve soyadınızı yazın.";
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = "Geçerli bir e-posta adresi yazın.";
    }
    if (phone && phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Telefon numarasını kontrol edin.";
    }
    if (!projectType) nextErrors.projectType = "Bir proje türü seçin.";
    if (message.length < 20) {
      nextErrors.message = "Mesajınızı en az 20 karakterle anlatın.";
    }
    if (!consent) {
      nextErrors.consent = "Devam etmek için onay vermelisiniz.";
    }

    const firstInvalidField = Object.keys(nextErrors)[0] as
      | FieldName
      | undefined;

    if (firstInvalidField) {
      setErrors(nextErrors);
      setStatus("idle");
      requestAnimationFrame(() => {
        const field = form.elements.namedItem(firstInvalidField);
        if (field instanceof HTMLElement) field.focus();
      });
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
          phone,
          company: "",
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

  function handleMessageKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      onInput={() => {
        if (status !== "idle" && status !== "submitting") setStatus("idle");
      }}
      noValidate
      aria-busy={status === "submitting"}
    >
      <div className={styles.fieldGrid}>
        <Field
          label="Ad soyad"
          name="name"
          autoComplete="name"
          error={errors.name}
          onEdit={() => clearError("name")}
        />
        <Field
          label="E-posta"
          name="email"
          type="email"
          autoComplete="email"
          error={errors.email}
          onEdit={() => clearError("email")}
        />
      </div>

      <div className={styles.fieldGrid}>
        <Field
          label="Telefon (isteğe bağlı)"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          error={errors.phone}
          onEdit={() => clearError("phone")}
        />

        <div className={styles.field}>
          <label htmlFor="projectType">Proje türü</label>
          <select
            id="projectType"
            name="projectType"
            defaultValue=""
            required
            className={styles.control}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={
              errors.projectType ? "projectType-error" : undefined
            }
            onChange={() => clearError("projectType")}
          >
            <option value="" disabled>
              Seçin
            </option>
            {PROJECT_TYPES.map((project) => (
              <option key={project.value} value={project.value}>
                {project.label}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <ErrorMessage id="projectType-error">
              {errors.projectType}
            </ErrorMessage>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Mesajınız</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={3000}
          className={`${styles.control} ${styles.textarea}`}
          placeholder="Projenizden ve ihtiyacınızdan kısaca bahsedin."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-help"}
          onInput={() => clearError("message")}
          onKeyDown={handleMessageKeyDown}
        />
        <p id="message-help" className={styles.helperText}>
          ⌘ / Ctrl + Enter ile gönderebilirsiniz.
        </p>
        {errors.message && (
          <ErrorMessage id="message-error">{errors.message}</ErrorMessage>
        )}
      </div>

      <div className={styles.formFooter}>
        <div className={styles.consentGroup}>
          <label className={styles.consent}>
            <input
              type="checkbox"
              name="consent"
              required
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              onChange={() => clearError("consent")}
            />
            <span>
              İletişim bilgilerimin bu talebe dönüş yapılması amacıyla
              kullanılmasını kabul ediyorum.
            </span>
          </label>
          {errors.consent && (
            <ErrorMessage id="consent-error">{errors.consent}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={status === "submitting"}
        >
          <span>
            {status === "submitting" ? "Gönderiliyor" : "Mesajı gönder"}
          </span>
          <span className={styles.submitIcon} aria-hidden="true">
            {status === "success" ? (
              <Check size={18} weight="bold" />
            ) : (
              <PaperPlaneTilt size={18} weight="fill" />
            )}
          </span>
        </button>
      </div>

      <div className={styles.statusRegion} aria-live="polite" aria-atomic="true">
        {status === "success" && (
          <p className={styles.successMessage}>
            Talebiniz alındı. En kısa sürede size döneceğiz.
          </p>
        )}
        {status === "error" && (
          <p className={styles.failureMessage}>
            Mesaj şu anda gönderilemedi. Lütfen biraz sonra tekrar deneyin.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  inputMode,
  autoComplete,
  error,
  onEdit,
}: {
  label: string;
  name: "name" | "email" | "phone";
  type?: "text" | "email" | "tel";
  inputMode?: "tel";
  autoComplete?: string;
  error?: string;
  onEdit: () => void;
}) {
  const errorId = `${name}-error`;

  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={name !== "phone"}
        maxLength={name === "email" ? 160 : name === "phone" ? 40 : 80}
        className={styles.control}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onInput={onEdit}
      />
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
    </div>
  );
}

function ErrorMessage({ children, id }: { children: string; id: string }) {
  return (
    <p id={id} className={styles.errorMessage}>
      {children}
    </p>
  );
}
