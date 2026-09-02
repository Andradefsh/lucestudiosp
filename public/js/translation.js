document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    pt: {
      nav: {
        company: "Empresa",
        portfolio: "Portifólio",
        media: "Na mídia",
        products: "Produtos",
        contact: "Fale Conosco",
        aria: "Navegação principal",
      },
      menu: {
        home: "Home",
        company: "Empresa",
        portfolio: "Portfólio",
        products: "Produtos",
        contact: "Fale Conosco",
        open: "Abrir menu",
        close: "Fechar menu",
        aria: "Menu de navegação",
      },
    },
    en: {
      nav: {
        company: "Company",
        portfolio: "Portfolio",
        media: "Press",
        products: "Products",
        contact: "Contact us",
        aria: "Main navigation",
      },
      menu: {
        home: "Home",
        company: "Company",
        portfolio: "Portfolio",
        products: "Products",
        contact: "Contact us",
        open: "Open menu",
        close: "Close menu",
        aria: "Mobile navigation",
      },
    },
  };

  const applyHeaderLanguage = (language) => {
    const flagImage = document.querySelector("[data-flag-image]");
    const langLabel = document.querySelector("[data-lang-label]");
    const navAria = document.querySelector("[data-nav-aria]");
    const navItems = document.querySelectorAll("[data-i18n-nav]");

    const selected = translations[language] || translations.pt;

    if (flagImage) {
      const isPortuguese = language === "pt";
      flagImage.src = isPortuguese
        ? "https://flagcdn.com/w20/br.png"
        : "https://flagcdn.com/w20/gb.png";
      flagImage.alt = isPortuguese ? "Brasil" : "United Kingdom";
    }

    if (langLabel) {
      langLabel.textContent = language === "pt" ? "PT" : "EN";
    }

    navItems.forEach((item) => {
      const key = item.dataset.i18nNav;
      if (selected.nav[key]) {
        item.textContent = selected.nav[key];
      }
    });

    if (navAria) {
      navAria.setAttribute("aria-label", selected.nav.aria);
    }

    document.documentElement.lang = language === "pt" ? "pt-BR" : "en-US";
  };

  const applyMobileLanguage = (language) => {
    const floatingMenu = document.querySelector(".floating-menu");
    const menuToggle = document.getElementById("menuToggle");
    const selected = translations[language] || translations.pt;
    const items = document.querySelectorAll("[data-mobile-i18n]");

    items.forEach((item) => {
      const key = item.dataset.mobileI18n;
      if (selected.menu[key]) {
        item.textContent = selected.menu[key];
      }
    });

    if (floatingMenu) {
      floatingMenu.setAttribute("aria-label", selected.menu.aria);
    }

    if (menuToggle) {
      const isOpen = floatingMenu && floatingMenu.classList.contains("open");
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? selected.menu.close : selected.menu.open,
      );
    }
  };

  const langSelect = document.querySelector("[data-lang-select]");
  if (!langSelect) return;

  const syncLanguage = (language) => {
    applyHeaderLanguage(language);
    applyMobileLanguage(language);
  };

  syncLanguage(langSelect.value);

  langSelect.addEventListener("change", (event) => {
    syncLanguage(event.target.value);
  });
});
