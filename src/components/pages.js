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
  const stats = copy.stats || [];
  const testimonials = copy.testimonials || [];
  return `
    <section class="hero-section">
      <span class="hero-watermark" aria-hidden="true">SVARGA</span>
      <div class="container hero-layout">
        <div class="hero-side start">
          <p class="eyebrow">${page.eyebrow}</p>
          <p class="lead">${page.intro}</p>
          <div class="hero-cta-row">
            <a class="pill-button primary" href="${routeWithLang("courses", copy.code)}">${copy.ctaLearn}</a>
          </div>
        </div>
        <div class="hero-portrait">
          <img src="${assets.mosheHero}" alt="Moshe Ostrovsky" />
        </div>
        <div class="hero-side end">
          <h1>${page.title}</h1>
          <p class="lead">${page.lead}</p>
          <div class="hero-cta-row">
            <a class="pill-button" href="${routeWithLang("contact", copy.code)}">${copy.pages.contact.title}</a>
          </div>
        </div>
      </div>
    </section>
    ${stats.length ? `
    <section class="section compact-top">
      <div class="container">
        <div class="stats-band reveal">
          ${stats.map(([num, label]) => `<div class="stat"><strong>${num}</strong><span>${label}</span></div>`).join("")}
        </div>
      </div>
    </section>` : ""}
    <section class="section muted-band">
      <div class="container media-split">
        <figure class="image-frame reveal"><img src="${assets.practice}" alt="" /></figure>
        <div class="text-stack reveal">
          <p class="eyebrow">${copy.ui.fitLabel}</p>
          <h2>${copy.home.fitTitle}</h2>
          <p>${copy.home.fitLead}</p>
          <ul class="check-list">${copy.home.fitItems.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow">${copy.ui.pillarsLabel}</p>
          <h2>${copy.home.pillarsTitle}</h2>
        </div>
        <div class="pillars-grid">
          ${copy.pillars.map(([title, text]) => `<article class="reveal"><span></span><h3>${title}</h3><p>${text}</p></article>`).join("")}
        </div>
      </div>
    </section>
    <section class="section compact-top">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow">${copy.ui.programsLabel}</p>
          <h2>${copy.pages.courses.title}</h2>
        </div>
        <div class="cards-grid">${programDirectionCards(copy)}</div>
      </div>
    </section>
    ${testimonials.length ? `
    <section class="section testimonials-band">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow">${copy.ui.testimonialsLabel}</p>
          <h2>${copy.pages.testimonials.title}</h2>
        </div>
        <div class="testimonials-grid">
          ${testimonials.map(([quote, name, role]) => testimonialCard(quote, name, role)).join("")}
        </div>
        <div class="action-row reveal" style="margin-top: 1.6rem; justify-content: center;">
          <a class="pill-button" href="${routeWithLang("testimonials", copy.code)}">${copy.details}</a>
        </div>
      </div>
    </section>` : ""}
    <section class="section">
      <div class="container">
        <div class="cta-panel reveal">
          <div>
            <h2>${copy.home.bannerTitle}</h2>
            <p>${copy.home.bannerText}</p>
          </div>
          <a class="pill-button light" href="${routeWithLang("contact", copy.code)}">${copy.ctaLearn}</a>
        </div>
      </div>
    </section>
  `;
}

export function masterPage(copy) {
  const bio = copy.masterBio || {};
  const certs = copy.certifications || [];
  const traditions = copy.traditions || [];
  const courseSummary = copy.courseSummary || [];
  return `
    ${pageHero(copy.pages.master)}
    <section class="section">
      <div class="container media-split">
        <div class="text-stack reveal">
          <p>${bio.intro || ""}</p>
          ${(bio.paragraphs || []).map((p) => `<p>${p}</p>`).join("")}
        </div>
        <figure class="image-frame master-portrait reveal"><img src="${assets.moshePortrait}" alt="Moshe Ostrovsky" onerror="this.onerror=null;this.src='${assets.mosheBowl}';" /></figure>
      </div>
    </section>
    ${traditions.length ? `
    <section class="section muted-band">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow">${copy.ui.methodLabel}</p>
          <h2>${bio.svargaTitle || ""}</h2>
          <p class="lead">${bio.svargaLead || ""}</p>
        </div>
        <div class="traditions-grid">
          ${traditions.map(([name, text], i) => `
            <article class="tradition-card reveal">
              <span class="tradition-index">${String(i + 1).padStart(2, "0")}</span>
              <h3>${name}</h3>
              <p>${text}</p>
            </article>
          `).join("")}
        </div>
        ${bio.syncLine ? `<p class="sync-line reveal">${bio.syncLine}</p>` : ""}
      </div>
    </section>` : ""}
    ${courseSummary.length ? `
    <section class="section">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow">${copy.ui.programsLabel}</p>
          <h2>${copy.pages.courses.title}</h2>
        </div>
        <div class="summary-list">
          ${courseSummary.map(([name, text]) => `
            <article class="summary-item reveal">
              <h3>${name}</h3>
              <p>${text}</p>
            </article>
          `).join("")}
        </div>
        <div class="action-row reveal" style="margin-top: 1.4rem;">
          <a class="pill-button primary" href="${routeWithLang("courses", copy.code)}">${copy.details}</a>
        </div>
      </div>
    </section>` : ""}
    ${certs.length ? `
    <section class="section">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow">${copy.ui.certsLabel}</p>
          <h2>${copy.ui.certsLabel}</h2>
        </div>
        <div class="cert-grid">
          ${certs.map(([title, body, image]) => `
            <article class="cert-card reveal">
              ${image ? `<div class="cert-image"><img src="${image}" alt="${title}" loading="lazy" /></div>` : `<div class="cert-seal" aria-hidden="true">✦</div>`}
              <h3>${title}</h3>
              <p>${body}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>` : ""}
    ${(copy.testimonials || []).length ? testimonialsSection(copy, "muted-band") : ""}
  `;
}

export function svargaPage(copy) {
  const page = copy.pages.svarga;
  const traditions = copy.traditions || [];
  const transformations = copy.transformations || [];
  return `
    ${pageHero(page)}
    <section class="section">
      <div class="container media-split">
        <figure class="image-frame reveal"><img src="${assets.practice}" alt="" /></figure>
        <div class="text-stack reveal">
          <p class="eyebrow">${copy.ui.methodLabel}</p>
          <h2>${copy.home.fitTitle}</h2>
          <p>${copy.home.fitLead}</p>
          <ul class="check-list">${copy.home.fitItems.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
      </div>
    </section>
    ${traditions.length ? `
    <section class="section muted-band">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow">${copy.ui.traditionsLabel}</p>
          <h2>${copy.ui.traditionsLabel}</h2>
        </div>
        <div class="traditions-grid">
          ${traditions.map(([name, text], i) => `
            <article class="tradition-card reveal">
              <span class="tradition-index">${String(i + 1).padStart(2, "0")}</span>
              <h3>${name}</h3>
              <p>${text}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>` : ""}
    ${transformations.length ? `
    <section class="section">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow">${copy.ui.transformationsLabel}</p>
          <h2>${copy.ui.transformationsLabel}</h2>
        </div>
        <ul class="transformation-list">
          ${transformations.map((text, i) => `<li class="reveal"><span class="t-index">${String(i + 1).padStart(2, "0")}</span><p>${text}</p></li>`).join("")}
        </ul>
      </div>
    </section>` : ""}
    ${(copy.testimonials || []).length ? testimonialsSection(copy, "muted-band") : ""}
  `;
}

export function programPage(copy, id) {
  const page = copy.pages[id];
  const cards = copy.programCards[id] || [];
  const retreatPrograms = id === "retreat" ? (copy.retreatPrograms || []) : [];
  const notice = id === "marathon" ? copy.marathonNotice : null;
  return `
    ${pageHero(page)}
    ${notice ? `
    <section class="section compact-top">
      <div class="container narrow">
        <p class="notice reveal">${notice}</p>
      </div>
    </section>` : ""}
    <section class="section ${notice ? "compact-top" : ""}">
      <div class="container">
        <div class="cards-grid">
          ${cards.map(([title, text, image, slug], index) => programCard(copy, title, text, image || [assets.movement, assets.blog, assets.practice][index % 3], slug || "contact")).join("")}
        </div>
      </div>
    </section>
    ${retreatPrograms.length ? `
    <section class="section muted-band">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow">${copy.ui.retreatsLabel}</p>
          <h2>${copy.ui.retreatsLabel}</h2>
        </div>
        <div class="retreat-blocks">
          ${retreatPrograms.map((r) => `
            <article class="retreat-block reveal">
              <p class="eyebrow">${r.eyebrow}</p>
              <h3>${r.title}</h3>
              <p class="retreat-lead">${r.lead}</p>
              <ul class="retreat-items">${r.items.map((item) => `<li>${item}</li>`).join("")}</ul>
              <p class="retreat-outcome">${r.outcome}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>` : ""}
    <section class="section">
      <div class="container">
        <div class="cta-panel reveal">
          <div>
            <h2>${copy.home.bannerTitle}</h2>
            <p>${copy.home.bannerText}</p>
          </div>
          <a class="pill-button light" href="${routeWithLang("contact", copy.code)}">${copy.ctaLearn}</a>
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
                <article class="article-card reveal">
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
      <div class="container article-body reveal">
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
                <article class="faq-item reveal ${index === 0 ? "is-open" : ""}">
                  <button type="button"><span>${String(index + 1).padStart(2, "0")}. ${question}</span></button>
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
        <section class="contact-card reveal">
          <h2>${page.title}</h2>
          <p>${page.lead}</p>
          <ul>
            <li><a href="mailto:${copy.contacts.email}">${copy.contacts.email}</a></li>
            <li><a href="tel:${copy.contacts.phoneHref}">${copy.contacts.phone}</a></li>
            <li><a href="${copy.contacts.whatsapp}" target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li><a href="${copy.contacts.telegram}" target="_blank" rel="noreferrer">Telegram</a></li>
            <li><a href="${copy.contacts.instagram}" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="${copy.contacts.youtube}" target="_blank" rel="noreferrer">YouTube</a></li>
            <li><a href="${copy.contacts.tiktok}" target="_blank" rel="noreferrer">TikTok</a></li>
            <li><a href="${copy.contacts.facebook}" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="${copy.contacts.site}" target="_blank" rel="noreferrer">${copy.siteLabel}</a></li>
            <li><a href="${digitalCardFor(copy)}" target="_blank" rel="noreferrer">${copy.digitalCard}</a></li>
          </ul>
        </section>
        <form class="contact-form reveal" data-contact-form novalidate>
          <div class="form-status" data-form-status role="status" aria-live="polite">${copy.formDemo}</div>
          <label>${copy.name}<input name="name" autocomplete="name" required /></label>
          <label>${copy.emailLabel}<input name="email" type="email" autocomplete="email" required /></label>
          <label>${copy.phone}<input name="phone" autocomplete="tel" required /></label>
          <label>${copy.message}<textarea name="message" required></textarea></label>
          <input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off" />
          <div class="form-recaptcha" data-recaptcha></div>
          <label class="form-checkbox"><input type="checkbox" name="not_a_robot" required /> <span>${copy.robotCheck}</span></label>
          <button class="pill-button primary" type="submit" data-submit-button>${copy.send}</button>
        </form>
      </div>
    </section>
  `;
}

export function testimonialsPage(copy) {
  const items = copy.fullTestimonials || copy.testimonials || [];
  return `
    ${pageHero(copy.pages.testimonials)}
    <section class="section">
      <div class="container">
        <div class="testimonials-grid wide">
          ${items.map(([quote, name, role]) => testimonialCard(quote, name, role)).join("")}
        </div>
      </div>
    </section>
    <section class="section muted-band">
      <div class="container">
        <div class="cta-panel reveal">
          <div>
            <h2>${copy.home.bannerTitle}</h2>
            <p>${copy.home.bannerText}</p>
          </div>
          <a class="pill-button light" href="${routeWithLang("contact", copy.code)}">${copy.ctaLearn}</a>
        </div>
      </div>
    </section>
  `;
}

export function practicePage(copy) {
  const blocks = copy.practiceBlocks || [];
  const poseCaps = copy.poseCaptions || ["Дыхание", "Раскрытие", "Внутренняя сила"];
  return `
    ${pageHero(copy.pages.practice)}
    <section class="section compact-top">
      <div class="container">
        <div class="poses-strip reveal">
          <figure class="pose-figure">
            <div class="pose-frame"><img src="${assets.mosheBowl}" alt="" onerror="this.onerror=null;this.src='${assets.mosheHero}';" /></div>
            <figcaption>${poseCaps[0]}</figcaption>
          </figure>
          <figure class="pose-figure">
            <div class="pose-frame"><img src="${assets.mosheShoulder}" alt="" onerror="this.onerror=null;this.src='${assets.mosheHero}';" /></div>
            <figcaption>${poseCaps[1]}</figcaption>
          </figure>
          <figure class="pose-figure">
            <div class="pose-frame"><img src="${assets.mosheWushu}" alt="" onerror="this.onerror=null;this.src='${assets.mosheHero}';" /></div>
            <figcaption>${poseCaps[2]}</figcaption>
          </figure>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="practice-blocks">
          ${blocks.map((b) => `
            <article class="practice-block reveal">
              <h3>${b.title}</h3>
              <p>${b.text}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
    <section class="section muted-band">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow">${copy.ui.programsLabel}</p>
          <h2>${copy.pages.courses.title}</h2>
        </div>
        <div class="cards-grid">${programDirectionCards(copy)}</div>
      </div>
    </section>
  `;
}

export function programDetailPage(copy, slug) {
  const detail = (copy.programDetails || {})[slug];
  const card = findCardBySlug(copy, slug);
  if (!card || !detail) {
    return simplePage(copy, "home");
  }
  const [title, lead, image] = card;
  const category = slug.split("-")[0];
  const backRoute = category === "course" ? "courses" : category === "marathon" ? "marathon" : "retreat";
  const backLabel = copy.pages[backRoute]?.title || copy.details;
  const meta = [
    [copy.detailFormatLabel || "Формат", detail.format],
    [copy.detailDurationLabel || "Длительность", detail.duration],
    [copy.detailAudienceLabel || "Для кого", detail.audience],
  ].filter(([, v]) => v);

  return `
    <section class="page-hero">
      <div class="container detail-hero-grid">
        <div class="detail-hero-copy">
          <p class="eyebrow">${copy.pages[backRoute]?.eyebrow || ""}</p>
          <h1>${title}</h1>
          <p class="lead">${lead}</p>
          <a class="text-link back-link" href="${routeWithLang(backRoute, copy.code)}">← ${backLabel}</a>
        </div>
        <figure class="detail-hero-image">
          <img src="${image}" alt="" onerror="this.onerror=null;this.src='/assets/svarga-practice.webp';" />
        </figure>
      </div>
    </section>
    <section class="section">
      <div class="container detail-layout">
        <div class="detail-body">
          ${(detail.body || [lead]).map((p) => `<p>${p}</p>`).join("")}
        </div>
        <aside class="detail-meta">
          ${meta.map(([k, v]) => `
            <div class="meta-row">
              <span class="meta-key">${k}</span>
              <span class="meta-val">${v}</span>
            </div>
          `).join("")}
          <a class="pill-button primary detail-cta" href="${routeWithLang("contact", copy.code)}">${copy.ctaLearn}</a>
        </aside>
      </div>
    </section>
    ${detail.testimonial ? `
    <section class="section muted-band">
      <div class="container narrow">
        <article class="testimonial-card reveal detail-testimonial">
          <p class="quote">${detail.testimonial[0]}</p>
          <div class="testimonial-author">
            <span class="author-dot" aria-hidden="true"></span>
            <div><strong>${detail.testimonial[1]}</strong><br />${detail.testimonial[2] || ""}</div>
          </div>
        </article>
      </div>
    </section>` : ""}
  `;
}

function findCardBySlug(copy, slug) {
  for (const cat of Object.keys(copy.programCards || {})) {
    const found = copy.programCards[cat].find((c) => c[3] === slug);
    if (found) return found;
  }
  return null;
}

export function simplePage(copy, id) {
  const page = copy.pages[id] || copy.pages.home;
  const paragraphs = copy.simpleBodies[id] || [page.lead];
  return `
    ${pageHero(page)}
    <section class="section">
      <div class="container media-split simple-layout">
        <div class="text-stack reveal">${paragraphs.map((text) => `<p>${text}</p>`).join("")}</div>
        <figure class="image-frame reveal"><img src="${imageFor(id)}" alt="" /></figure>
      </div>
    </section>
  `;
}

function testimonialsSection(copy, modifier = "") {
  const list = copy.testimonials || [];
  return `
    <section class="section ${modifier}">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow">${copy.ui.testimonialsLabel}</p>
          <h2>${copy.pages.testimonials.title}</h2>
        </div>
        <div class="testimonials-grid">
          ${list.map(([quote, name, role]) => testimonialCard(quote, name, role)).join("")}
        </div>
        <div class="action-row reveal" style="margin-top: 1.6rem; justify-content: center;">
          <a class="pill-button" href="${routeWithLang("testimonials", copy.code)}">${copy.details}</a>
        </div>
      </div>
    </section>
  `;
}

function testimonialCard(quote, name, role) {
  return `
    <article class="testimonial-card reveal">
      <p class="quote">${quote}</p>
      <div class="testimonial-author">
        <span class="author-dot" aria-hidden="true"></span>
        <div><strong>${name}</strong><br />${role}</div>
      </div>
    </article>
  `;
}

function programDirectionCards(copy) {
  return copy.directions.map(([id, title, text, image]) => programCard(copy, title, text, image, id)).join("");
}

function programCard(copy, title, text, image, link = "contact") {
  const fallback = "/assets/svarga-practice.webp";
  const hasDetail = copy.programDetails && copy.programDetails[link];
  return `
    <article class="program-card reveal">
      <img src="${image}" alt="" loading="lazy" onerror="this.onerror=null;this.src='${fallback}';" />
      <div class="program-card-body">
        ${!hasDetail ? `<span class="tag">${copy.tagsSoon}</span>` : ""}
        <h3>${title}</h3>
        <p>${text}</p>
        <a class="text-link" href="${routeWithLang(link, copy.code)}">${copy.details}</a>
      </div>
    </article>
  `;
}

function digitalCardFor(copy) {
  if (copy.code === "he") return copy.contacts.digitalCardHe;
  return copy.contacts.digitalCardRu;
}

function imageFor(id) {
  if (["master", "testimonials", "account"].includes(id)) return assets.mosheHero;
  if (["svarga", "practice", "events"].includes(id)) return assets.movement;
  return assets.blog;
}
