# Goldcoin Solana Token Website v2

Premium static landing page built with HTML, CSS, and vanilla JavaScript. It is ready for GitHub Pages and requires no build system.

## Before publishing

Open `index.html` and replace every occurrence of:

- `PUMPFUN_LINK_HERE`
- `CONTRACT_ADDRESS_HERE`

Review all wording, links, roadmap items, and creator-fee statements before the official launch.

## GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder to the repository root.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)` folder.
6. Open the generated Pages URL without adding `/index.html`.

## Local preview

Double-clicking `index.html` works, but the address bar will show the local file path. That is normal. For a cleaner local preview, run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.
