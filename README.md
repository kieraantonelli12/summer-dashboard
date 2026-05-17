# Summer 2026 Dashboard

Personal life dashboard for graduating college, summer transition, and career launch.

## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:5173

## First-time GitHub Pages deploy

1. Create a new GitHub repo (private or public, your call)
2. Push this folder to the repo:
   ```bash
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**
4. Under "Source", select **GitHub Actions**
5. Watch the **Actions** tab — the workflow will build and deploy automatically
6. Once green, your site is live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Future updates

Just push to `main`. GitHub Actions rebuilds and redeploys on every push.

## Customize

Edit `src/App.jsx`:

- Top of the file: `GRADUATION_DATE`, `SUMMER_END_DATE`
- `GREETINGS` array: change the rotating headlines
- `INITIAL_BUCKETS` array: add, rename, or replace tasks and bucket settings
- Swap photo URLs in each bucket's `photo` field for your own aesthetic
