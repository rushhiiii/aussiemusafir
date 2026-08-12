# AussieMusafir — Private Car Tours Across Victoria

A modern, responsive website for booking private car tours across Victoria, Australia.

## Pages & Structure

- `index.html` — Main landing page featuring tour packages, price comparison, custom trip planner, reviews, and FAQ.
- `trip-great-ocean-road.html` — Great Ocean Road tour details & itinerary.
- `trip-mornington-peninsula.html` — Mornington Peninsula tour details & itinerary.
- `trip-phillip-island.html` — Phillip Island tour details & itinerary.
- `trip-yarra-valley.html` — Yarra Valley tour details & itinerary.
- `_headers` & `_routes.json` — Pre-configured Cloudflare Pages routing and security headers.

---

## 🚀 How to Host on Cloudflare Pages

### Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `aussiemusafir-tourism` or `tourism-website`).
3. Set the repository visibility to **Public** or **Private**.
4. Leave "Add a README" **unchecked** (since this project already includes one).
5. Click **Create repository**.

### Step 2: Push Local Code to GitHub
Run the following commands in your project terminal:
```bash
git init
git add .
git commit -m "Initial commit: Tourism website ready for Cloudflare Pages"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```
*(Replace `YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub details).*

---

### Step 3: Link GitHub Repository to Cloudflare Pages
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. On the left navigation bar, go to **Workers & Pages**.
3. Click **Create application** > Select the **Pages** tab.
4. Click **Connect to Git**.
5. Authorize Cloudflare to access your GitHub account and select your repository (`aussiemusafir-tourism`).
6. Configure deployment settings:
   - **Project name**: `aussiemusafir` (or any name you choose)
   - **Production branch**: `main`
   - **Framework preset**: `None`
   - **Build command**: *(Leave blank)*
   - **Build output directory**: `/` *(or leave as root directory)*
7. Click **Save and Deploy**.

🎉 **That's it!** Cloudflare Pages will build and publish your site in seconds and provide a live URL (`https://<project-name>.pages.dev`). Any future `git push` to your `main` branch will automatically re-deploy your site.
