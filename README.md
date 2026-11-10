# this day website

Website for the [This Day](https://apps.apple.com/us/app/this-day-photo-cleaner/id6758584686) iOS app, hosted on GitHub Pages.

**URL:** [https://rckim77.github.io/thisday-site](https://rckim77.github.io/thisday-site)

## Pages


| Path        | Content                             |
| ----------- | ----------------------------------- |
| `/`         | Marketing landing page              |
| `/privacy/` | Privacy Policy (in-app privacy URL) |
| `/terms/`   | Terms of Use                        |


## Local preview

From the project directory:

```bash
bundle install          # first time only (gems install to vendor/bundle)
bundle exec jekyll serve
```

Then open in your browser:

- **Landing page:** [http://127.0.0.1:4000/thisday-site/](http://127.0.0.1:4000/thisday-site/)
- **Privacy policy:** [http://127.0.0.1:4000/thisday-site/privacy/](http://127.0.0.1:4000/thisday-site/privacy/)
- **Terms:** [http://127.0.0.1:4000/thisday-site/terms/](http://127.0.0.1:4000/thisday-site/terms/)

The server auto-rebuilds when you save files. Stop it with `Ctrl+C` in the terminal.

### Regenerate screenshots

Framed iPhone 17 Pro screenshots are generated from the This Day app repo. By default, the script uses the reviewed DM Sans captures in `app-store-slides/v2.6.0/inputs/iphone/en_US` and emits 1085px-wide site assets. The paywall is framed from `assets/images/raw/premium-paywall.png`:

```bash
./scripts/prepare-assets.swift
```

The app screenshots reuse the November 8 captures prepared for the 2.6.0 listing. The real RevenueCat paywall was captured on November 10 from Debug 2.7.0 (92). Input provenance and hashes are recorded in `assets/images/screenshot-sources.json`.

The script looks for sibling checkouts at `../thisday` and `../app-store-slides-tool`. It reads the frame image path from the selected iPhone slide config, falling back to the slides tool’s frame directory. Set `THISDAY_IPHONE_FRAME` to override that path. Override the checkouts or screenshot source when needed:

```bash
THISDAY_APP_ROOT=/path/to/thisday \
APP_STORE_SLIDES_TOOL_ROOT=/path/to/app-store-slides-tool \
THISDAY_SCREENSHOT_VERSION=v2.6.0 \
THISDAY_SCREENSHOT_DEVICE=iphone \
THISDAY_SCREENSHOT_LOCALE=en_US \
./scripts/prepare-assets.swift
```

## Typography

Site text uses DM Sans, including navigation, headings, and legal pages. The header wordmark retains its original serif font stack. The normal and italic variable fonts (Latin subset, weights 100–1000) are self-hosted in `assets/fonts/` from [Google Fonts](https://fonts.google.com/specimen/DM+Sans), with the SIL Open Font License included in `assets/fonts/OFL.txt`.

## Deploy

Push to `main`; GitHub Pages builds automatically.

**Important:** This repository must remain public for GitHub Pages to serve the site. Do not make the repo private unless GitHub Pages hosting has been moved to a plan or setup that supports private repositories.
