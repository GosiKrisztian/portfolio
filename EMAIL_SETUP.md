# Portfolio Weboldal - Frissítések

## Elvégzett Módosítások

### 1. ✅ Kapcsolat Link (Header)
- A "Kapcsolat" navigációs link már a `#footer` elemre mutat
- Amikor a felhasználó rákattint, a lap alulra görgetve a footer megjelenik

### 2. ✅ Footer Átalakítás

#### Szerkesztet Fájlok:
- `src/app/styles/footer.module.css` - Új stílusok hozzáadva
- `src/app/page.js` - Footer HTML struktúra módosítva

#### Új Layout:
A footer most **3 oszlopos rács** szerkezettel rendelkezik:

**Bal oszlop:**
- PixelPitchPartners logo és név
- Minden jog fenntartva szöveg

**Középső oszlop:**
- Telefonszám: +36 1 123 4567 (módosítható)
- Email cím: hello@pixelpitchpartners.com (módosítható)

**Jobb oszlop:**
- Facebook ikon (SVG)
- Instagram ikon (SVG) - Kiváló minőségű, nem emoji
- LinkedIn ikon (SVG)
- Ikont 50x50px-re nagyobbítva (korábbi 36x36px-ből)

#### Megjelenés:
- Nagyobb magasság: `padding: 60px 20px 30px`
- Reszponzív: tablet és mobil nézetben 2x2 majd 1 oszlopra alakul

### 3. ✅ Email Küldés Funkció

#### Telepített Csomag:
- **nodemailer** - Email küldéshez

#### Létrehozott Fájlok:
- `src/app/api/contact/route.js` - API endpoint az email küldéshez
- `.env.local` - Környezeti változók konfigurációhoz

#### Működés:
1. Amikor a felhasználó elküld egy üzenetet, az:
   - Validálódik az ügyféloldalon
   - POST kérést küld az `/api/contact` végpontra
   - Az API elküldi az email-t a vállalat címére
   - Egy megerősítő email jut el a felhasználónak

#### Hibaüzenet Display:
- Siker: "✓ Üzenet sikeresen elküldve!"
- Hiba: "✗ Hiba az üzenet küldése során. Kérem próbálja később."

---

## 🔧 BEÁLLÍTÁS - SZÜKSÉGES LÉPÉSEK

### Email Küldés Aktiválása

#### Opció 1: Gmail (Ajánlott)

1. Nyissa meg: https://myaccount.google.com/apppasswords
2. Válassza ki az alkalmazást (Mail) és az eszközt (Windows, Mac, Linux)
3. Google generál egy 16 karakteres jelszót
4. Nyissa meg a `.env.local` fájlt az projekt gyökerében
5. Módosítsa:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=generated-app-password
   ```
6. Mentse el a fájlt
7. Indítsa újra a Next.js fejlesztő szervert (`npm run dev`)

#### Opció 2: Más Email Szolgáltatás

- Módosítsa a `src/app/api/contact/route.js` fájlt
- Az `nodemailer.createTransport()` részben állítsa be az SMTP adatait
- Például az `outlook.com` vagy más szolgáltatóhoz

### Tesztelés

1. Nyissa meg a weboldalt: http://localhost:3000
2. Görgesse le az "Üzenet Küldése" formhoz
3. Töltse ki az összes mezőt
4. Kattintson a "Küldés" gombra
5. Ellenőrizze az email-fiókját (akár az Spam mappát is)

---

## 📝 Testreszabás

### Telefonszám és Email Módosítása
Szerkessze a [page.js](src/app/page.js) fájlt a footer szekcióban (~230-240. sor):
```javascript
<span className={footerStyles.infoValue}>+36 1 123 4567</span>
<span className={footerStyles.infoValue}>hello@pixelpitchpartners.com</span>
```

### Social Media Linkek Frissítése
A [page.js](src/app/page.js) fájl footer szekcióban módosítsa az `href` attribútumokat:
```javascript
<a href="https://facebook.com/yourprofile" ...>
<a href="https://instagram.com/yourprofile" ...>
<a href="https://linkedin.com/company/yourcompany" ...>
```

### Email Stílusok Módosítása
A [src/app/styles/footer.module.css](src/app/styles/footer.module.css) fájl tartalmazza az összes footer stílust.

---

## ⚠️ Fontos Megjegyzések

1. **Biztonsági figyelmeztetés**: Soha ne írja be az igazi jelszavát a `.env.local` fájlba. Mindig app-specific vagy temporary jelszavakat használjon.

2. **Gmail Account Szerverek**: A Gmail korlátozza az 1. féltől származó alkalmazásokat. Ha 2FA-s a Gmail fiók, használjon app-specific jelszót.

3. **A `.env.local` git-ben**: Ez a fájl az `.gitignore` fájlban van (vagy kellene legyen), így nem fog a verziókezelésbe kerülni.

4. **Éles Produkció**: 
   - Heroku, Vercel vagy más platform használatakor az Secrets/Environment Variables-ba írja az email adatokat
   - NE a `.env.local` fájlba

---

## 📞 Ha Problémái Vannak

Ellenőrizze a konzolt (`npm run dev` kimenete) a hiba üzenetekért.

Gyakori hibák:
- **"Invalid login credentials"** - Rossz email vagy jelszó
- **"ENOTFOUND"** - Internet kapcsolat problémája
- **"401 Unauthorized"** - 2FA nincs engedélyezve vagy app password nem működik
