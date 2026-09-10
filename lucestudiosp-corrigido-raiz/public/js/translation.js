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
        media: "Na mídia",
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
        media: "Press",
        products: "Products",
        contact: "Contact us",
        open: "Open menu",
        close: "Close menu",
        aria: "Mobile navigation",
      },
    },
  };

  const footerTranslations = {
    pt: {
      email: "E-mail *",
      name: "Nome *",
      subject: "Assunto",
      message: "Mensagem",
      contactTitle: "Fale conosco",
      success: "Mensagem enviada com sucesso!",
      rights: "Todos os direitos reservados.",
      mapTitle: "Localização da Luce Studio em São Paulo",
      social: "Redes sociais",
    },
    en: {
      email: "Email *",
      name: "Name *",
      subject: "Subject",
      message: "Message",
      contactTitle: "Contact us",
      success: "Message sent successfully!",
      rights: "All rights reserved.",
      mapTitle: "Luce Studio location in São Paulo",
      social: "Social media",
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

  const applyFooterLanguage = (language) => {
    const selected = footerTranslations[language] || footerTranslations.pt;

    document.querySelectorAll("[data-i18n-footer]").forEach((item) => {
      const key = item.dataset.i18nFooter;
      if (selected[key]) item.textContent = selected[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((item) => {
      const key = item.dataset.i18nPlaceholder;
      if (selected[key]) item.placeholder = selected[key];
    });

    document.querySelectorAll("[data-i18n-social]").forEach((item) => {
      item.setAttribute("aria-label", selected.social);
    });

    document.querySelectorAll("[data-i18n-map-title]").forEach((item) => {
      item.title = selected.mapTitle;
    });
  };

  const langSelect = document.querySelector("[data-lang-select]");
  if (!langSelect) return;

  const storedLanguage = window.localStorage.getItem("luce-language");
  if (storedLanguage && translations[storedLanguage]) {
    langSelect.value = storedLanguage;
  }

  const syncLanguage = (language) => {
    applyHeaderLanguage(language);
    applyMobileLanguage(language);
    applyFooterLanguage(language);
  };

  syncLanguage(langSelect.value);

  langSelect.addEventListener("change", (event) => {
    window.localStorage.setItem("luce-language", event.target.value);
    syncLanguage(event.target.value);
  });
});
