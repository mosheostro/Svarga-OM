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
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const phone = (data.get("phone") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();
      const subject = `[Svarga] ${content.pages.contact.title} — ${name || "сайт"}`;
      const body = [
        `${content.name}: ${name}`,
        `${content.emailLabel}: ${email}`,
        `${content.phone}: ${phone}`,
        "",
        `${content.message}:`,
        message,
      ].join("\n");
      const mailto = `mailto:${content.contacts.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      const status = form.querySelector("[data-form-status]");
      if (status) {
        status.classList.add("is-active");
        status.textContent = content.formSuccess || content.formDemo;
      }
      form.reset();
    });
  }
}

window.addEventListener("hashchange", () => {
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

render();
