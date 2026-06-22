# SEO & GEO stratégia — Julia Estetic Clinic (2026)

**Doména:** https://juliaesteticclinic.sk · **Lokalita:** Javorová 2, 901 01 Malacky (región Bratislava / Záhorie)
**Stack:** Next.js 16 App Router, React 19, SSG/prerender, Vercel
**Dátum auditu:** 2026-06-22
**Vzor (referencia):** Blackrent `apps/customer-website` (best-practice GEO/SEO)

> Tento dokument je výsledok 3 hĺbkových analýz: (1) audit nášho kódu + live produkcie, (2) audit Blackrent vzoru, (3) prieskum 2026 SEO/GEO best practices z primárnych zdrojov (Google Search Central, web.dev, schema.org, Princeton GEO štúdia, Ahrefs, Whitespark, BrightLocal). Kde si Blackrent a aktuálne 2026 reálie protirečia, dokument to explicitne rieši — **nekopírujeme vzor slepo, prispôsobujeme ho realite 2026.**

---

## 0. TL;DR — kde stojíme a čo s tým

**Dobrá správa:** technický základ je solídny. Máme ~200 reálne indexovateľných service stránok so server-rendrovaným obsahom (programmatic SEO funguje), kvalitný LocalBusiness JSON-LD (NAP, geo, otváracie hodiny, sameAs), Next.js image optimization, security headers, OG/Twitter obrázky, manifest, sitemap s 210 URL.

**Zlá správa:** celý tento potenciál **dusí 6 kritických bugov**, z ktorých najhorší (pokazený canonical) hovorí Googlu, že všetkých 200+ stránok je duplikát homepage → nezaindexujú sa. Zároveň nám chýba celá GEO/AEO vrstva a obsah (1 blog článok), a najsilnejší lokálny faktor (Google Business Profile + recenzie) je úplne mimo kódu.

**Strategický fakt č. 1 (mení schema aj E-E-A-T):** máme reálnu lekárku **MUDr. Yasmin Betáková**. Nie sme „len kozmetický salón" — sme estetická klinika s lekárom pre injekčné zákroky (botox, výplne, polynukleotidy). To je veľká E-E-A-T výhoda, ktorú teraz vôbec nevyužívame.

**Strategický fakt č. 2 (mení GEO taktiku):** v 2026 **off-site zmienky o značke prevažujú nad on-page trikmi** pre viditeľnosť v AI (ChatGPT/Perplexity/AI Overviews), **FAQ aj HowTo rich results sú mŕtve**, a **llms.txt nikto z veľkých engine nečíta**. Klasické 2022 SEO rady už neplatia.

---

## 1. 🔴 KRITICKÉ BUGY — opraviť OKAMŽITE (P0)

Potvrdené naživo na produkcii aj v kóde. Toto má najvyššiu prioritu, lebo blokuje všetko ostatné.

### 1.1 Pokazený canonical na ~200 stránkach — NAJVÁŽNEJŠIE
`src/lib/seo/metadata.ts:221` natvrdo nastavuje `alternates.canonical: BASE_URL` pre **každú** stránku cez `generatePageMetadata`. Výsledok naživo:

| URL | Canonical (naživo) | Stav |
|-----|--------------------|------|
| `/sluzby/hifu-mfu/hifu-cela-tvar` | `https://juliaesteticclinic.sk` (homepage) | ❌ |
| `/cennik` | `https://juliaesteticclinic.sk` | ❌ |
| `/o-nas` | `https://juliaesteticclinic.sk` | ❌ |
| `/blog/botulotoxin-bezpecne` | `https://juliaesteticclinic.sk` | ❌ |
| `/rezervacia` | `https://juliaesteticclinic.sk` | ❌ |
| `/kontakt` | `https://juliaesteticclinic.sk/kontakt` | ✅ (jediná správna) |

Service/kategória/subkategória/blog-post stránky cez `generateMetadata` nemajú canonical **vôbec**.

**Fix:** `generatePageMetadata` musí prijať cestu stránky a nastaviť `canonical: \`${BASE_URL}${path}\``. Každý `generateMetadata` (kategória, subkategória, service, blog post) musí nastaviť self-referenčný canonical. **Toto jediné odblokuje indexáciu celého programmatic SEO.**

### 1.2 Zdvojený brand v `<title>`
Naživo: `Celá tvár | HIFU MFU | Julia Estetic Clinic | Julia Estetic Clinic`.
Title template (`%s | Julia Estetic Clinic`) prilepuje brand, ktorý už v titulku stránky je.
**Fix:** odstrániť brand z individuálnych titulkov v `pageMetadata` tabuľke a zo `generateMetadata`, nechať ho len v template. Skrátiť service title na napr. `Celá tvár – HIFU/MFU lifting` (template doplní brand).

### 1.3 Prázdny `<loc></loc>` v sitemap.xml
Live `sitemap.xml` obsahuje na konci prázdnu `<loc></loc>` → nevalidná URL. Pravdepodobne prázdny slug v `getAllServiceSlugs()`/`getAllMainCategorySlugs()` alebo konflikt s `next-sitemap` (je v dependencies, ale používame natívny `app/sitemap.ts`).
**Fix:** vyfiltrovať prázdne slugy (`.filter(Boolean)`) a overiť, či sa nepoužívajú dva sitemap generátory naraz.

### 1.4 Sitemap je neúplná
`src/app/sitemap.ts` neobsahuje:
- ❌ **subkategórie** `/sluzby/[category]/[subcategory]` (reálne routes, chýba `getAllSubcategorySlugs()`)
- ❌ **`/kontakt`** (indexovateľná stránka, chýba v static pages)

**Fix:** doplniť oba zdroje do sitemapy.

### 1.5 GA4 je mŕtve (žiadne dáta sa nezbierajú)
`src/lib/analytics.ts` a `CookieConsent.tsx` volajú `window.gtag(...)`, ale **gtag.js sa nikdy nenačíta** (žiadny `googletagmanager.com/gtag/js`, žiadne `@next/third-parties`). `NEXT_PUBLIC_GA_ID` je prázdne. → 0 pageviews, 0 eventov.
**Fix:** načítať GA4 cez `@next/third-parties/google` `<GoogleAnalytics gaId={...} />` (lazy), nastaviť `NEXT_PUBLIC_GA_ID`, ideálne s GA Consent Mode v2. Bez analytiky letíme naslepo.

### 1.6 Chýba Google Search Console + Bing verifikácia
Žiadny `verification` field v metadata. Bez GSC nemáme indexačné dáta, search analytics, ani možnosť submitnúť sitemap a žiadať reindexáciu.
**Fix:** pridať `verification.google` (a Bing) do root metadata, zaregistrovať property v GSC + Bing Webmaster Tools, submitnúť sitemap. **Toto je predpoklad pre meranie všetkého ostatného.**

---

## 2. Scorecard súčasného stavu

### ✅ Čo máme dobré
- Programmatic SEO: ~200 service URL so **server-rendrovaným, bohatým obsahom** (benefity, postup, „pre koho", cena) — výborný materiál pre SEO aj AI.
- LocalBusiness JSON-LD (`HealthAndBeautyBusiness`): NAP, geo, otváracie hodiny, sameAs (FB/IG/YT/TikTok), priceRange. **Správny primárny typ** (nie MedicalClinic — viď §4).
- Organization + WebSite + SearchAction schema.
- Next.js image optimization (AVIF/WebP, deviceSizes, cache TTL), 0 raw `<img>`.
- Security headers, compress, `optimizePackageImports`, immutable cache pre statiku.
- OG/Twitter image cez `next/og`, manifest, kompletné ikony, apple-icon.
- Sitemap (210 URL) + bohatý robots.txt + prerender (SSG) → crawler-friendly.
- Vercel Analytics aktívne.

### ⚠️ Slabé miesta
- Title/canonical bugy (§1).
- 1 generický OG obrázok pre všetky stránky (žiadny per-service/per-blog).
- `keywords` meta na každej stránke (deprecated, dead weight).
- Service stránky majú skvelý viditeľný obsah, ale **0 schema** → nie sú strojovo čitateľné.
- robots blokuje AhrefsBot/SemrushBot → nemôžeme auditovať vlastný web týmito nástrojmi (voliteľné, viď §6).
- Geo súradnice v `constants.ts:29` majú `// TODO` komentár — overiť presnosť pre Javorová 2 (live hodnoty 48.4369, 17.0218 sú ~stred Malaciek, nie nutne budova).

### ❌ Čo chýba úplne
- **5 z 8 JSON-LD generátorov je mŕtvy kód** — `ServiceSchema`, `MedicalProcedureSchema`, `FAQSchema`, `ArticleSchema`, `BreadcrumbSchema` **existujú** v `src/components/seo/schema-org.tsx`, ale nie sú nikde zapojené. (Veľa „chýbajúceho" = otázka zapojenia, nie písania od nuly.)
- Žiadna per-page schema okrem globálnej (žiadny Service/Offer, MedicalProcedure, BreadcrumbList, Article, Physician, Review/AggregateRating).
- `generateServiceMetadata` je **broken** (číta `service.seoMeta`, ktoré v Zod schéme neexistuje).
- `generateBlogPostMetadata` nepoužité; blog post má minimálne inline metadata bez OG image, canonical, Article schema.
- **E-E-A-T:** autor = krstné meno, žiadne bio, žiadny medical reviewer, žiadne citácie. MUDr. Betáková nie je nikde ako Physician/autorita.
- **Obsah:** 1 tenký blog článok (~250 slov, preklepy).
- **GEO/AEO vrstva:** žiadne answer-first kapsuly, žiadne viditeľné FAQ so schema, žiadne entity grounding.
- GA4 dáta, GSC/Bing verifikácia (§1).
- `redirects()` / www-kanonikalizácia / legacy URL handling.

---

## 3. Blackrent vzor — čo kopírovať vs. čo v 2026 prispôsobiť

Blackrent `customer-website` je technicky špičkový. Ale časť jeho GEO vrstvy stojí na taktikách, ktoré prieskum 2026 spochybňuje. Nasleduje úprimné zosúladenie:

| Blackrent pattern | Hodnota pre nás 2026 | Verdikt |
|-------------------|----------------------|---------|
| **Centrálny SEO modul** (`lib/seo/domains.ts` + `metadata.ts` s `pageMetadata` tabuľkou a entity-generátormi) | Vysoká | ✅ **KOPÍROVAŤ** (už máme zárodok, dotiahnuť) |
| **JSON-LD ako SSR `<script type="application/ld+json">`** v Server Components, escapovať `<` | Vysoká | ✅ **KOPÍROVAŤ** |
| **Plná schema sada** (Service/Offer, Breadcrumb, AggregateRating, HowTo…) | Vysoká (s úpravami typov) | ✅ **KOPÍROVAŤ** — pre nás Service/MedicalProcedure+Offer, ProfilePage(Physician), Breadcrumb |
| **`htmlLimitedBots` regex** v `next.config.ts` (núti metadata do `<head>` pre HTML-only crawlerov) | Vysoká — Next 16 streamuje metadata do `<body>`, čo láme staré crawlery a AI | ✅ **KOPÍROVAŤ** (lacné, dôležité) |
| **Programmatic page engine** — clean canonical URL, `noindex,follow` na filter/pagination | Vysoká | ✅ **KOPÍROVAŤ** princíp (my máme čisté URL, doplniť noindex na filtre) |
| **Dynamický per-domain sitemap** s priority/changefreq/lastmod z DB | Stredná (sme single-domain, SSG) | ✅ Princíp áno, netreba per-domain |
| **Answer-first `.geo-answer` kapsuly** (40–60 slov pod question-heading) + HowTo | Vysoká — **toto je dnes hlavný on-page GEO lever** (Princeton: +30–40 %) | ✅ **KOPÍROVAŤ** kapsuly. HowTo schema = bez rich resultu, ale lacná |
| **FAQ vždy v DOM** (CSS-toggle, nikdy unmount) + viditeľné Q&A | Vysoká — viditeľný obsah ťahá AI citácie | ✅ **KOPÍROVAŤ** viditeľné FAQ |
| **FAQPage / HowTo schema kvôli rich results** | **Nízka** — FAQ rich results **zomreli 7.5.2026**, HowTo 2023. Schema je validná, ale **bez SERP rich resultu** | ⚠️ **PRISPÔSOBIŤ** — pridať lacno pre porozumenie/AEO, **NEočakávať hviezdičky/rozšírené výsledky** |
| **llms.txt + llms-full.txt** so „When to Recommend" | **Nízka** — Google/Anthropic/OpenAI ho oficiálne nečíta; Ahrefs: 97 % validných llms.txt malo 0 requestov | ⚠️ **VOLITEĽNÉ** — lacné, neuškodí, ale **nie je to lever**. Nestaviť naň stratégiu |
| **AI-crawler allowlist** v robots.txt | Stredná-vysoká | ✅ **KOPÍROVAŤ** (povoliť search+user botov) |
| **Live `AggregateRating` + Review na Organization/LocalBusiness** | **Riziková** — Google: self-serving review markup je **neeligible pre hviezdičky**, falšovanie = manual action | ⚠️ **PRISPÔSOBIŤ** — recenzie smerovať na **GBP**, na webe NErobiť self-review markup pre hviezdičky. Product recenzie (retail kozmetika) sú OK |
| **Dynamický branded OG cez `/api/og`** (per-page text) | Vysoká | ✅ **KOPÍROVAŤ** (per-service/per-blog OG) |
| **Performance config** (AVIF/WebP, immutable headers, optimizePackageImports, subsetted fonts) | Vysoká | ✅ **KOPÍROVAŤ** (väčšinu už máme) |
| **Per-domain GSC verifikácia, GA4 lazy, consent banner** | Vysoká | ✅ **KOPÍROVAŤ** (GA4 nám nefunguje — §1.5) |
| **Entity grounding** (`sameAs` + Wikidata, `knowsAbout`, honest `dateModified`) | Vysoká pre GEO | ✅ **KOPÍROVAŤ** |
| **Reálny blog s Article + Author schema** | Vysoká — Blackrent ho **nemá**, je to jeho medzera | ✅ **DOPLNIŤ** (pre kliniku kľúčové, YMYL) |

**Záver:** ~75 % Blackrent patternov kopírujeme 1:1. Tri veci (FAQ-pre-hviezdičky, llms.txt-ako-lever, self-review-hviezdičky) prispôsobujeme realite 2026 — robíme ich lacno/voliteľne, ale nestaviame na nich očakávania.

---

## 4. Schema stratégia pre kliniku (2026-správna)

**Primárny LocalBusiness typ: ostať pri `HealthAndBeautyBusiness`** (už máme — správne). NEpoužívať `MedicalClinic`/čistý `Physician` ako primárny typ pre celý web — Google odporúča „najšpecifickejší presný typ", a väčšina našich služieb (kozmetika, epilácia, permanent make-up, piercing) je beauty, nie medicína.

**Ale využiť lekárku** — kde sú zákroky reálne medicínske (botulotoxín, výplne KH, polynukleotidy/biorevitalizácia, lifting. nite), pridať:
- `MedicalProcedure` + `Offer` na tieto konkrétne service stránky (generátor `MedicalProcedureSchema` už existuje).
- `Person`/`Physician` pre **MUDr. Yasmin Betáková** na `/o-nas` (`ProfilePage`), prepojiť `worksFor` → Organization a uvádzať ju ako medical authority/reviewer pri YMYL obsahu o injektoroch.

> ⚠️ **Over si rozdelenie rolí:** Júlia Švehlová (zakladateľka/estetička) vs. MUDr. Yasmin Betáková (lekárka pre injekčné zákroky). Schema má presne odrážať, kto čo robí — nepripisovať estetičke lekárske kompetencie a naopak. Toto je YMYL-citlivé.

**Service vs. medicínske stránky:**
- Kozmetika/epilácia/PMU/piercing/masáže → `Service` + `Offer` (provider = HealthAndBeautyBusiness).
- Botox/výplne/polynukleotidy/nite → `MedicalProcedure` + `Offer`, medical authority = MUDr. Betáková.

**Schema, ktoré reálne dáva 2026 rich results pre nás:** `LocalBusiness (HealthAndBeautyBusiness)`, `Organization`, `BreadcrumbList`, `ProfilePage(Person)`, Image/Video metadata. (Service/MedicalProcedure/Offer = bez rich resultu, ale dôležité pre porozumenie a AI extrakciu.)

**Čo NErobiť:**
- ❌ Nestavať FAQPage/HowTo markup s očakávaním rich resultu (oba mŕtve). Viditeľné FAQ áno (GEO), schema len ako lacný bonus.
- ❌ Nerobiť `AggregateRating`/`Review` self-markup na vlastnej Organization/LocalBusiness pre hviezdičky (neeligible, riziko manual action). Hviezdičky legitímne žijú na **Google Business Profile**.

---

## 5. GEO / AEO — aby nás citoval ChatGPT, Perplexity, Gemini, AI Overviews

**Najdôležitejšie zistenie 2026:** off-site zmienky o značke dominujú AI citáciám; vlastné on-page triky sú sekundárne (Ahrefs štúdia 75 000 značiek: najsilnejšie korelácie = **YouTube zmienky ~0.74**, **branded web mentions 0.66–0.71**; počet vlastných stránok ~0.19).

**On-page GEO levery, ktoré fungujú (Princeton GEO, peer-reviewed):**
| Taktika | Lift viditeľnosti v AI |
|---------|------------------------|
| Pridať **štatistiky** (konkrétne čísla) | +30–40 % |
| Pridať **citáty** (menovaní experti) | ~+28–40 % |
| **Citovať autoritatívne zdroje** inline | +30–40 % |
| Čitateľnosť/plynulosť | +15–30 % |
| Keyword stuffing / vata | ❌ negatívne |

**Konkrétne pre nás:**
1. **Answer-first kapsuly** — pod každý question-heading (H2) daj 1–2 vety priamej odpovede (40–60 slov, `.geo-answer` class), potom detail. Napr. „**Čo je HIFU?** HIFU je neinvazívny lifting fokusovaným ultrazvukom, ktorý zahrieva hlboké vrstvy kože a stimuluje tvorbu kolagénu. Efekt je viditeľný po 8–12 týždňoch a vydrží 12–18 mesiacov." Toto je dnes hlavný citačný lever.
2. **Viditeľné FAQ v DOM** na service/cennik stránkach (CSS-toggle, nikdy nepodmieňovať mount) — AI číta DOM.
3. **Štatistiky + zdroje** v obsahu (trvanlivosť efektu, počet sedení, % spokojnosti vlastných klientov) — kvantifikované, citovateľné vety.
4. **AI-crawler allowlist** v `robots.ts` — povoliť OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User, Googlebot, Bingbot, Applebot (tieto tvoria citácie); training boty (GPTBot, ClaudeBot, Google-Extended) povoliť pre max prítomnosť v korpuse (blokovanie ich reálne citácie nezníži); blokovať len Bytespider/CCBot. **Odblokovať treba aj to, že robots momentálne AI boty vôbec nerieši.**
5. **llms.txt** — môžeme pridať (lacné, ako Blackrent), ale **vedome ako bonus, nie lever** (nikto z veľkých ho dnes nečíta).
6. **Off-site (najdôležitejšie):** YouTube videá (zákroky, edukácia), zmienky v slovenských beauty/lifestyle médiách, „najlepšia estetická klinika Malacky/Záhorie" listy, recenzie. Toto ťahá AI citácie viac než čokoľvek na webe.

---

## 6. Lokálne SEO — najväčší pákový efekt (väčšinou MIMO kódu)

**Google Business Profile = #1 skupina faktorov (~32 % váhy Local Pack).** Toto nie je v repe a je to najdôležitejšie zo všetkého.

**Akčné (non-code):**
1. **GBP plne optimalizovať:** najpresnejšia primárna kategória (napr. „Estetické centrum"/„Kozmetický salón", NIE „Lekárska klinika"), všetky atribúty, služby s cenami, presné hodiny + sviatočné hodiny, 15+ profesionálnych fotiek (Google Vision číta obsah fotiek), týždenné Posts, Q&A, zapnúť Messaging. Re-audit kategórií kvartálne.
2. **Recenzný engine:** cieľ ~10–20 Google recenzií/mesiac, rozložené (nie nárazovo). QR kód v ambulancii + post-visit SMS/email. Odpovedať na všetky (GDPR-safe: nepotvrdzovať, že je niekto klient, neuvádzať detaily zákroku). **Nikdy neincentivizovať, nikdy review-gating.** Recencia/velocita recenzií je top-5 lokálny faktor — dôležitejšia než celkový počet.
3. **NAP konzistencia** znak po znaku (web, GBP, schema, katalógy). Aj „ul." vs „ulica" rozdelí entitu.
4. **Slovenské katalógy (priorita):** Google Business → Zoznam.sk → Azet.sk → Firmy.sk → Zlatestranky.sk. Globálne: Apple Business Connect (Siri/Mapy), Bing Places (Copilot), Facebook, Foursquare (feeduje Apple/Samsung mapy). Preskočiť Najnakup (e-shop agregátor, irelevantné).
5. **Lokálne keywords:** primárne Malacky/Záhorie (sme tam), nie predstierať Bratislavu. „hifu malacky", „estetická klinika záhorie", „botox malacky". Bratislavu cieliť len ak reálne priťahujeme bratislavských klientov (nefalšovať lokalitu).

> Voliteľné: robots momentálne blokuje AhrefsBot/SemrushBot — to blokuje aj naše vlastné auditovacie nástroje a backlink dáta. Ak chceme robiť vlastné Ahrefs/Semrush audity, odblokovať. Inak neškodí (blokuje aj konkurenciu).

---

## 7. Obsah & keywords — pillar/cluster + cenová transparentnosť

**Cenová transparentnosť je ranking aj konverzný faktor** (`cena` je high-intent modifikátor; 74 % kupujúcich volí poskytovateľa, ktorý ukáže ceny vopred). Ceny už na service stránkach máme — udržať a cieliť „[zákrok] cena".

**Pillar/cluster model — každý zákrok = mini-cluster:**
- **Pillar** = hub stránka zákroku (s rezerváciou, ~2 000+ slov, schema, kredencie autora).
- **Spokes (blog):** „čo je [zákrok]", „[zákrok] skúsenosti a recenzie", „[zákrok] vs [alternatíva]", „[zákrok] cena a priebeh" — prepojené na hub, varírovať anchor text.

**Mapovanie intentu (SK):**
| Intent | Modifikátory | Príklad | Typ stránky |
|--------|--------------|---------|-------------|
| Transakčný/lokálny | cena, cennik, malacky, objednať, rezervácia | „hifu malacky", „polynukleotidy cena" | Service stránka |
| Komerčný | najlepší, recenzie, skúsenosti, vs | „salmon sperm recenzie", „hifu vs mezoterapia" | Porovnanie/hub |
| Informačný | čo je, ako funguje, bolí to, koľko vydrží | „čo je rf mikroihličkovanie" | Blog guide |

**Priorita obsahu:** rozbehnúť reálny blog (teraz 1 článok). Začať pillar článkami pre top zákroky: HIFU/MFU, RF mikroihličkovanie, biorevitalizácia/polynukleotidy (Salmon Sperm), mezoterapia/vital injector, botulotoxín, výplne KH. Každý článok: autor byline + (pre medicínske) medical reviewer MUDr. Betáková, answer-first úvod, štatistiky, before/after.

**Before/after galéria** — silný Experience + konverzný signál. Len vlastní klienti, so súhlasom, čestné popisy, žiadne absolútne tvrdenia („100 %", „zaručene"), popisné názvy súborov + alt.

**E-E-A-T (YMYL):** Trust je #1 komponent E-E-A-T (Google verbatim). Silná `/o-nas` s reálnymi kredenciami Júlie aj MUDr. Betákovej, fotky, `sameAs` na IG/LinkedIn, viditeľné author bylines, žiadne prehnané medicínske claimy, disclaimery.

---

## 8. Technické SEO 2026
- **Core Web Vitals:** LCP ≤ 2.5 s, **INP ≤ 200 ms** (nahradil FID, najčastejšie padá — trimovať third-party skripty, defer JS), CLS ≤ 0.1. Zmerať cez GSC + PageSpeed.
- **Mobile-first hotové** — mobil a desktop musia mať identický obsah/meta/schema/headingy. (Pozor: homepage má 2× `<h1>` — mobil+desktop varianty v DOM, `HeroSection.tsx:89` a `:223`. Zjednotiť na 1 logický H1.)
- **Image SEO:** popisné názvy (`hifu-lifting-tvare-malacky.webp`), výstižný alt, WebP/AVIF, < ~100 KB, lazy-load okrem LCP/hero, image sitemap.
- `redirects()` v `next.config.ts` — www-kanonikalizácia, trailing-slash, prípadné legacy URL.
- Odstrániť deprecated `keywords` meta.

---

## 9. Prioritizovaný akčný plán

### FÁZA 0 — Kritické bugy (tento týždeň, väčšinou kód)
| # | Úloha | Súbor | Dopad |
|---|-------|-------|-------|
| 1 | Opraviť canonical (self-referenčný na všetkých stránkach) | `src/lib/seo/metadata.ts:221` + všetky `generateMetadata` | 🔴 Kritický |
| 2 | Odstrániť zdvojený brand v title | `metadata.ts` (pageMetadata + service gen.) | 🟠 Vysoký |
| 3 | Vyfiltrovať prázdny `<loc>` v sitemape | `src/app/sitemap.ts` | 🟡 Stredný |
| 4 | Doplniť subkategórie + `/kontakt` do sitemapy | `src/app/sitemap.ts` | 🟠 Vysoký |
| 5 | Sprevádzkovať GA4 (lazy, Consent Mode v2) | `layout.tsx`, `@next/third-parties` | 🟠 Vysoký |
| 6 | GSC + Bing verifikácia + submit sitemap | root metadata + externe | 🔴 Kritický (meranie) |

### FÁZA 1 — Schema & E-E-A-T (1–2 týždne, kód + obsah)
| # | Úloha | Poznámka |
|---|-------|----------|
| 7 | Zapojiť existujúce schema generátory: BreadcrumbList (všade), Service/MedicalProcedure+Offer (service stránky), Article (blog), ProfilePage/Physician (o-nas) | Generátory už existujú v `schema-org.tsx` — len wire-up |
| 8 | `htmlLimitedBots` regex do `next.config.ts` | Blackrent pattern, lacné, dôležité pre AI/crawlery |
| 9 | Opraviť/odstrániť broken `generateServiceMetadata` (`seoMeta` neexistuje) + wire `generateBlogPostMetadata` (OG image, canonical, Article) | |
| 10 | Overiť/opraviť geo súradnice | `constants.ts:29` |
| 11 | Posilniť `/o-nas`: kredencie Júlia + MUDr. Betáková, sameAs, fotky | YMYL Trust |
| 12 | Per-service/per-blog dynamický OG | `/api/og` route (Blackrent pattern) |

### FÁZA 2 — GEO/AEO & obsah (priebežne)
| # | Úloha |
|---|-------|
| 13 | Answer-first `.geo-answer` kapsuly na top service stránkach + cennik |
| 14 | Viditeľné FAQ v DOM (CSS-toggle) na service/cennik + FAQPage schema (lacný bonus) |
| 15 | AI-crawler allowlist v `robots.ts` (search+user boty allow, Bytespider/CCBot block) |
| 16 | Rozbehnúť blog — pillar články pre HIFU, RF mikroihličkovanie, polynukleotidy, mezoterapia, botox, výplne (autor + medical reviewer, štatistiky, before/after) |
| 17 | Before/after galéria (súhlas, čestné popisy, alt) |
| 18 | (Voliteľné) llms.txt + llms-full.txt — ako bonus, nie lever |

### FÁZA 3 — Off-site & lokál (priebežne, NAJVYŠŠÍ lokálny dopad, mimo kódu)
| # | Úloha |
|---|-------|
| 19 | **GBP plná optimalizácia** (kategória, atribúty, fotky, posts, Q&A, messaging) |
| 20 | **Recenzný engine** ~10–20/mes, QR + SMS, odpovede (GDPR) |
| 21 | NAP konzistencia + SK katalógy (Zoznam, Azet, Firmy) + Apple/Bing/Foursquare |
| 22 | **Digital PR / off-site mentions:** YouTube, SK beauty médiá, „najlepšia klinika" listy, Reddit — hlavný AI-citačný driver |
| 23 | Technické: CWV/INP audit, image SEO, redirects, 1× H1 na homepage |

---

## 10. Čo NErobiť (časté chyby, ktoré obídeme)
- ❌ Nestavať stratégiu na FAQ/HowTo rich results — sú mŕtve (FAQ od 7.5.2026, HowTo od 2023).
- ❌ Nerobiť self-serving review markup (`AggregateRating` na vlastnej Organization) pre hviezdičky — neeligible, riziko manual action. Recenzie → GBP.
- ❌ Nepoužiť `MedicalClinic`/`Physician` ako primárny typ pre celý web — ostať pri `HealthAndBeautyBusiness`, doktorku použiť cielene na medicínske zákroky.
- ❌ Nepredstierať lokalitu (Bratislava), keď sme v Malackách.
- ❌ Nespoliehať sa na llms.txt ako lever — nikto z veľkých engine ho dnes nečíta.
- ❌ Negenerovať AI obsah bez ľudskej kontroly — Google ho pri YMYL hodnotí ako „najnižšia kvalita".

---

### Zdroje (primárne)
Google Search Central, web.dev (CWV/INP), schema.org, Princeton GEO štúdia (KDD 2024), Ahrefs (AI visibility + llms.txt), Whitespark & BrightLocal & Sterling Sky (Local Search Ranking Factors 2026), OpenAI/Anthropic/Perplexity bot docs. Detailné odkazy v sprievodnom research reporte.
