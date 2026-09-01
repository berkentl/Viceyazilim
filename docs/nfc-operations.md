# Vice NFC — işletim kılavuzu

Yönetim ekranı `/yonetim/nfc`, genel yönlendirme adresi ise
`https://yorum.viceyazilim.com/k/{PUBLIC_CODE}` biçimindedir. Veritabanı ilk
kurulumda `V001`–`V100` stok kodlarını üretir. Genel kodlar rastgele ve benzersizdir.

## Yeni sipariş akışı

1. İşletmeden Google İşletme Profili içindeki **Daha fazla yorum al** ekranında
   verilen doğrudan yorum bağlantısını isteyin. Google hesabı veya parolası
   istenmez.
2. `/yonetim/nfc` ekranında stoktaki bir kartı açın.
3. İşletme adı, Google yorum bağlantısı ve isteğe bağlı iletişim bilgilerini girin.
4. Durumu **Aktif** yapıp kaydedin. Sistem yalnızca desteklenen HTTPS Google yorum
   adreslerini kabul eder.
5. Kartın `NFC etiketine yazılacak sabit adres` alanını kopyalayın ve NFC Tools'ta
   URL/URI kaydı olarak NTAG213'e yazın.
6. Kartı farklı bir telefonla okutun ve doğru işletmenin yıldız/yorum ekranının
   açıldığını doğrulayın.
7. Fiziksel karta stok kodunu (`V001` gibi) görünmeyecek ama servis sırasında
   bulunabilecek biçimde ekleyin.
8. Tüm kontroller tamamlandıktan sonra NFC etiketini salt okunur yapabilirsiniz.
   Bu işlem kalıcıdır.

## Durumlar

- **Stokta:** Henüz işletmeye atanmamış kart. Okutulunca kurulum sayfası açılır.
- **Aktif:** Google yorum bağlantısına yönlendirir ve okutma sayısını artırır.
- **Duraklatıldı:** İşletme bilgileri korunur, yönlendirme geçici olarak kapanır.
- **Kullanım dışı:** Kart emekliye ayrılır; kayıt ve geçmiş sayılar korunur.

Kayıtlar panelden silinmez. Böylece stok kodları tekrar kullanılmaz ve geçmiş
yanlışlıkla kaybolmaz. Yeni fiziksel ürünler için **Yeni stok kartı** kullanılır.

## İstatistik ve gizlilik

Sistem ham IP adresi, tarayıcı bilgisi veya kişisel ziyaretçi verisi saklamaz.
Yalnızca kart bazında toplam sayı, son okutma zamanı ve günlük toplu sayı tutulur.
Okutma kaydı yönlendirme yanıtından sonra yazıldığı için Google ekranının açılmasını
bekletmez.

## Bağlantı değişikliği ve arıza

- Google bağlantısı değişirse çipe yeniden yazmadan paneldeki hedefi güncelleyin.
- Yanlış işletme açılıyorsa kartı hemen **Duraklatıldı** yapın, bağlantıyı düzeltip
  yeniden test edin.
- Alan adının ve Vercel projesinin sürekli aktif kalması gerekir.
- Envanter yedeği için paneldeki **Envanteri indir** bağlantısını düzenli kullanın.
