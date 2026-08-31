import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
import { FacebookLogo } from "@phosphor-icons/react/dist/ssr/FacebookLogo";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr/InstagramLogo";
import { Phone } from "@phosphor-icons/react/dist/ssr/Phone";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { ContactForm } from "@/components/contact/ContactForm";
import styles from "@/components/contact/ContactPage.module.css";

export const metadata: Metadata = {
  title: "İletişim | Vice Yazılım",
  description:
    "Web tasarım, yazılım, e-ticaret ve dijital pazarlama projeniz için Vice Yazılım ile iletişime geçin.",
  alternates: {
    canonical: "/iletisim",
  },
  openGraph: {
    title: "İletişim | Vice Yazılım",
    description:
      "Projenizi anlatın, ihtiyacınıza uygun kapsamı birlikte netleştirelim.",
    url: "/iletisim",
  },
};

const CONTACT_CHANNELS = [
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
    label: "WhatsApp",
    value: "+90 530 138 21 59",
    href: "https://wa.me/905301382159",
    icon: WhatsappLogo,
  },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/viceyazilim",
    icon: InstagramLogo,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591721100777&notif_id=1787612471739199&notif_t=page_user_activity&ref=notif",
    icon: FacebookLogo,
  },
] as const;

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <div className={styles.ambient} aria-hidden="true" />

      <section className={styles.shell} aria-labelledby="contact-title">
        <aside className={styles.infoPanel}>
          <div className={styles.infoIntro}>
            <p className={styles.kicker}>İletişim</p>
            <h1 id="contact-title" className={styles.title}>
              Birlikte başlayalım.
            </h1>
            <p className={styles.introCopy}>
              İhtiyacınızı birkaç cümleyle anlatın. Size uygun kapsamla dönüş
              yapalım.
            </p>
          </div>

          <div className={styles.channelList}>
            {CONTACT_CHANNELS.map(({ label, value, href, icon: Icon }) => {
              const external = href.startsWith("http");

              return (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className={styles.channel}
                >
                  <span className={styles.channelIcon} aria-hidden="true">
                    <Icon size={19} weight="regular" />
                  </span>
                  <span className={styles.channelText}>
                    <span className={styles.channelLabel}>{label}</span>
                    <span className={styles.channelValue}>{value}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    weight="regular"
                    className={styles.channelArrow}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>

          <nav className={styles.socials} aria-label="Sosyal medya">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={styles.socialLink}
              >
                <Icon size={20} weight="regular" />
              </a>
            ))}
          </nav>
        </aside>

        <div className={styles.formPanel}>
          <div className={styles.formHeading}>
            <h2>Bize yazın.</h2>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
