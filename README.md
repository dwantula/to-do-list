# to-do-list

Todo lista

## Rozpoczęcie pracy

### 1. Instalacja zależności

```bash
npm install
```

### 2. Konfiguracja Supabase

1. Utwórz konto na [Supabase](https://supabase.com)
2. Utwórz nowy projekt
3. Skopiuj `.env.local.example` do `.env.local`
4. Wypełnij zmienne środowiskowe:
   - `NEXT_PUBLIC_SUPABASE_URL` - URL twojego projektu Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - klucz publiczny (anon key)
   - `SUPABASE_SERVICE_ROLE_KEY` - klucz serwisowy (tylko dla API routes)

### 3. Uruchomienie serwera deweloperskiego

```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## Deployment na Vercel

### Automatyczny deployment

1. Wypchnij kod do repozytorium Git (GitHub, GitLab, Bitbucket)
2. Zaimportuj projekt do [Vercel](https://vercel.com)
3. Dodaj zmienne środowiskowe w ustawieniach projektu
4. Deploy!

### Vercel CLI

```bash
npm i -g vercel
vercel
```

## Struktura projektu

```
to-do-list/
├── app/              # Next.js App Router
├── components/       # Komponenty React
├── lib/             # Utilities i konfiguracja (Supabase)
├── types/           # TypeScript types
└── public/          # Statyczne pliki
```

## Dodatkowe zasoby

- [Dokumentacja Next.js](https://nextjs.org/docs)
- [Dokumentacja Supabase](https://supabase.com/docs)
- [Dokumentacja Vercel](https://vercel.com/docs)

---

Wygenerowano przy użyciu next-supabase-generator
