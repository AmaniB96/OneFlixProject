# OneFlix Anime VOD

A modern **Video On Demand** web application focused on anime. Discover, search, filter, and buy your favorite anime titles with a smooth user experience.

---

## Features

- **Anime Discovery:** Browse trending, top-ranked, and latest anime.
- **Search & Filter:** Find anime by title, genre, or popularity.
- **Anime Details:** View detailed info, trailers, episodes, and characters.
- **Cart System:** Add anime to your cart and simulate purchases.
- **Authentication:** Sign in with Google (NextAuth).
- **Newsletter:** Subscribe for updates and promotions.
- **Responsive Design:** Optimized for desktop and mobile.
- **Notifications:** Real-time feedback with react-hot-toast.
- **Splash Screen:** Custom animated splash for desktop and mobile.

---

## Tech Stack

- **Next.js** (App Router)
- **React**
- **Jikan API** (for anime data)
- **NextAuth** (Google authentication)

---

## Getting Started

### Prerequisites

- Access to [Jikan API](https://jikan.moe/)

### Installation

```bash
git clone https://github.com/your-username/your-repo.git
cd next-oneflix-amani
npm install
```

### Environment Variables

Create a `.env.local` file at the root with your Google OAuth credentials:

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Running Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

You can deploy easily on [Vercel](https://vercel.com/):

1. Push your code to GitHub.
2. Import your repo on Vercel.
3. Add your environment variables in the Vercel dashboard.
4. Deploy!

---

## API

All anime data is fetched from [Jikan API](https://jikan.moe/).  

---

## License

This project is for educational purposes.

---

## Credits

Made by Amani.