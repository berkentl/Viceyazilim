# Vice Yazılım — SEO ve GEO işletim planı

Bu belge, kodla kurulan teknik temelin yayın sonrasında nasıl işletileceğini
tanımlar. `AgriciDaniel/claude-seo` ve `zubair-trabzada/geo-seo-claude`
depolarındaki denetim yaklaşımları incelendi; uygulanan kararlar güncel arama
motoru belgeleriyle karşılaştırıldı. Harici depolardan çalışma zamanında kod veya
izleme aracı alınmadı.

## Kodda kurulan temel

- Her indekslenebilir rota için canonical URL, özgün başlık/açıklama, Open Graph
  ve Twitter kartları
- `robots.txt`, dinamik `sitemap.xml`, web manifesti, paylaşım görseli ve
  `llms.txt` içerik haritası
- Organization, WebSite, WebPage, Service, Breadcrumb, FAQ ve ItemList
  yapılandırılmış verileri; yalnızca görünür sayfa içeriğiyle eşleşen bilgiler
- Hizmet sayfalarında cevap-öncelikli açıklamalar, doğrulanabilir yetkinlikler ve
  gerçek kullanıcı soruları
- HTTP güvenlik başlıkları; `/api` ve `/yonetim` için `noindex` ve `no-store`
- Yayında olmayan menü bağlantılarının kaldırılması
- IndexNow anahtar dosyası ve yayın sonrası gönderim komutu

## Yayın günü

1. `https://viceyazilim.com/robots.txt` ve `/sitemap.xml` durum kodlarını kontrol edin.
2. Google Search Console ve Bing Webmaster Tools mülkiyet doğrulamalarını ekleyin.
3. Sitemap'i iki araca da gönderin.
4. `npm run seo:indexnow` komutunu yalnızca yeni sürüm canlıya çıktıktan sonra çalıştırın.
5. Ana sayfa, hizmetler, iletişim ve referanslar için URL Denetimi yapın.
6. Yapılandırılmış veri ve zengin sonuç testlerinde kritik hata olmadığını doğrulayın.

## İçerik ve GEO standardı

Yeni her sayfa tek bir gerçek arama ihtiyacını çözer. İlk paragraf doğrudan cevap
verir; devamında yöntem, sınırlar, kanıt, örnek ve sonraki adım bulunur. Yapay zekâ
arama sistemleri için ayrı veya gizli metin üretilmez. Fiyat, süre, teknoloji,
müşteri sonucu ve uzmanlık iddiaları kaynağı olmadan yayımlanmaz. Müşteri vakaları
mümkün olduğunda sorun, uygulama, ölçüm yöntemi ve doğrulanabilir sonuç yapısını
izler.

## Aylık ölçüm

- İndeks kapsamı, canonical seçimi, tarama anomalileri ve 404'ler
- Marka / marka dışı sorgular, hizmet bazında gösterim, tıklama ve nitelikli lead
- Core Web Vitals saha verisi ve yüksek trafik alan açılış sayfaları
- Referans veren alan adlarının kalitesi ve marka adı geçen kaynaklar
- AI destekli aramalardan gelen yönlendirme trafiği; kaynak belirtmeyen tahminler
  başarı metriği sayılmaz

Organik büyüme sürekli içerik, teknik bakım, doğrulanabilir kurum sinyalleri ve
ölçüm gerektirir. Bir defalık meta etiket paketi sıralama veya AI görünürlüğü
garantisi değildir.
