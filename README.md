# SecureDoc

Hassas kişisel verilerin ve belgelerin güvenli bir şekilde saklanmasını ve paylaşılmasını sağlayan şifreli dijital kasa uygulaması. Üniversite bitirme projesi olarak iki kişilik bir ekip tarafından geliştirilmektedir.

---

## Mevcut Durum

**Faz 1 tamamlandı.** Proje altyapısı çalışır durumda.

### Tamamlanan adımlar

- Next.js 14 proje yapısı kuruldu
- Prisma ORM ve SQLite veritabanı yapılandırıldı
- Docker ve Docker Compose ile geliştirme ortamı hazırlandı
- Vanilla CSS tasarım sistemi ve açılış sayfası oluşturuldu
- User, Document ve SharedDocument modelleri şemada tanımlandı
- Tüm kriptografik alanlar ilerideki fazlar için şemada yer alıyor

### Henuz uygulanmayan ozellikler

- Kullanıcı kaydı ve girişi
- Parola hash islemi
- RSA anahtar cifti uretimi
- AES-256-GCM sifreleme
- SHA-256 butunluk dogrulama
- RSA-PSS dijital imza
- Belge paylaşımı
- Regex dogrulama

Bu ozellikler Faz 2, 3 ve 4 kapsaminda eklenecektir.

---

## Teknoloji Yigini

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js 14, App Router, TypeScript |
| Veritabani | SQLite, Prisma ORM |
| Stil | Vanilla CSS |
| Istemci kriptografi | Web Crypto API |
| Sunucu kimlik dogrulama | bcryptjs |
| Konteyner | Docker, Docker Compose |
| Node imaji | node:20-slim, Debian tabanli |

---

## Proje Yapisi

```
SecureDoc/
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── README.md
├── docker-compose.yml
├── next.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── src/
    ├── app/
    │   ├── layout.tsx          # Root layout, Inter fontu, global CSS
    │   └── page.tsx            # Acilis sayfasi
    ├── components/
    │   └── index.ts            # Yer tutucu, Faz 2+ bilesenleri
    ├── lib/
    │   ├── crypto/
    │   │   └── index.ts        # Yer tutucu, Faz 2+ kripto islemleri
    │   ├── db/
    │   │   └── prisma.ts       # Prisma istemci singleton
    │   └── validators/
    │       └── index.ts        # Yer tutucu, Faz 2+ regex dogrulama
    ├── styles/
    │   ├── globals.css          # Tasarim tokenlari, CSS reset, koyu tema
    │   └── landing.css          # Acilis sayfasi stilleri
    └── types/
        └── index.ts             # Paylasilan TypeScript tipleri
```

---

## On Kosullar

- **Docker Desktop** (Windows veya macOS) ya da **Docker Engine + Compose eklentisi** (Linux)
- **Git**

Host makinede Node.js kurulu olmasi gerekmez. Tum bagimliliklar Docker konteyneri icerisinde yuklenir ve calistirilir.

---

## Ortam Degiskenleri

Projeyi ilk kez calistirmadan once `.env` dosyasini olusturun:

```bash
cp .env.example .env
```

`.env.example` dosyasindaki varsayilan degerler gelistirme ortami icin yeterlidir. `.env` dosyasi Git'e eklenmez.

---

## Ilk Kurulum

Asagidaki komutlari sirasiyla calistirin. Her komut bir oncekinin tamamlanmasini bekler.

### 1. Depoyu klonlayin

```bash
git clone <repo-url>
cd SecureDoc
```

### 2. Ortam dosyasini olusturun

```bash
cp .env.example .env
```

### 3. package-lock.json dosyasini olusturun

Bu dosya depoda zaten varsa bu adimi atlayin.

```bash
docker run --rm -v "${PWD}:/app" -w /app node:20-slim npm install --package-lock-only
```

Olusturulduktan sonra Git'e ekleyin:

```bash
git add package-lock.json
git commit -m "package-lock.json eklendi"
```

### 4. Konteyneri derleyin

```bash
docker compose build
```

### 5. Ilk veritabani migrasyonunu calistirin

```bash
docker compose run --rm app npx prisma migrate dev --name init
```

### 6. Gelistirme sunucusunu baslatin

```bash
docker compose up
```

Uygulama http://localhost:3000 adresinde erisime acilir.

---

## Gunluk Gelistirme Isi Akisi

### Sunucuyu baslatma

Ilk kurulumdan sonra genellikle bu komut yeterlidir:

```bash
docker compose up
```

### Yeniden derleme gerektiren durumlar

`package.json` degistiyse, yeni bir bagimlilik eklendiyse veya `Dockerfile` guncellendiyse:

```bash
docker compose down
docker compose up --build
```

### Yeni migrasyon olusturma

`prisma/schema.prisma` dosyasinda degisiklik yaptiktan sonra:

```bash
docker compose run --rm app npx prisma migrate dev --name degisiklik_aciklamasi
```

Olusturulan migrasyon dosyalarini Git'e ekleyin.

---

## Veritabani Notlari

### SQLite ve Docker

SQLite dosya tabanli bir veritabanidir. Bu projede veritabani dosyasi Docker'in `db-data` adli volume'u icinde saklanir. `docker compose down` calistirildiginda veritabani korunur. Tamamen sifirlamak icin:

```bash
docker compose down -v
```

### Migrasyonlar kaynak kodun parcasidir

`prisma/migrations/` klasorunun icerigi Git'e eklenir. Her gelistirici bu migrasyonlari kendi ortaminda calistirarak ayni veritabani yapisina ulasir. Migrasyonlar veritabaninin tek gercek referans kaynagindir.

### Veritabani dosyalari Git'e eklenmez

`.db` ve `.db-journal` dosyalari `.gitignore` tarafindan dislanir. Her gelistirici kendi yerel veritabanini migrasyonlardan olusturur.

---

## Git ve Is Birligi Notlari

### Git'e eklenmesi gerekenler

| Dosya veya Klasor | Aciklama |
|---------------------|----------|
| `package.json` | Bagimlilik tanimlari |
| `package-lock.json` | Sabitlenmis bagimlilik agaci |
| `prisma/schema.prisma` | Veritabani semasi |
| `prisma/migrations/` | Migrasyon dosyalari |
| `Dockerfile` | Konteyner tanimlari |
| `docker-compose.yml` | Servis yapilandirmasi |
| `.env.example` | Ornek ortam degiskenleri |
| `src/` | Tum kaynak kodlar |

### Git'e eklenmemesi gerekenler

| Dosya veya Klasor | Neden |
|---------------------|-------|
| `.env` | Yerel sirlari icerir |
| `node_modules/` | Konteyner icinde yuklenir |
| `.next/` | Derleme onbellegi |
| `*.db`, `*.db-journal` | Yerel veritabani dosyalari |
| `next-env.d.ts` | Next.js tarafindan otomatik olusturulur |

### Sema degisiklikleri

`prisma/schema.prisma` dosyasini degistirmeden once ekip arkadasinizla konusun. Ayni anda iki kisi semada degisiklik yaparsa birlestime catismalari olusabilir.

---

## Sorun Giderme

### Docker daemon calismiyorsa

```
error during connect: This error may indicate that the docker daemon is not running
```

Docker Desktop uygulamasini baslatin ve tekrar deneyin.

### Prisma migrasyon hatasi

Konteyner icinde migrasyonu sifirlamak icin:

```bash
docker compose down -v
docker compose build --no-cache
docker compose run --rm app npx prisma migrate dev --name init
```

### Port 3000 zaten kullaniliyorsa

Baska bir uygulama 3000 portunu kullaniyor olabilir. Mevcut islemi sonlandirin veya `docker-compose.yml` dosyasindaki port ayarini degistirin:

```yaml
ports:
  - "3001:3000"
```

### Ilk derleme yavas ise

Ilk `docker compose build` komutu tum bagimliliklari indirir. Bu islem internet hizina bagli olarak 3-5 dakika surebilir. Sonraki derlemeler Docker katman onbellegi sayesinde cok daha hizli tamamlanir.

---

## Faz Yol Haritasi

| Faz | Baslik | Kapsam |
|-----|--------|--------|
| 1 | Altyapi ve DevOps | Next.js, Prisma, Docker, CSS temeli, proje yapisi |
| 2 | Guvenlik ve Kimlik | Regex dogrulama, kayit, giris, bcrypt, RSA anahtar uretimi, PBKDF2 |
| 3 | Kasa Cekirdegi | Dashboard, belge olusturma, AES sifreleme, SHA-256 hash, RSA-PSS imza |
| 4 | Guvenli Paylasim | Belge paylasimi, alici sifre cozme, imza dogrulama |

---

## Onemli Proje Kisitlamalari

- Tailwind veya baska bir CSS framework'u kullanilmaz, yalnizca Vanilla CSS
- Angular, Vue veya ek UI kutuphaneleri eklenmez
- Docker-first yaklasim esastir, host tarafinda Node.js gerektirmez
- Proje kapsamı iki kisilik bir universite bitirme tezi icin uygundur
- Admin paneli, kullanici rolleri, gercek zamanli sohbet veya dosya yukleme eklenmez
- Sunucu hicbir zaman duz metin verisi veya sifrelenmemis ozel anahtarlar gormez

---

## Lisans

Bu proje universite bitirme projesi olarak gelistirilmektedir. Ticari amacla kullanilmamaktadir.
