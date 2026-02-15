# Instagram Fotky - Návod na získanie

## Správny Instagram handle
✅ `@juliaesteticclinic`
🔗 https://www.instagram.com/juliaesteticclinic/

---

## Možnosti ako získať fotky z Instagramu

### 🎯 **Metóda 1: Manuálne stiahnutie (Najrýchlejšie)**

1. **Otvor Instagram v prehliadači:**
   - Prejdi na https://www.instagram.com/juliaesteticclinic/
   - Prihlás sa ak je potrebné

2. **Otvor post čo chceš:**
   - Klikni na fotku ktorú chceš použiť
   - Post sa otvorí v modálnom okne

3. **Stiahni fotku:**
   
   **Spôsob A - Inspect Element (Chrome/Firefox):**
   - Klikni pravým tlačidlom na fotku → "Preskúmať" (Inspect)
   - V Developer Tools nájdi `<img>` tag
   - Pravé tlačidlo na URL obrázka → "Open in new tab"
   - Ulož obrázok (Ctrl+S alebo Cmd+S)

   **Spôsob B - Online nástroj:**
   - Skopíruj URL postu
   - Prejdi na: https://instadownloader.io/ alebo https://downloadgram.com/
   - Vlož URL a stiahni

4. **Premenuj a presun:**
   ```bash
   mv ~/Downloads/instagram-photo.jpg /Users/mikailpirgozi/Projects/Juliasvehlova/public/images/instagram/post-1.jpg
   ```

---

### 🔄 **Metóda 2: Instagram Basic Display API (Automatické)**

**Výhody:** Automatická aktualizácia, vždy najnovšie posty
**Nevýhody:** Vyžaduje setup, token sa musí refreshovať každých 60 dní

#### Krok 1: Vytvor Facebook Developer App

1. Prejdi na https://developers.facebook.com/
2. Klikni "My Apps" → "Create App"
3. Vyber "Consumer" → "Next"
4. Zadaj meno: "Julia Estetic Clinic Instagram Feed"
5. Klikni "Create App"

#### Krok 2: Nastav Instagram Basic Display

1. V ľavom menu: "Products" → "Add Product"
2. Nájdi "Instagram Basic Display" → "Set Up"
3. V nastaveniach vyplň:
   - **Valid OAuth Redirect URIs:** `https://localhost:3000/api/instagram/callback`
   - **Deauthorize Callback URL:** `https://localhost:3000/api/instagram/deauthorize`
   - **Data Deletion Request URL:** `https://localhost:3000/api/instagram/deletion`
4. Ulož zmeny

#### Krok 3: Získaj Access Token

1. Prejdi na "Instagram Basic Display" → "Basic Display"
2. Klikni "Add or Remove Instagram Testers"
3. Pridaj svoj Instagram účet (@juliaesteticclinic)
4. Otvor Instagram → Nastavenia → Apps and Websites → Tester Invites → Prijmi
5. Vráť sa do Facebook Developers
6. Klikni "Generate Token" pri svojom teste účte
7. Skopíruj **User Token** a ulož ho

#### Krok 4: Vytvor API Route v Next.js

Vytvor súbor: `/src/app/api/instagram/route.ts`

```typescript
import { NextResponse } from 'next/server'

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID

export async function GET() {
  try {
    const response = await fetch(
      `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=6&access_token=${INSTAGRAM_TOKEN}`,
      { next: { revalidate: 3600 } } // Cache na 1 hodinu
    )

    if (!response.ok) {
      throw new Error('Failed to fetch Instagram posts')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Instagram API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Instagram posts' },
      { status: 500 }
    )
  }
}
```

#### Krok 5: Pridaj premenné do `.env.local`

```bash
INSTAGRAM_ACCESS_TOKEN=tvoj_token_tu
INSTAGRAM_USER_ID=tvoje_user_id_tu
```

#### Krok 6: Aktualizuj InstagramSection komponent

```typescript
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface InstagramPost {
  id: string
  media_url: string
  permalink: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
}

export function InstagramSection() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/instagram')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data?.slice(0, 6) || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Fallback na statické fotky
  const fallbackPosts = [
    { id: '1', media_url: '/images/instagram/post-1.jpg', permalink: 'https://instagram.com' },
    // ... ďalšie
  ]

  const displayPosts = posts.length > 0 ? posts : fallbackPosts

  // ... zvyšok komponentu
}
```

---

### 🛠️ **Metóda 3: Third-Party Service (Najjednoduchšie)**

**Odporúčaný nástroj:** [EmbedSocial](https://embedsocial.com/)

#### Výhody:
- ✅ Žiadny coding
- ✅ Automatická aktualizácia
- ✅ Moderácia (môžeš skryť posty)
- ✅ Analytics

#### Nevýhody:
- ❌ Platené (od $29/mesiac)

#### Setup:
1. Registrácia na EmbedSocial
2. Pripoj Instagram účet
3. Vytvor widget
4. Vlož embed kód do Next.js

---

## 📋 Odporúčanie pre teba

**Pre teraz - Manuálne:**
1. Vyber 6 najlepších postov z https://www.instagram.com/juliaesteticclinic/
2. Stiahni ich pomocou Metódy 1
3. Nahraj do `/public/images/instagram/`
4. Premenuj na `post-1.jpg` až `post-6.jpg`

**Do budúcnosti - API:**
- Ak chceš automatickú aktualizáciu, použi Instagram Basic Display API (Metóda 2)
- Refresh token každých 60 dní (môžem ti spraviť automatický refresh)

---

## 🎨 Aktuálne posty na @juliaesteticclinic

Odporúčam vybrať posty ktoré:
- ✅ Ukazujú výsledky pred/po
- ✅ Majú dobré svetlo a kvalitu
- ✅ Sú rôznorodé (pery, tvár, kozmetika)
- ✅ Majú veľa lajkov/engagement

---

## Potrebuješ pomoc?

Môžem ti:
1. ✅ Nastaviť Instagram Basic Display API
2. ✅ Vytvoriť automatický refresh tokenov
3. ✅ Implementovať fallback na statické fotky
4. ✅ Pridať loading state

Len povedz! 🚀
