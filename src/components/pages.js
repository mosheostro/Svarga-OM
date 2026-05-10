import { assets } from "../data/content.js";

function routeWithLang(route, code) {
  return `#/${route}?lang=${code}`;
}

export function pageHero(page) {
  return `
    <section class="page-hero">
      <div class="container page-hero-grid">
        <div>
          <p class="eyebrow">${page.eyebrow}</p>
          <h1>${page.title}</h1>
          <p class="lead">${page.lead}</p>
        </div>
      </div>
    </section>
  `;
}

export function homePage(copy) {
  const page = copy.pages.home;
  return `
    <section class="hero-section">
      <div class="container hero-layout">
        <div class="hero-copy">
          <img class="hero-wordmark" src="${assets.logoWord}" alt="Svarga" />
          <p class="eyebrow">${page.eyebrow}</p>
          <h1>${page.title}</h1>
          <p class="lead">${page.lead}</p>
          <div class="action-row">
            <a class="pill-button primary" href="${routeWithLang("courses", copy.code)}">${copy.ctaLearn}</a>
            <a class="pill-button" href="${routeWithLang("contact", copy.code)}">${copy.pages.contact.title}</a>
          </div>
        </div>
        <div class="hero-portrait">
          <img src="${assets.mosheHero}" alt="Moshe Ostrovski" />
        </div>
      </div>
    </section>
    <section class="section muted-band">
      <div class="container media-split">
        <figure class="image-frame"><img src="${assets.practice}" alt="" /></figure>
        <div class="text-stack">
          <p class="eyebrow">${copy.ui.methodLabel}</p>
          <h2>${copy.home.fitTitle}</h2>
          <p>${copy.home.fitLead}</p>
          <ul class="check-list">${copy.home.fitItems.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">${copy.ui.pillarsLabel}</p>
          <h2>${copy.home.pillarsTitle}</h2>
        </div>
        <div class="pillars-grid">
          ${copy.pillars.map(([title, text]) => `<article><span></span><h3>${title}</h3><p>${text}</p></article>`).join("")}
        </div>
      </div>
    </section>
    <section class="section compact-top">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">${copy.ui.programsLabel}</p>
          <h2>${copy.pages.courses.title}</h2>
        </div>
        <div class="cards-grid">${programDirectionCards(copy)}</div>
        <div class="cta-panel">
          <div>
            <h2>${copy.home.bannerTitle}</h2>
            <p>${copy.home.bannerText}</p>
          </div>
          <a class="pill-button light" href="${routeWithLang("courses", copy.code)}">${copy.ctaLearn}</a>
        </div>
      </div>
    </section>
  `;
}

export function programPage(copy, id) {
  const page = copy.pages[id];
  return `
    ${pageHero(page)}
    <section class="section">
      <div class="container">
        <p class="notice">${page.placeholder}</p>
        <div class="cards-grid">
          ${copy.programCards[id].map(([title, text], index) => programCard(copy, title, text, [assets.movement, assets.blog, assets.practice][index])).join("")}
        </div>
      </div>
    </section>
  `;
}

export function blogPage(copy) {
  return `
    ${pageHero(copy.pages.blog)}
    <section class="section">
      <div class="container">
        <div class="article-grid">
          ${copy.articles
            .map(
              (post) => `
                <article class="article-card">
                  <img src="${post.image}" alt="" />
                  <div>
                    <p class="eyebrow">${copy.ui.journalLabel}</p>
                    <h2>${post.title}</h2>
                    <p>${post.excerpt}</p>
                    <a class="text-link" href="${routeWithLang(`post-${post.slug}`, copy.code)}">${copy.read}</a>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

export function articlePage(copy, post) {
  return `
    ${pageHero({ eyebrow: copy.ui.journalLabel, title: post.title, lead: post.excerpt })}
    <article class="section">
      <div class="container article-body">
        <img src="${post.image}" alt="" />
        ${post.body.map((text) => `<p>${text}</p>`).join("")}
      </div>
    </article>
  `;
}

export function faqPage(copy) {
  return `
    ${pageHero(copy.pages.faq)}
    <section class="section">
      <div class="container narrow">
        <div class="faq-list">
          ${copy.faq
            .map(
              ([question, answer], index) => `
                <article class="faq-item ${index === 0 ? "is-open" : ""}">
                  <button type="button">${question}</button>
                  <div class="faq-answer"><p>${answer}</p></div>
                </article>
              `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

export function contactPage(copy) {
  const page = copy.pages.contact;
  return `
    ${pageHero(page)}
    <section class="section">
      <div class="container contact-layout">
        <section class="contact-card">
          <h2>${page.title}</h2>
          <p>${page.lead}</p>
          <ul>
            <li><a href="mailto:${copy.contacts.email}">${copy.contacts.email}</a></li>
            <li><a href="tel:${copy.contacts.phoneHref}">${copy.contacts.phone}</a></li>
            <li><a href="${copy.contacts.whatsapp}" target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li><a href="${copy.contacts.telegram}" target="_blank" rel="noreferrer">Telegram</a></li>
          </ul>
        </section>
        <form class="contact-form" data-contact-form>
          <label>${copy.name}<input name="name" autocomplete="name" required /></label>
          <label>${copy.phone}<input name="phone" autocomplete="tel" required /></label>
          <label>${copy.message}<textarea name="message" required></textarea></label>
          <button class="pill-button primary" type="submit">${copy.send}</button>
        </form>
      </div>
    </section>
  `;
}

export function simplePage(copy, id) {
  const page = copy.pages[id] || copy.pages.home;
  const paragraphs = copy.simpleBodies[id] || [page.lead];
  return `
    ${pageHero(page)}
    <section class="section">
      <div class="container media-split simple-layout">
        <div class="text-stack">${paragraphs.map((text) => `<p>${text}</p>`).join("")}</div>
        <figure class="image-frame"><img src="${imageFor(id)}" alt="" /></figure>
      </div>
    </section>
  `;
}

function programDirectionCards(copy) {
  return copy.directions.map(([id, title, text, image]) => programCard(copy, title, text, image, id)).join("");
}

function programCard(copy, title, text, image, link = "contact") {
  return `
    <article class="program-card">
      <img src="${image}" alt="" />
      <div class="program-card-body">
        <span class="tag">${copy.soon}</span>
        <h3>${title}</h3>
        <p>${text}</p>
        <a class="text-link" href="${routeWithLang(link, copy.code)}">${copy.details}</a>
      </div>
    </article>
  `;
}

function imageFor(id) {
  if (["master", "testimonials", "account"].includes(id)) return assets.mosheHero;
  if (["svarga", "practice", "events"].includes(id)) return assets.movement;
  return assets.blog;
}
