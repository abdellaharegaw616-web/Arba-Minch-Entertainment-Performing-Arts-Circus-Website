# AMEPAC — Arba Minch Entertainment Performing Arts & Circus Website

Official, accessible, high-performance web platform for **AMEPAC (Arba Minch Entertainment Performing Arts & Circus)**, located in Arba Minch, South Ethiopia.

---

## 🏛️ Organizational Context & Distinction

- **AMEPAC (Circus & Performing Arts Group):** Established in **2011**.
- **Parent Organization:** **Building Tomorrow Integrated Youth & Community Development Organization**, officially registered in **November 2022**.
- *Note:* This distinct operational and registration structure is preserved across all content, legal representations, and the administrative database.

---

## 📍 Contact Details & Location

- **Location:** Mehal Ketema Kebele, Nech Sar Sub-city, Arba Minch, South Ethiopia, Ethiopia
- **Phone:** `+251-913-949-209`
- **Email:** `Arbaminch.circus@gmail.com`
- **Facebook:** [AMEPAC Official Facebook](https://web.facebook.com/profile.php?id=100063595935774)

---

## 🎨 Visual Direction & Palette

A warm, artistic, professional, trustworthy visual style inspired by Ethiopian heritage and the landscape of Arba Minch and Lake Chamo:

- **Terracotta Orange:** `#C64B24` (Energy, circus flame, dynamic performance)
- **Forest Green:** `#17251F` (Highland depth, trustworthiness, backdrop)
- **Papyrus Ivory:** `#F7F3EA` (Warm parchment background, readable, accessible)
- **Ethiopian Gold:** `#D6A84F` (Achievement, warmth, accent highlights)

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom palette
- **Database & Auth:** Supabase PostgreSQL & Supabase Auth
- **Email Dispatch:** Resend API (with local development logging fallback)
- **Media:** Cloudinary support + authentic local photographic archives
- **Hosting:** Vercel deployment ready

---

## 🎪 Performing Arts Troupes Featured

1. **Troupe African Pride** (8 Members) — High-voltage banquine, Cyr wheel, human pyramids, free ladder, rola bola.
2. **Troupe Gamo Bayira** (5 Members) — Hoop diving, Chinese pole, cube manipulation, club and hat juggling.
3. **Troupe Black Lioness** (4 Members) — Dynamic female power troupe, trio balance, antipode (foot juggling), hula hoop.
4. **Arba Minch Yoga Brothers** (2 Members) — Samuel Filto & Dagmawi Babena; extreme front/back contortion and joint dislocations.
5. **Kefeni — Queen of Gamo** (Solo Artist) — Kefeni Teshome; world-class solo contortionist.

---

## 📦 What We Offer (Live Packages)

- Professional Circus Performances
- Dance (Traditional Ethiopian & Contemporary Fusion)
- Giant Puppets & Walking Puppets
- Cultural Community Theater
- Traditional Music & Instrumentals
- Youth Performing Arts Workshops & Masterclasses
- Costume Production Studio
- Prop Production Workshop
- Music & Video Studio
- Gymnastics & Athletic Fitness Coaching

---

## 🔐 Administrative CMS Portal

- **URL:** `/admin` (Login at `/admin/login`)
- **Demo Passphrase:** `amepac-admin-2026`
- **Capabilities:**
  - View, filter, and track performance booking requests
  - Review donor pledges and partnership inquiries
  - Inspect troupe rosters and scheduled events

---

## 🚀 Setup & Local Development

1. **Clone repository & install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure environment variables:**
   Copy `.env.example` to `.env.local` and configure your Supabase and Resend keys:
   ```bash
   cp .env.example .env.local
   ```

3. **Database Schema:**
   Run `supabase/schema.sql` in your Supabase SQL Editor.

4. **Start Development Server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.
