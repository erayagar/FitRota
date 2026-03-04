# FitRota 🏃‍♂️💧🔥

**FitRota**, kişisel hedeflerinize ulaşmanız için adım, kalori ve su tüketimi gibi temel sağlık verilerinizi izlemenizi sağlayan, modern ve temiz tasarımlı (clean UI) bir mobil uygulamadır. Bu proje, React Native + Expo kullanılarak "Mobile App Geliştirme Challenge" kapsamında 2 saat içinde tasarlanmış ve geliştirilmiştir.

## 🎯 Projenin Amacı ve İlham
Bu uygulama, atanan **Sağlık & Fitness Pinterest Panosu** referans alınarak geliştirilmiştir.
- **Tasarım Dili:** Ferah, veri odaklı ve enerjik. 
- **Renk Paleti:** Taze nane/turkuaz yeşili (ana renk), su detayları için mavi, ve uyarıcı/hareketlendirici hafif kırmızı vurgular ağırlıklı kullanılmıştır.
- **Odak:** Kullanıcının temel metriklerini hızlıca bir kart yapısında görebilmesi ve detayları inceleyebilmesidir.

## 🚀 Gerçekleştirilen Özellikler (Challenge)
- **Modern Premium Arayüz:** Apple Health & Glassmorphism ilhamlı, neon renkler ve yumuşak gölgelere (soft shadow) sahip profesyonel UI tasarımı.
- **Gösterge Paneli (Dashboard):** Günlük atılan adım, yakılan kalori ve içilen su miktarını gösteren şık istatistik kartları.
- **Kalori Takibi ve Aktivite Ekleme:** Kullanıcıların kendi aktivitelerini girip yakılan kalorinin toplam hedefe dinamik eklenmesi (Örn: 45 Dk Koşu = 540 kcal).
- **Gamification (Oyunlaştırma) Mekanizması! 🌟:** Kullanıcıların günlük kalori hedeflerine ulaşmaları durumunda animasyonlu bir kutlama ile **+50 Fit Puan** kazanmaları. Puanların Dashboard ve Profilde "Yıldız Rozetleri" ile sergilenmesi.
- **Kalıcı Veri Depolama (AsyncStorage):** Kazanılan tüm puanların, girilen hedeflerin ve eklenen son aktivitelerin uygulamayı kapatsanız dahi silinmemesi.
- **Keşfet Ekranı (Discover):** Blog yazıları, diyet programları ve egzersiz türlerini barındıran menü.
- **Makale Okuma (Detail Screen):** Dinamik gelen verilere göre spor ve beslenme hakkında içerik okuma yapısı.

## 🛠️ Kullanılan Teknolojiler
- **Framework:** [React Native](https://reactnative.dev/)
- **Araç Kutusu:** [Expo](https://expo.dev/)
- **Navigasyon:** `@react-navigation/native` & `@react-navigation/bottom-tabs`
- **İkonlar:** `lucide-react-native`
- **Depolama:** `@react-native-async-storage/async-storage`

## ⚙️ Kurulum & Çalıştırma
Projeyi kendi ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Repoyu Klonlayın:**
```bash
git clone <github-repo-url>
cd FitRota
```

2. **Bağımlılıkları Yükleyin:**
```bash
npm install
```

3. **Uygulamayı Başlatın:**
```bash
npx expo start
```

Uygulamayı `Expo Go` uygulaması üzerinden telefonunuzun kamerasıyla QR kodu okutarak veya bir iOS/Android emülatöründe anında görüntüleyebilirsiniz.

## 📝 Gelecek Vizyonu
- Arka planda adım okumak için donanım entegrasyonu (HealthKit / Google Fit).
- Arkadaş ekleme ve Puan (Streak) tablolarında rekabet.
- Haftalık/aylık grafik görünümleri.

---
*Bu proje, Bootcamp / UI Challenge gereksinimleri çerçevesinde bir "Konsept ve Frontend Geliştirme" prototipi olarak hayata geçirilmiştir.*
