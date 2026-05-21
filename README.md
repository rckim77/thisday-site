# This Day — Website

Marketing landing page and legal pages for the [This Day](https://apps.apple.com/us/app/this-day-photo-cleaner/id6758584686) iOS app, hosted on GitHub Pages.

## Pages

| Path | Content |
|------|---------|
| `/` | Privacy Policy (in-app privacy URL) |
| `/app/` | Marketing landing page |
| `/terms/` | Terms of Use |

`/privacy/` redirects to `/` for backward compatibility.

## Local preview

From the project directory:

```bash
bundle install          # first time only (gems install to vendor/bundle)
bundle exec jekyll serve
```

Then open in your browser:

- **Landing page:** http://127.0.0.1:4000/thisday-site/app/
- **Privacy policy:** http://127.0.0.1:4000/thisday-site/
- **Terms:** http://127.0.0.1:4000/thisday-site/terms/

The server auto-rebuilds when you save files. Stop it with `Ctrl+C` in the terminal.

### Regenerate screenshots

Framed iPhone 17 Pro screenshots are generated from the This Day app repo:

```bash
./scripts/prepare-assets.swift
```

Requires the `thisday` and `app-store-slides-tool` checkouts at the paths used in that script.

## Deploy

Push to `main`; GitHub Pages builds automatically.
