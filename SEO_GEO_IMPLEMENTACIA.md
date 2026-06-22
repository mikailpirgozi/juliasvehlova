# SEO & GEO implementácia — čo je hotové a čo treba ešte spraviť

Branch: `seo-geo-2026`. Tento dokument zhŕňa, čo bolo nasadené v kóde (Fázy 0–2) a aké **manuálne kroky** treba doplniť (Fáza 3 + nastavenia, ktoré sa nedajú spraviť z kódu).

Sprievodný strategický dokument: [`SEO_GEO_STRATEGIA_2026.md`](./SEO_GEO_STRATEGIA_2026.md).

---

## ✅ Hotové v kóde (overené buildom + na produkčnom serveri)

### Fáza 0 — kritické bugy
- **Canonical opravený na všetkých stránkach** — každá stránka má self-referenčný canonical (predtým 200+ stránok ukazovalo na homepage). `src/lib/seo/metadata.ts` + per-page `generateMetadata`.
- **Title double-brand opravený** — titulky majú brand práve raz (template). Napr. „Celá tvár – HIFU MFU | Julia Estetic Clinic“.
- **Sitemap** — pridané subkategórie + `/kontakt`, odfiltrované prázdne `<loc>` (237 URL, 0 chybných). `src/app/sitemap.ts`.
- **GA4 sprevádzkované** — `src/components/analytics/GoogleAnalytics.tsx` načítava gtag.js s **Google Consent Mode v2** (default denied, granted po súhlase). Predtým sa gtag.js nikdy nenačítal. CookieConsent aktualizovaný na `consent update`.
- **GSC/Bing verifikácia** pripravená cez env (`getBaseMetadata`).

### Fáza 1 — schema & E-E-A-T
- **JSON-LD zapojené na všetky stránky** (predtým len globálny Organization): `src/components/seo/page-schemas.tsx`
  - Service stránky: `Service` + `Offer` (cena) + `BreadcrumbList` + `Speakable`.
  - Medicínske služby (estetická medicína): navyše `MedicalProcedure`.
  - Blog: `Article` (+ `reviewedBy` MUDr. Betáková) + `BreadcrumbList`.
  - O nás: `Person`/`Physician` pre tím (vrátane MUDr. Betákovej), `BreadcrumbList`.
  - Organization rozšírený o `knowsAbout`, `founder`, širší `areaServed` (entity grounding pre AI).
- **`htmlLimitedBots`** v `next.config.ts` — metadata sa renderujú do `<head>` pre HTML-only a AI crawlery.
- Opravený rozbitý `generateServiceMetadata` → nový `buildServiceMetadata`; zapojený `generateBlogPostMetadata`.

### Fáza 2 — GEO / AEO & obsah
- **Answer-first FAQ** na service stránkach — viditeľný v DOM (`.faq-answer`, vždy v HTML) + `FAQPage` schema, generovaný z reálnych dát služby (cena, trvanie, pre koho, priebeh, ako sa objednať). `src/components/services/ServiceFaq.tsx`.
- **AI-crawler allowlist** v `robots.ts` — povolené OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot, GPTBot, Google-Extended atď.; blokované Bytespider/CCBot.
- **Speakable schema** (h1 + .geo-answer + .faq-answer) na service stránkach.
- **Blog rozbehnutý** — z 1 na **4 pillar články** (HIFU, polynukleotidy/Salmon Sperm, RF mikroihličkovanie, botulotoxín), answer-first, E-E-A-T (autor + medical reviewer), interné odkazy. Opravené preklepy v pôvodnom článku.
- **llms.txt** (`/llms.txt`) — profil kliniky pre AI s „Kedy odporučiť" sekciou (bonus, nie hlavný lever).

**Overené:** `pnpm type-check` ✅, `pnpm lint` ✅, `pnpm build` ✅ (~200 stránok), live render: canonical self-ref ✅, 8 validných JSON-LD blokov/stránka ✅, FAQ v DOM ✅, všetky routes HTTP 200 ✅.

---

## ⚠️ MANUÁLNE KROKY — toto treba spraviť (nedá sa z kódu)

### 1. Nastaviť env premenné (Vercel → Project → Settings → Environment Variables)
| Premenná | Kde získať | Účinok |
|----------|------------|--------|
| `NEXT_PUBLIC_GA_ID` | GA4 → Admin → Data Streams → `G-XXXXXXXXXX` | Zapne meranie návštevnosti |
| `GOOGLE_SITE_VERIFICATION` | Search Console → overenie vlastníctva → HTML tag → `content="..."` (len token) | Overí web v GSC |
| `BING_SITE_VERIFICATION` | Bing Webmaster Tools → Meta tag → `content="..."` | Overí web v Bing |

Po nastavení redeploy. Vzor je v `.env.example`.

### 2. Google Search Console + Bing (predpoklad merania)
1. Pridaj property `https://juliaesteticclinic.sk` v [Search Console](https://search.google.com/search-console).
2. Over cez HTML tag (token → env vyššie) alebo DNS.
3. **Submitni sitemap**: `https://juliaesteticclinic.sk/sitemap.xml`.
4. To isté v [Bing Webmaster Tools](https://www.bing.com/webmasters) (vie importovať z GSC).
5. Po nasadení požiadaj o reindexáciu kľúčových stránok (canonical bol pokazený — treba „prebudiť" indexáciu).

### 3. Google Business Profile (NAJVÄČŠÍ lokálny lever — ~32 % Local Pack)
- Najpresnejšia **primárna kategória** (napr. „Estetické centrum"/„Kozmetický salón", NIE „Lekárska klinika").
- Vyplniť všetky atribúty, služby s cenami, **presné hodiny + sviatočné hodiny**.
- 15+ profesionálnych fotiek (interiér, zákroky, tím, výsledky).
- Týždenné **Posts**, zapnúť **Messaging**, vyplniť **Q&A**.
- **Skopírovať presné GPS** budovy do `src/lib/seo/constants.ts` (`geo`) — teraz je tam približná hodnota Malaciek.

### 4. Recenzný engine (recencia recenzií = top-5 lokálny faktor)
- Cieľ ~10–20 Google recenzií/mesiac, rozložené (nie nárazovo).
- QR kód v ambulancii + post-visit SMS/email so skrátenou GBP linkou.
- Odpovedať na všetky recenzie (GDPR: nepotvrdzovať, že je niekto klient, neuvádzať detaily zákroku).
- **Nikdy neincentivizovať, nikdy review-gating.**

### 5. NAP + katalógy
- NAP znak po znaku rovnaké všade (web, GBP, schema, katalógy).
- Zapísať do: Zoznam.sk, Azet.sk, Firmy.sk, Zlatestranky.sk + Apple Business Connect, Bing Places, Facebook, Foursquare.

### 6. Off-site / Digital PR (hlavný AI-citačný driver)
- YouTube videá (edukácia, zákroky), zmienky v SK beauty/lifestyle médiách, „najlepšia estetická klinika Malacky/Záhorie" listy, Reddit/diskusie.

### 7. Obsah — pokračovať
- Ďalšie pillar články: mezoterapia, výplne kyselinou hyalurónovou, laserová epilácia, vital injector.
- **Before/after galéria** (vlastní klienti, písomný súhlas, čestné popisy, popisné názvy súborov + alt) — pridať ako sekciu/komponent, keď budú fotky.
- Pri nových článkoch vyplniť frontmatter `reviewedBy: "MUDr. Yasmin Betáková"` (medicínske témy), `updated`, `keywords`, `coverImage`.

### 8. Voliteľné
- Odblokovať AhrefsBot/SemrushBot v `robots.ts`, ak chceš robiť vlastné SEO audity týmito nástrojmi (teraz sú blokované).

---

## 📊 Konkurenčná analýza (kde stojíme po týchto zmenách)

Analyzovali sme reálnych konkurentov (mazrekumedical.sk, esthetic.sk, eveclinic.sk, jkaesthetic.sk, dreamcareclinique.sk, envyclinic.sk).

**Kľúčové zistenia:**
- **Jediný konkurent so silnou schémou + GEO je `mazrekumedical.sk`** (má Service/Offer/MedicalProcedure, llms.txt, AI-crawler allowlist). Ani on **nemá FAQPage schema** ani prítomnosť v Malackách.
- Väčšina konkurentov sú **WordPress weby s JS-renderom a bez JSON-LD v zdrojovom HTML** (jkaesthetic, eveclinic, envy) → naša Next.js SSR schema je štrukturálna výhoda.
- **Nikto nemá FAQPage schema, nikto neukazuje ceny na stránkach ošetrení, nikto nemá answer-first obsah pre AI.**
- Lokálny konkurent v Malackách (`dreamcareclinique.sk`) je primárne **očná klinika** s tenkým estetickým obsahom → **Malacky/Záhorie estetický priestor je prakticky otvorený.**
- Moat konkurentov je **objem Google recenzií** (esthetic.sk ~806, eveclinic ~330) — to sa dobehne len reálnym recenzným engine (Fáza 3, krok 4).

**Po týchto zmenách ich predbiehame v:** per-page Service/Offer/MedicalProcedure schéme, FAQPage na každej službe (nikto iný nemá), answer-first obsahu, breadcrumboch, llms.txt, AI-crawler allowliste, SSR renderovaní, 237 URL pokrytí a 7 pillar/comparison článkoch (vrátane „HIFU vs RF", „polynukleotidy vs Profhilo", „botox cena").

**Vedomé rozhodnutie — Review/AggregateRating schema:** konkurenčný agent ju odporúčal, ale **zámerne sme ju NEpridali.** Google považuje self-serving review markup (recenzie o sebe samom na vlastnej Organization/LocalBusiness) za **neeligible pre hviezdičky** a falšovanie rizikuje manuálnu penalizáciu. Hviezdičky legitímne žijú na **Google Business Profile** — preto je prioritou recenzný engine (Fáza 3), nie on-site markup.

**Zostáva (odporúčané, Fáza 3 / ďalší obsah):**
- **Lokálny obsah pre Malacky/Záhorie** — priestor je otvorený. Riešiť cez GBP + ďalšie články/sekcie (pozor na thin „doorway" stránky — radšej kvalitný obsah než veľa tenkých lokálnych URL).
- **Before/after galéria** (`/galeria`) — žiadny lokálny konkurent ju nemá; potrebuje reálne fotky so súhlasom.
- **Ďalšie články** podľa keyword medzier: „laserová epilácia – koľko sedení", „permanentný make-up obočia – pred a po", „výplne pier – cena a typy".

## Čo NErobiť (overené proti 2026 realite)
- ❌ Nestavať na FAQ/HowTo rich results (mŕtve) — viditeľné FAQ a schema máme ako GEO/AEO bonus, nie pre hviezdičky.
- ❌ Nerobiť self-review `AggregateRating` markup pre hviezdičky (neeligible). Recenzie → GBP.
- ❌ Nespoliehať sa na llms.txt ako lever (máme ho ako lacný bonus).
- ❌ Nepoužiť `MedicalClinic` ako primárny typ — ostávame pri `HealthAndBeautyBusiness` + cielený `MedicalProcedure`/`Physician`.
