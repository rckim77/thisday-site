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

Framed iPhone 17 Pro screenshots are generated from the This Day app repo. By default, the script uses `build/AppStore/v1.16.0/iphone/en_US/raw` and emits 1085px-wide site assets:

```bash
./scripts/prepare-assets.swift
```

The script looks for sibling checkouts at `../thisday` and `../app-store-slides-tool`. Override those paths, or the screenshot source, when needed:

```bash
THISDAY_APP_ROOT=/path/to/thisday \
APP_STORE_SLIDES_TOOL_ROOT=/path/to/app-store-slides-tool \
THISDAY_SCREENSHOT_VERSION=v1.16.0 \
THISDAY_SCREENSHOT_DEVICE=iphone \
THISDAY_SCREENSHOT_LOCALE=en_US \
./scripts/prepare-assets.swift
```

## Deploy

Push to `main`; GitHub Pages builds automatically.

**Important:** This repository must remain public for GitHub Pages to serve the site. Do not make the repo private unless GitHub Pages hosting has been moved to a plan or setup that supports private repositories.
