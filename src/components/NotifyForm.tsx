"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const iconTransition = {
  duration: 0.18,
  ease: [0.25, 1, 0.5, 1] as const,
};

export function NotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const inputId = useId();

  const busy = status === "loading" || status === "success";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      setMessage("Geçerli bir e-posta adresi girin.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setStatus("error");
        setMessage(data?.error ?? "Bir şeyler ters gitti, tekrar deneyin.");
        return;
      }

      setStatus("success");
      setMessage("Kaydedildi. Lansmanı ilk senin haberin olacak.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Bağlantı kurulamadı, tekrar deneyin.");
    }
  }

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-1 rounded-full bg-bg-elevated p-1.5 ring-1 ring-hairline transition-colors duration-300 ease-out focus-within:ring-hairline-strong"
      >
        <label htmlFor={inputId} className="sr-only">
          E-posta adresi
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="e-posta adresin"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          disabled={busy}
          className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-[15px] text-fg placeholder:text-fg-subtle focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={busy}
          className="group flex shrink-0 items-center gap-2 rounded-full bg-fg py-2.5 pl-4 pr-2 text-[13px] font-medium text-bg transition-transform duration-150 ease-out active:scale-[0.97] disabled:pointer-events-none"
        >
          <span>{status === "success" ? "Kaydedildin" : "Haberdar Et"}</span>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg/10">
            <AnimatePresence mode="wait" initial={false}>
              {status === "loading" ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                  transition={iconTransition}
                  className="flex h-3.5 w-3.5 items-center justify-center"
                >
                  <Spinner />
                </motion.span>
              ) : status === "success" ? (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                  transition={iconTransition}
                  className="flex h-3.5 w-3.5 items-center justify-center"
                >
                  <CheckIcon />
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                  transition={iconTransition}
                  className="flex h-3.5 w-3.5 items-center justify-center"
                >
                  <ArrowIcon />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </button>
      </form>

      <div
        className="min-h-[1.5rem] px-1 pt-2 text-[13px]"
        role="status"
        aria-live="polite"
      >
        {message ? (
          <span className={status === "error" ? "text-danger" : "text-fg-muted"}>
            {message}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Spinner() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 16 16"
      fill="none"
      className="h-3.5 w-3.5"
      aria-hidden="true"
      animate={shouldReduceMotion ? undefined : { rotate: 360 }}
      transition={
        shouldReduceMotion
          ? undefined
          : { duration: 0.8, repeat: Infinity, ease: "linear" }
      }
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1.6"
      />
      <path
        d="M14 8a6 6 0 0 0-6-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
