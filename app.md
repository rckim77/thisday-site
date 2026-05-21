---
layout: landing
title: This Day
permalink: /app/
---

<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      {% include brand.html large=true width="80" height="80" %}
      <h1>Turn decluttering into a daily habit</h1>
      <p class="hero-lead">
        This Day shows photos and videos from this calendar day in past years—so you can review memories in small batches, free up storage, and never feel overwhelmed by your whole library.
      </p>
      <div class="hero-cta">
        <a class="app-store-badge" href="https://apps.apple.com/us/app/this-day-photo-cleaner/id6758584686" rel="noopener" aria-label="Download on the App Store">
          <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" alt="Download on the App Store" width="250" height="83">
        </a>
      </div>
      <p class="hero-press">
        <span class="hero-press-label">Featured in 9to5Mac</span>
        “Instead of showing you tens of thousands of photos at once, This Day takes a more focused approach… it becomes just a few minute process every day.”
        <a href="https://9to5mac.com/2026/05/02/indie-app-spotlight-this-day-photo-cleanup-tool/" rel="noopener">Read the Indie App Spotlight</a>
      </p>
    </div>
    <div class="hero-visual">
      <img
        class="device-frame device-frame--hero"
        src="{{ '/assets/images/devices/hero-gallery.png' | relative_url }}"
        alt="This Day gallery view showing photos from the same day across prior years"
        width="405"
        height="828"
        loading="eager"
      >
    </div>
  </div>
</section>

<section id="features" class="section">
  <div class="container">
    <header class="section-header">
      <h2>Features</h2>
    </header>

    <div class="feature-carousel" data-feature-carousel>
      <div class="feature-carousel-layout">
        <div class="feature-carousel-visual">
          <figure class="feature-slide" data-feature-slide aria-hidden="false">
            <img class="device-frame device-frame--feature" src="{{ '/assets/images/devices/feature-live-photos.png' | relative_url }}" alt="Convert Live Photos to stills to save storage" width="405" height="828">
          </figure>
          <figure class="feature-slide" data-feature-slide hidden aria-hidden="true">
            <img class="device-frame device-frame--feature" src="{{ '/assets/images/devices/feature-daily-review.png' | relative_url }}" alt="Gallery of photos from today's date in past years" width="405" height="828">
          </figure>
          <figure class="feature-slide" data-feature-slide hidden aria-hidden="true">
            <img class="device-frame device-frame--feature" src="{{ '/assets/images/devices/feature-duplicates.png' | relative_url }}" alt="Review and delete exact duplicate photos" width="405" height="828">
          </figure>
          <figure class="feature-slide" data-feature-slide hidden aria-hidden="true">
            <img class="device-frame device-frame--feature" src="{{ '/assets/images/devices/feature-reminders.png' | relative_url }}" alt="Daily reminder settings in This Day" width="405" height="828">
          </figure>
          <figure class="feature-slide" data-feature-slide hidden aria-hidden="true">
            <img class="device-frame device-frame--feature" src="{{ '/assets/images/devices/feature-milestones.png' | relative_url }}" alt="Storage milestones and achievements" width="405" height="828">
          </figure>
          <figure class="feature-slide" data-feature-slide hidden aria-hidden="true">
            <img class="device-frame device-frame--feature" src="{{ '/assets/images/devices/feature-memories.png' | relative_url }}" alt="Relive and share memories from past years" width="405" height="828">
          </figure>
        </div>

        <div class="feature-carousel-copy">
          <article class="feature-panel" data-feature-slide aria-hidden="false">
            <p class="feature-kicker">Storage saver</p>
            <h3>Convert Live Photos</h3>
            <p>Turn Live Photos into stills to reclaim space without losing the shot you care about.</p>
          </article>
          <article class="feature-panel" data-feature-slide hidden aria-hidden="true">
            <p class="feature-kicker">Daily review</p>
            <h3>One day at a time</h3>
            <p>See only what you captured on today’s date across prior years—so each session stays short and manageable.</p>
          </article>
          <article class="feature-panel" data-feature-slide hidden aria-hidden="true">
            <p class="feature-kicker">Smart cleanup</p>
            <h3>Delete duplicates</h3>
            <p>Find exact duplicates in your results and remove them in bulk when you are ready.</p>
          </article>
          <article class="feature-panel" data-feature-slide hidden aria-hidden="true">
            <p class="feature-kicker">Stay on track</p>
            <h3>Daily reminders</h3>
            <p>Schedule a gentle nudge at the time that works for you and build a cleanup streak.</p>
          </article>
          <article class="feature-panel" data-feature-slide hidden aria-hidden="true">
            <p class="feature-kicker">Motivation</p>
            <h3>Achieve milestones</h3>
            <p>Celebrate storage you have reclaimed with progress milestones that make habit-building satisfying.</p>
          </article>
          <article class="feature-panel" data-feature-slide hidden aria-hidden="true">
            <p class="feature-kicker">Your library</p>
            <h3>Relive memories</h3>
            <p>Keep the photos that matter, share favorites through the iOS share sheet, and delete only when you confirm.</p>
          </article>

          <div class="feature-carousel-controls" aria-label="Feature carousel controls">
            <button type="button" class="feature-nav" data-feature-prev aria-label="Previous feature">←</button>
            <div class="feature-dots" role="tablist" aria-label="Features">
              <button type="button" class="feature-dot is-active" data-feature-dot role="tab" aria-selected="true" aria-label="Convert Live Photos"></button>
              <button type="button" class="feature-dot" data-feature-dot role="tab" aria-selected="false" aria-label="One day at a time"></button>
              <button type="button" class="feature-dot" data-feature-dot role="tab" aria-selected="false" aria-label="Delete duplicates"></button>
              <button type="button" class="feature-dot" data-feature-dot role="tab" aria-selected="false" aria-label="Daily reminders"></button>
              <button type="button" class="feature-dot" data-feature-dot role="tab" aria-selected="false" aria-label="Achieve milestones"></button>
              <button type="button" class="feature-dot" data-feature-dot role="tab" aria-selected="false" aria-label="Relive memories"></button>
            </div>
            <button type="button" class="feature-nav" data-feature-next aria-label="Next feature">→</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="premium" class="section section--alt">
  <div class="container">
    <header class="section-header">
      <h2>Premium</h2>
      <p>Go further with an optional subscription—cancel anytime in your Apple Account settings.</p>
    </header>
    <div class="premium-layout">
      <div class="premium-copy">
        <p class="premium-intro">Unlock Premium Access to get the most out of your library cleanup:</p>
        <ul class="premium-list">
          <li>Load all your past memories</li>
          <li>Convert unlimited Live Photos</li>
          <li>Delete unlimited duplicates</li>
          <li>Filter by more options (e.g., video only)</li>
          <li>Unlock premium app icons</li>
        </ul>
        <p class="premium-pricing">Plans from <strong>$2.49/mo</strong> billed yearly ($29.99/yr) or <strong>$3.99/mo</strong> monthly. A free trial may be available with the annual plan.</p>
      </div>
      <figure class="premium-visual">
        <img
          class="device-frame device-frame--premium"
          src="{{ '/assets/images/devices/premium-paywall.png' | relative_url }}"
          alt="This Day Premium subscription screen showing yearly and monthly plans"
          width="405"
          height="828"
          loading="lazy"
        >
      </figure>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <header class="section-header">
      <h2>Your photos never leave your phone</h2>
    </header>
    <div class="trust-grid">
      <div class="trust-item">
        <span class="trust-check" aria-hidden="true">✓</span>
        <div>
          <strong>On-device processing</strong>
          <p>Core features run locally through Apple’s Photos APIs. We don’t upload your library to our servers.</p>
        </div>
      </div>
      <div class="trust-item">
        <span class="trust-check" aria-hidden="true">✓</span>
        <div>
          <strong>No ads or data sales</strong>
          <p>No third-party advertising SDKs. We don’t sell your personal information.</p>
        </div>
      </div>
      <div class="trust-item">
        <span class="trust-check" aria-hidden="true">✓</span>
        <div>
          <strong>Transparent subscriptions</strong>
          <p>Premium is optional. Billing is handled by Apple; restore purchases anytime from the app.</p>
        </div>
      </div>
      <div class="trust-item">
        <span class="trust-check" aria-hidden="true">✓</span>
        <div>
          <strong>Clear policies</strong>
          <p>Read our <a href="{{ '/' | relative_url }}">Privacy Policy</a> and <a href="{{ '/terms' | relative_url }}">Terms of Use</a> anytime.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="cta-band">
  <div class="container">
    <h2>Ready to reclaim storage?</h2>
    <p>Download This Day free and start with today’s memories from years past.</p>
    <a class="app-store-badge" href="https://apps.apple.com/us/app/this-day-photo-cleaner/id6758584686" rel="noopener" aria-label="Download on the App Store">
      <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" alt="Download on the App Store" width="250" height="83">
    </a>
  </div>
</section>
