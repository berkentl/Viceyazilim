# Vice CRM — kurulum ve işletim

İletişim ve lansman bildirim formları aynı `lead_submissions` tablosuna yazılır.
Ham IP adresi saklanmaz; hız sınırlaması için IP ve tarayıcı bilgisinden HMAC ile
geri döndürülemeyen bir parmak izi üretilir. Yönetim ekranı `/yonetim` adresindedir.

## Gerekli ortam değişkenleri

- `DATABASE_URL`: Neon Postgres bağlantı dizesi
- `ADMIN_USERNAME`: panel kullanıcı adı
- `ADMIN_PASSWORD_HASH`: `npm run admin:credentials -- 'güçlü-parola'` çıktısı
- `ADMIN_SESSION_SECRET`: aynı komutun ürettiği oturum imza anahtarı
- `SUBMISSION_HASH_SECRET`: aynı komutun ürettiği form parmak izi anahtarı
- `GOOGLE_SITE_VERIFICATION`: isteğe bağlı Search Console doğrulama değeri
- `BING_SITE_VERIFICATION`: isteğe bağlı Bing Webmaster Tools doğrulama değeri

Parolanın kendisi hiçbir ortam değişkeninde veya veritabanında tutulmaz. Üç gizli
değer Vercel'de Production ve Preview kapsamlarında `Sensitive` olarak saklanır.
Development değerleri yalnızca yerel doğrulama için kullanılır; proje erişimi
olmayan kişilerle paylaşılmamalıdır.

## İlk kurulum

1. Ortam değişkenlerini yerel kabuğa veya `.env.local` dosyasına ekleyin.
2. `npm run db:migrate` ile `db/migrations/001_lead_crm.sql` dosyasını uygulayın.
3. `npm run build` çalıştırın.
4. Canlıya alındıktan sonra gerçek olmayan bir test kaydı oluşturun; panelde
   göründüğünü doğrulayın ve kaydı `Arşiv` durumuna taşıyın.

## Saklama ve erişim

Panel doğrudan silme sunmaz; kayıtlar önce arşivlenir. KVKK metninde belirtilen
saklama süresi dolduğunda veritabanı yöneticisi tarafından kontrollü silme veya
anonimleştirme uygulanmalıdır. Panel erişimi yalnızca işletme sahibine ve görevli
kişilere verilmelidir. CSV dışa aktarımları kişisel veri içerir; kişisel cihazda
gereksiz kopya tutulmamalıdır.
