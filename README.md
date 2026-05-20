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

```bash
bundle install
bundle exec jekyll serve
```

- Landing: http://localhost:4000/thisday-site/app/
- Privacy: http://localhost:4000/thisday-site/

## Deploy

Push to `main`; GitHub Pages builds automatically.
