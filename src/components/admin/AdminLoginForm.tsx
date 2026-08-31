"use client";

import { useState, type FormEvent } from "react";

export function AdminLoginForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: String(data.get("username") ?? ""),
          password: String(data.get("password") ?? ""),
        }),
      });
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setStatus("error");
        setMessage(payload?.error ?? "Giriş tamamlanamadı.");
        return;
      }
      window.location.assign("/yonetim");
    } catch {
      setStatus("error");
      setMessage("Sunucuya bağlanılamadı.");
    }
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="mb-2 block text-xs font-medium text-white/48">Kullanıcı adı</span>
        <input
          className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-[15px] outline-none transition focus:border-white/25"
          name="username"
          autoComplete="username"
          required
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-medium text-white/48">Parola</span>
        <input
          className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-[15px] outline-none transition focus:border-white/25"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 h-12 w-full rounded-2xl bg-white text-sm font-semibold text-[#090b10] transition hover:bg-white/90 active:scale-[0.99] disabled:cursor-wait disabled:opacity-55"
      >
        {status === "loading" ? "Giriş yapılıyor…" : "Giriş yap"}
      </button>
      <p className="min-h-6 text-sm text-[#ffaea6]" role="alert" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
