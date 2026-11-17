# Sosyal Medya Yönetimi Sayfası Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/hizmetler/sosyal-medya-yonetimi` hizmet sayfasını Google Ads sayfasının kalıbında, kodla çizilmiş telefon + Instagram feed videolu bir girişle eklemek ve siteye kaydetmek.

**Architecture:** Server `page.tsx` → `ServiceSeo` + `SocialMediaExperience` (server) + `ServiceKnowledge`. Giriş bölümü (`SocialMediaHero`) client bileşeni; GSAP scroll timeline ile `GoogleAdsHero` kalıbını izler. Stiller tek bir CSS module'de. İçerik `SERVICES.socialMedia` kaydından ve bileşen içi sabit dizilerden gelir.

**Tech Stack:** Next.js 16.2 (App Router), React 19, GSAP (`@/lib/gsap`, `useGSAP`), CSS Modules, `@phosphor-icons/react`.

**Spec:** `docs/superpowers/specs/2026-11-17-sosyal-medya-yonetimi-design.md`

## Global Constraints

- Paket adı, adet, fiyat, indirim, "fiyatlar 6 ayda bir" notu sayfada YOK.
- Sayfa metninde "denizcilik" geçmez (referans kartı hariç, o `REFERENCES` verisinden gelir).
- Platform/araç adı olarak yalnızca: Instagram, Facebook, Meta Business Suite, Canva, Remotion. Takipçi/etkileşim/garanti/"ücretsiz" vaadi yok.
- Yeni npm bağımlılığı yok. Yeni görsel dosyası yok.
- Video: `/vice-gallery/instagram-feed.m4v`, poster `/vice-gallery/instagram-video-poster.png`; `muted playsInline loop preload="none"`.
- Next.js 16 kuralları: kod yazmadan önce `node_modules/next/dist/docs/` içindeki ilgili rehbere bak (AGENTS.md).
- Repo'da test çalıştırıcısı yok; doğrulama = `npx tsc --noEmit`, `npx eslint <dosyalar>`, `npm run build`, tarayıcı kontrolü. Test altyapısı eklemek kapsam dışı.

## Review Focus

- **Hareket azaltma açık:** giriş statik, metin okunur, video otomatik oynamaz (poster görünür). → Task 2 doğrulama adımı.
- **Mobil Safari / 375px:** sticky giriş takılmaz, telefon metnin üstüne binmez, yatay kaydırma yok. → Task 2 ve Task 3 doğrulama.
- **Video sekme dışı/ekran dışı:** ekrandan çıkınca durur, girince oynar; `play()` reddi (autoplay engeli) hata fırlatmaz. → Task 2 doğrulama.
- **JS kapalı / ilk render:** H1 ve açıklama sunucu HTML'inde görünür (GSAP yalnızca sonradan gizler). → Task 2 doğrulama (`curl` ile H1 kontrolü).
- **Klavye ile gezinme:** referans kartı ve CTA odaklanabilir; dekoratif kartlar `aria-hidden`. → Task 3 doğrulama.

---

### Task 1: İçerik kaydı ve site kayıt noktaları

**Files:**
- Modify: `src/lib/services.ts` (yeni `socialMedia` anahtarı, `googleAds`'ten sonra)
- Modify: `src/lib/navigation.ts` (Dijital Pazarlama → Google Ads'in altına)
- Modify: `src/components/layout/Footer.tsx` (Google Ads'in altına `{ label: "Sosyal Medya", href: "/hizmetler/sosyal-medya-yonetimi" }`)
- Modify: `src/lib/site.ts` (`INDEXABLE_ROUTES` içinde `/hizmetler/google-ads` sonrası)
- Modify: `public/llms.txt` (Google Ads satırından sonra `- [Sosyal medya yönetimi](https://viceyazilim.com/hizmetler/sosyal-medya-yonetimi)`)

**Interfaces:**
- Produces: `SERVICES.socialMedia: ServiceContent` (path `/hizmetler/sosyal-medya-yonetimi`, title "Sosyal Medya Yönetimi", serviceType "Sosyal medya yönetimi ve içerik üretimi").

- [ ] **Step 1:** `SERVICES.socialMedia` ekle. Alanlar spec'teki "`SERVICES.socialMedia` içeriği" bölümünden birebir: keywords (5 adet), capabilities (İçerik tasarımı / Video ve reels / Meta reklamları, her birine tek cümle açıklama), questions (spec'teki 3 SSS). `heading` ve `answer` diğer kayıtların tonunda yazılır, Global Constraints'e uyar.
- [ ] **Step 2:** Navigation, Footer, site.ts, llms.txt satırlarını ekle.
- [ ] **Step 3:** Çalıştır: `npx tsc --noEmit -p .` → çıktı yok. `npx eslint src/lib/services.ts src/lib/navigation.ts src/components/layout/Footer.tsx src/lib/site.ts` → çıktı yok.
- [ ] **Step 4:** Commit: `git add` yukarıdaki 5 dosya; mesaj `Register social media management service`.

### Task 2: Giriş bölümü (SocialMediaHero)

**Files:**
- Create: `src/components/services/social-media/SocialMediaHero.tsx` (`"use client"`)
- Create: `src/components/services/social-media/SocialMediaExperience.module.css` (palet, `.page`, `.hero*`, `.phone*`, `.orbitCard*`)

**Interfaces:**
- Produces: `export function SocialMediaHero(): JSX.Element`; CSS module `styles` (Task 3 aynı dosyaya ekler).

- [ ] **Step 1:** CSS paleti `.page` üzerinde: `--sm-bg: #070a10`, `--sm-text`, `--sm-muted`, `--sm-line` (Google Ads değerleriyle aynı aile), vurgu `--sm-accent-1: #8a5cff`, `--sm-accent-2: #ff4f8b`, `--sm-accent-3: #ffa94d`. `.hero { height: 220svh }`, `.heroStage { position: sticky; top: 0; min-height: 100svh }` — Google Ads modülündeki karşılıklarını referans al.
- [ ] **Step 2:** Markup: `section.hero[aria-labelledby="social-hero-title"]` > `.heroStage` içinde: `[data-sm-intro]` (p "VICE Sosyal Medya", h1#social-hero-title "Markanız her gün görünür olsun.", span "İçerik tasarımı, reels ve Meta reklamlarını tek elden, tutarlı bir marka diliyle yönetiyoruz."), `[data-sm-phone]` (CSS telefon çerçevesi + `<video>` Global Constraints'teki özniteliklerle, `aria-hidden`), 4 adet `[data-sm-card]` (Post / Story / Reels / Rapor, `aria-hidden`), `[data-sm-resolve]` ("Paylaşım değil." / "Tutarlı bir marka dili kuruyoruz."), scroll cue ve progress — `GoogleAdsHero` ile aynı.
- [ ] **Step 3:** GSAP: `gsap.matchMedia()`; `(prefers-reduced-motion: no-preference)` altında scrub timeline (intro çıkar → telefon `scale` büyür/merkeze kayar → kartlar telefondan dışa açılır `autoAlpha 0→1` + x/y → resolve girer). `(prefers-reduced-motion: reduce)` altında her şey statik, kartlar görünür, resolve gizli.
- [ ] **Step 4:** Video kontrolü: IntersectionObserver ile görünürken `video.play().catch(() => {})`, değilken `pause()`; reduced motion'da hiç oynatma. Gözlemciyi cleanup'ta kapat.
- [ ] **Step 5:** Mobil (`max-width: 800px`): intro üstte, telefon altta ortalı ve `width: min(62vw, 260px)`; kartlar telefonun çevresinde küçük; yatay taşma yok (`overflow: hidden` stage'de).
- [ ] **Step 6:** Geçici olarak Task 3 gelene kadar sayfa yok; doğrulama Task 3 sonunda birlikte yapılır. `npx tsc --noEmit -p .` ve `npx eslint src/components/services/social-media` → temiz.
- [ ] **Step 7:** Commit: `Add social media hero`.

### Task 3: Sayfa gövdesi, route ve doğrulama

**Files:**
- Create: `src/components/services/social-media/SocialMediaExperience.tsx` (server)
- Modify: `src/components/services/social-media/SocialMediaExperience.module.css` (bölüm stilleri)
- Create: `src/app/hizmetler/sosyal-medya-yonetimi/page.tsx`

**Interfaces:**
- Consumes: `SocialMediaHero` (Task 2), `SERVICES.socialMedia` (Task 1), `getReference` + `ReferenceBanner` (`src/lib/references.ts`, `src/components/references/ReferenceBanner.tsx`), `ServiceCTA`, `ServiceSeo`, `ServiceKnowledge`, `createPageMetadata`.
- Produces: `export function SocialMediaExperience(): JSX.Element`.

- [ ] **Step 1:** `page.tsx`: Google Ads `page.tsx` ile birebir aynı yapı, `SERVICES.socialMedia` ve `SocialMediaExperience` ile.
- [ ] **Step 2:** `SocialMediaExperience` bölümleri, spec'teki "Sayfa yapısı" 2–8 sırasıyla ve oradaki metinlerle: manifesto; "Ne üretiyoruz" 4 kart (ikonlar: `ImageSquare`, `FilmSlate`, `Megaphone`, `ChartBar` — Phosphor ssr); referans bölümü (`getReference("ozel-bodrum-denizcilik")` yoksa bölüm render edilmez) başlık "Bir kurum, tek görsel dil."; "Nasıl çalışırız" 4 adım `<ol>`; güven bölümü; araçlar rayı (5 araç) + "Ürün adları sahiplerinin ticari markalarıdır. VICE Yazılım bağımsız bir hizmet sağlayıcıdır."; kapanış cümlesi; `<ServiceCTA title="Kurumunuza özel içerik planını birlikte çıkaralım." />`.
- [ ] **Step 3:** Bölüm stilleri Google Ads modülündeki `.manifesto`, `.surfaces`, `.operatingSystem`, `.stack`, `.assurance` ölçülerini referans alır; vurgu renkleri `--sm-accent-*`.
- [ ] **Step 4:** Statik kontroller: `npx tsc --noEmit -p .`, `npx eslint src/components/services/social-media src/app/hizmetler/sosyal-medya-yonetimi` → temiz; `npm run build` → başarılı, route listesinde `/hizmetler/sosyal-medya-yonetimi`.
- [ ] **Step 5:** Sunucu HTML: `curl -s localhost:3000/hizmetler/sosyal-medya-yonetimi | grep -c "Markanız her gün görünür olsun"` → ≥1. `curl -s localhost:3000/sitemap.xml | grep -c sosyal-medya-yonetimi` → 1. Sayfa HTML'inde `grep -ci "denizcilik"` yalnızca referans kartından gelir; `grep -E "₺|Başlangıç|Premium|TikTok|LinkedIn"` → eşleşme yok.
- [ ] **Step 6:** Tarayıcı (1440×900 ve 375×812): girişte kaydırma animasyonu çalışır, video oynar, kartlar açılır, yatay scroll yok (`document.documentElement.scrollWidth <= innerWidth`), konsolda hata yok. Menüde Dijital Pazarlama altında ve footer'da link görünür. Reduced motion emülasyonunda giriş statik, video durur.
- [ ] **Step 7:** Commit: `Add social media management page`. Canlıya alma kullanıcı onayıyla ayrı yapılır.
