-- Vice Yazılım — Referanslar (projects) tablosu + gerçek içerik
-- Supabase Studio > SQL Editor'de bir kere çalıştır.

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text,
  year int,
  category text,
  services text[],
  cover_image_url text,
  mockup_type text check (mockup_type in ('laptop', 'phone')),
  mockup_asset_url text,
  live_url text,
  prototype_url text,
  summary text,
  body text,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table projects enable row level security;

drop policy if exists "Public can read projects" on projects;
create policy "Public can read projects"
  on projects for select
  to anon
  using (true);

-- RLS politikası satırları filtreler ama tabloya erişim için ayrıca
-- temel GRANT gerekir — SQL Editor'den elle tablo oluşturunca bu adım
-- Supabase'in tablo editöründeki gibi otomatik gelmiyor.
grant select on public.projects to anon;

insert into projects
  (slug, title, client, category, services, cover_image_url, mockup_type, mockup_asset_url, live_url, summary, body, featured, sort_order)
values
  (
    'dunyanin-cicegi',
    'Dünyanın Çiçeği',
    'Dünyanın Çiçeği',
    'E-Ticaret',
    array['E-Ticaret', 'Web Tasarım'],
    '/references/dunyanin-cicegi-desktop.png',
    'laptop',
    '/references/dunyanin-cicegi-desktop.png',
    'https://dunyanincicegi.com',
    'Şişli merkezli, aynı gün teslimat yapan bir çiçekçilik ve organizasyon markası için editoryal bir estetikle tam kapsamlı bir e-ticaret altyapısı kurduk.',
    'Dünyanın Çiçeği için sepet, favoriler, üyelik ve arama gibi tam kapsamlı bir e-ticaret deneyimini; siyah-beyaz editoryal fotoğraf dili ve zarif serif tipografiyle birleştirdik. Kategori yapısını (çiçek, çikolata, hediye kutusu, çelenk, orkide, bitki) kullanıcı sepetten çıkmadan gezinebileceği şekilde kurguladık; aynı gün teslimat, kişiye özel kart mesajı ve güvenli ödeme gibi güven unsurlarını sitenin her adımında görünür kıldık.',
    true,
    0
  ),
  (
    'aura-gym-ankara',
    'Aura GYM Ankara',
    'Aura GYM',
    'Web Tasarım',
    array['Web Tasarım', 'UI & UX'],
    '/references/aura-gym-desktop.png',
    'laptop',
    '/references/aura-gym-desktop.png',
    'https://auragymankara.com',
    'Bağlıca ve Etimesgut''ta hizmet veren premium bir spor salonu için üyelik odaklı, güçlü bir görsel kimliğe sahip web sitesi tasarladık.',
    'Aura GYM''in fitness, crossfit, reformer pilates, zumba, spinning ve özel ders gibi çok sayıda hizmetini tek bir çatı altında topladık. Salonun enerjisini yansıtan koyu tonlu, kırmızı vurgulu bir tasarım diliyle üyelik sürecini kolaylaştırdık; aktif üye sayısı, Google puanı ve eğitmen kadrosu gibi güven veren rakamları hero bölümünde öne çıkardık.',
    true,
    1
  ),
  (
    'bali-sapanca-bungalov',
    'Bali Sapanca Bungalov',
    'Bali Sapanca Bungalov',
    'Web Tasarım',
    array['Web Tasarım', 'UI & UX'],
    '/references/bali-sapanca-desktop.png',
    'phone',
    '/references/bali-sapanca-mobile.png',
    'https://balisapancabungalov.com',
    'Sapanca''da doğa içinde özel havuzlu bungalov konaklaması sunan butik bir tatil işletmesi için rezervasyona yönlendiren, doğanın huzurunu yansıtan bir web deneyimi tasarladık.',
    'Kapsül ev ve lüks villa gibi farklı konaklama seçeneklerini, aktiviteler ve galeri ile birlikte tek bir akışta sunduk. Rezervasyon CTA''larını sayfanın her adımında erişilebilir tuttuk; mobil ziyaretçilerin büyük çoğunluğu oluşturduğu bir sektör olduğu için deneyimi öncelikle mobilde kusursuz olacak şekilde kurguladık.',
    true,
    2
  ),
  (
    'timur-boya',
    'Timur Boya & Dekorasyon',
    'Timur Boya',
    'Web Tasarım',
    array['Web Tasarım', 'SEO'],
    '/references/timur-boya-desktop.png',
    'laptop',
    '/references/timur-boya-desktop.png',
    'https://timurboya.com',
    'İstanbul genelinde hizmet veren bir boya ve dekorasyon ustası için güven veren, teklif almayı kolaylaştıran bir kurumsal web sitesi tasarladık.',
    'Halkalı merkezli olup İstanbul''un birçok ilçesine hizmet veren Timur Boya için tamamlanan proje sayısı, deneyim yılı ve müşteri memnuniyeti gibi somut rakamları öne çıkaran lacivert-altın bir kimlik kurduk. Ücretsiz keşif talebi ve WhatsApp üzerinden hızlı iletişim, sitenin her ekranında bir tık uzaklıkta.',
    false,
    3
  )
on conflict (slug) do update set
  title = excluded.title,
  client = excluded.client,
  category = excluded.category,
  services = excluded.services,
  cover_image_url = excluded.cover_image_url,
  mockup_type = excluded.mockup_type,
  mockup_asset_url = excluded.mockup_asset_url,
  live_url = excluded.live_url,
  summary = excluded.summary,
  body = excluded.body,
  featured = excluded.featured,
  sort_order = excluded.sort_order;
