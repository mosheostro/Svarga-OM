import { dictionary, routes } from "./data/content.js";
import { shell } from "./components/layout.js";
import { articlePage, blogPage, contactPage, faqPage, homePage, masterPage, practicePage, programDetailPage, programPage, simplePage, svargaPage, testimonialsPage } from "./components/pages.js";
import "./styles/main.css";

const app = document.querySelector("#app");
const langKey = "svarga-lang";
const themeKey = "svarga-theme";
let lang = localStorage.getItem(langKey) || "ru";
let theme = localStorage.getItem(themeKey) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

let revealObserver = null;

function getRoute() {
  const raw = window.location.hash.replace(/^#\/?/, "");
  return (raw.split("?")[0] || "home").replace(/^\/+/, "");
}

function getHashLang() {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const query = raw.includes("?") ? raw.slice(raw.indexOf("?") + 1) : "";
  const next = new URLSearchParams(query).get("lang");
  return dictionary[next] ? next : null;
}

function copy() {
  return dictionary[lang];
}

function applyTheme(content) {
  document.body.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
  const label = document.querySelector("[data-theme-label]");
  if (label) {
    label.textContent = theme === "dark" ? content.themeLight : content.themeDark;
  }
}

function setupReveal() {
  if (revealObserver) revealObserver.disconnect();
  if (typeof IntersectionObserver === "undefined") {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
}

function render() {
  const hashLang = getHashLang();
  if (hashLang && hashLang !== lang) {
    lang = hashLang;
    localStorage.setItem(langKey, lang);
  }
  const route = getRoute();
  const content = copy();
  document.documentElement.lang = lang;
  document.documentElement.dir = content.dir;
  document.title = `${content.pages[route]?.title || "Svarga"} | Svarga International`;
  document.body.classList.remove("has-menu-open");
  app.innerHTML = shell(content, route);
  renderMain(route, content);
  applyTheme(content);
  bindChrome(content);
  setupReveal();
}

function renderMain(route, content) {
  const main = document.querySelector("#main");
  const postSlug = route.startsWith("post-") ? route.slice(5) : null;
  const post = postSlug ? content.articles.find((item) => item.slug === postSlug) : null;
  const isProgramDetail = /^(course|marathon|retreat)-/.test(route);

  if (post) main.innerHTML = articlePage(content, post);
  else if (isProgramDetail && content.programDetails && content.programDetails[route]) main.innerHTML = programDetailPage(content, route);
  else if (route === "home" || (!routes.includes(route) && !isProgramDetail)) main.innerHTML = homePage(content);
  else if (route === "master") main.innerHTML = masterPage(content);
  else if (route === "svarga") main.innerHTML = svargaPage(content);
  else if (["courses", "marathon", "retreat"].includes(route)) main.innerHTML = programPage(content, route);
  else if (route === "blog") main.innerHTML = blogPage(content);
  else if (route === "faq") main.innerHTML = faqPage(content);
  else if (route === "contact") main.innerHTML = contactPage(content);
  else if (route === "testimonials") main.innerHTML = testimonialsPage(content);
  else if (route === "practice") main.innerHTML = practicePage(content);
  else main.innerHTML = simplePage(content, route);

  main.focus({ preventScroll: true });
}

function bindChrome(content) {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const drawer = document.querySelector("[data-drawer]");
  const themeToggle = document.querySelector("[data-theme-toggle]");

  document.querySelectorAll("[data-set-lang]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.setLang === lang);
  });

  document.querySelectorAll("[data-lang-route]").forEach((link) => {
    link.setAttribute("href", `#/${link.dataset.langRoute}?lang=${content.code}`);
  });

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      theme = theme === "light" ? "dark" : "light";
      localStorage.setItem(themeKey, theme);
      applyTheme(content);
    });
  }

  if (menuToggle && drawer) {
    menuToggle.addEventListener("click", () => {
      const open = !document.body.classList.contains("has-menu-open");
      document.body.classList.toggle("has-menu-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? content.closeMenu : content.openMenu);
      drawer.setAttribute("aria-hidden", String(!open));
    });

    drawer.addEventListener("click", (event) => {
      if (!event.target.closest("a")) return;
      document.body.classList.remove("has-menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", content.openMenu);
      drawer.setAttribute("aria-hidden", "true");
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("has-menu-open")) {
        document.body.classList.remove("has-menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", content.openMenu);
        drawer.setAttribute("aria-hidden", "true");
      }
    }, { once: true });
  }

  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".faq-item").classList.toggle("is-open"));
  });

  const form = document.querySelector("[data-contact-form]");
  if (form) {
    initContactForm(form, content);
  }
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";
let recaptchaScriptLoaded = false;
let recaptchaWidgetId = null;

function loadRecaptcha(mount) {
  if (!RECAPTCHA_SITE_KEY || !mount) return;
  const renderWidget = () => {
    if (!window.grecaptcha || recaptchaWidgetId !== null) return;
    recaptchaWidgetId = window.grecaptcha.render(mount, { sitekey: RECAPTCHA_SITE_KEY });
  };
  if (window.grecaptcha && window.grecaptcha.render) {
    renderWidget();
    return;
  }
  window.onRecaptchaLoad = renderWidget;
  if (recaptchaScriptLoaded) return;
  recaptchaScriptLoaded = true;
  const script = document.createElement("script");
  script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

function setFormStatus(form, content, kind, message) {
  const status = form.querySelector("[data-form-status]");
  if (!status) return;
  status.classList.remove("is-active", "is-error");
  if (kind === "success") status.classList.add("is-active");
  if (kind === "error") status.classList.add("is-error");
  status.textContent = message || content.formDemo;
}

function initContactForm(form, content) {
  const mount = form.querySelector("[data-recaptcha]");
  loadRecaptcha(mount);
  recaptchaWidgetId = null;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();
    const notRobot = form.querySelector('input[name="not_a_robot"]')?.checked;

    if (!name || !email || !phone || !message) {
      setFormStatus(form, content, "error", content.fieldRequired);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormStatus(form, content, "error", content.emailInvalid);
      return;
    }
    if (!notRobot) {
      setFormStatus(form, content, "error", content.robotRequired);
      return;
    }
    let recaptchaToken = "";
    if (RECAPTCHA_SITE_KEY && window.grecaptcha) {
      recaptchaToken = window.grecaptcha.getResponse(recaptchaWidgetId ?? undefined);
      if (!recaptchaToken) {
        setFormStatus(form, content, "error", content.robotRequired);
        return;
      }
    }
    const submitButton = form.querySelector("[data-submit-button]");
    const originalLabel = submitButton ? submitButton.textContent : "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = content.sending;
    }
    setFormStatus(form, content, "info", content.sending);

    const payload = {
      name,
      email,
      phone,
      message,
      _subject: `[Svarga] Contact form — ${name}`,
      _replyto: email,
      _template: "table",
      _captcha: "false",
      _honey: data.get("botcheck") || "",
    };
    if (recaptchaToken) payload["g-recaptcha-response"] = recaptchaToken;

    const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(content.contacts.email)}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      const ok = response.ok && (result.success === "true" || result.success === true || result.message);
      if (ok) {
        setFormStatus(form, content, "success", content.formSuccess || content.formDemo);
        form.reset();
        if (RECAPTCHA_SITE_KEY && window.grecaptcha && recaptchaWidgetId !== null) {
          window.grecaptcha.reset(recaptchaWidgetId);
        }
      } else {
        setFormStatus(form, content, "error", result.message || content.formError);
      }
    } catch (err) {
      setFormStatus(form, content, "error", content.formError);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }
  });
}

window.addEventListener("hashchange", () => {
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

render();
