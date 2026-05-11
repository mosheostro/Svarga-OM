import { assets } from "../data/content.js";

function routeWithLang(route, code) {
  return `#/${route}?lang=${code}`;
}

export function shell(copy, route) {
  return `
    <a class="skip-link" href="#main">${copy.skip}</a>
    <header class="site-header" data-header>
      <div class="header-inner">
        <button class="menu-button" type="button" data-menu-toggle aria-label="${copy.openMenu}" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <a class="brand" href="${routeWithLang("home", copy.code)}" aria-label="Svarga">
          <img src="${assets.logoWide}" alt="Svarga" />
        </a>
        <div class="header-actions">
          <a class="cart-button" href="${routeWithLang("courses", copy.code)}" aria-label="${copy.cart}">
            <span class="cart-glyph"></span><span class="cart-count">0</span>
          </a>
          <a class="account-link" href="${routeWithLang("account", copy.code)}">${copy.account}</a>
          <button type="button" class="theme-button" data-theme-toggle aria-label="${copy.themeLabel}">
            <span data-theme-label>${copy.themeDark}</span>
          </button>
          <div class="language-switch" aria-label="${copy.langName}">
            <a data-set-lang="ru" href="#/${route}?lang=ru">RU</a>
            <a data-set-lang="en" href="#/${route}?lang=en">EN</a>
            <a data-set-lang="de" href="#/${route}?lang=de">DE</a>
            <a data-set-lang="he" href="#/${route}?lang=he">HE</a>
          </div>
        </div>
      </div>
    </header>
    <nav class="drawer" data-drawer aria-label="${copy.openMenu}" aria-hidden="true">
      <div class="drawer-image">
        <span class="drawer-watermark" aria-hidden="true">SVARGA</span>
        <img src="${assets.mosheMenu}" alt="" />
      </div>
      <div class="drawer-panel">
        <p class="drawer-wordmark" aria-hidden="true">SVARGA</p>
        <ul class="drawer-menu">
          ${copy.menu
            .map(([id, title]) => `<li><a class="${route === id ? "is-current" : ""}" href="${routeWithLang(id, copy.code)}">${title}</a></li>`)
            .join("")}
        </ul>
        <div class="drawer-social">
          <a href="${copy.contacts.instagram}" target="_blank" rel="noreferrer">Instagram</a>
          <a href="${copy.contacts.youtube}" target="_blank" rel="noreferrer">YouTube</a>
          <a href="${copy.contacts.tiktok}" target="_blank" rel="noreferrer">TikTok</a>
          <a href="${copy.contacts.facebook}" target="_blank" rel="noreferrer">Facebook</a>
          <a href="${copy.contacts.whatsapp}" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="${copy.contacts.telegram}" target="_blank" rel="noreferrer">Telegram</a>
        </div>
      </div>
    </nav>
    <main id="main" tabindex="-1"></main>
    <footer class="site-footer">
      <div class="footer-grid">
        <section class="footer-about">
          <img src="${assets.logoYellow}" alt="Svarga" />
          <p>${copy.footer.intro}</p>
          <div class="footer-contact">
            <a href="mailto:${copy.contacts.email}">${copy.contacts.email}</a>
            <a href="tel:${copy.contacts.phoneHref}">${copy.contacts.phone}</a>
          </div>
        </section>
        ${footerColumn(copy.footer.primaryTitle, copy.footer.primary, copy.code)}
        ${footerColumn(copy.footer.secondaryTitle, copy.footer.secondary, copy.code)}
      </div>
      <div class="footer-bottom">
        <p>${copy.footer.credit}</p>
        <p>${copy.footer.craft}</p>
      </div>
    </footer>
  `;
}

function footerColumn(title, links, code) {
  return `
    <section class="footer-column">
      <h2>${title}</h2>
      <ul>${links.map(([id, label]) => `<li><a href="${routeWithLang(id, code)}" data-lang-route="${id}">${label}</a></li>`).join("")}</ul>
    </section>
  `;
}
