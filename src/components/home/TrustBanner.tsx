import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { ChatsCircle } from "@phosphor-icons/react/dist/ssr/ChatsCircle";

export function TrustBanner() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2 md:px-12">
        <TrustCard
          icon={ShieldCheck}
          tint="cool"
          title="Güvenliği ve performansı işin merkezine koyuyoruz."
          body="Her projeyi, güvenlik açıklarına karşı özenle test edilmiş, hızlı ve sürdürülebilir bir mimari üzerine kuruyoruz. Kod kalitesinden ödün vermeden, uzun vadede sorunsuz çalışan yazılımlar üretiyoruz."
        />
        <TrustCard
          icon={ChatsCircle}
          tint="warm"
          title="Şeffaf iletişimin gücüne inanıyoruz."
          body="Projenizin her aşamasında sizinle birlikte ilerliyoruz — net zaman çizelgeleri, açık fiyatlandırma ve doğrudan erişilebilir bir ekip. Sürpriz yok, sadece sonuç var."
        />
      </div>
    </section>
  );
}

function TrustCard({
  icon: Icon,
  tint,
  title,
  body,
}: {
  icon: typeof ShieldCheck;
  tint: "cool" | "warm";
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[2rem] bg-bg-elevated/60 p-1.5 ring-1 ring-hairline">
      <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-bg-elevated p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] md:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              tint === "cool"
                ? "radial-gradient(closest-side, oklch(0.45 0.07 255 / 45%), transparent 72%)"
                : "radial-gradient(closest-side, oklch(0.55 0.09 78 / 35%), transparent 72%)",
          }}
        />

        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-bg ring-1 ring-hairline">
          <Icon size={20} weight="thin" className="text-fg" />
        </span>

        <h3 className="relative mt-6 max-w-sm text-[22px] font-semibold leading-snug tracking-tight text-fg">
          {title}
        </h3>
        <p className="relative mt-4 max-w-md text-[15px] leading-relaxed text-fg-muted">
          {body}
        </p>
      </div>
    </div>
  );
}
