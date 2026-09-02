document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    pt: {
      nav:{company:"Empresa",portfolio:"Portifólio",products:"Produtos",media:"Na mídia",contact:"Fale Conosco",aria:"Navegação principal"},
      menu:{home:"Home",company:"Empresa",portfolio:"Portfólio",products:"Produtos",media:"Na mídia",contact:"Fale Conosco",open:"Abrir menu",close:"Fechar menu",aria:"Menu de navegação"}
    },
    en: {
      nav:{company:"Company",portfolio:"Portfolio",products:"Products",media:"Press",contact:"Contact us",aria:"Main navigation"},
      menu:{home:"Home",company:"Company",portfolio:"Portfolio",products:"Products",media:"Press",contact:"Contact us",open:"Open menu",close:"Close menu",aria:"Mobile navigation"}
    }
  };

  const select = document.querySelector("[data-lang-select]");
  if (!select) return;

  const apply = (language) => {
    const t = translations[language] || translations.pt;
    document.documentElement.lang = language === "en" ? "en-US" : "pt-BR";

    document.querySelectorAll("[data-i18n-nav]").forEach((el) => {
      const key = el.dataset.i18nNav;
      if (t.nav[key]) el.textContent = t.nav[key];
    });

    document.querySelectorAll("[data-mobile-i18n]").forEach((el) => {
      const key = el.dataset.mobileI18n;
      if (t.menu[key]) el.textContent = t.menu[key];
    });

    const label = document.querySelector("[data-lang-label]");
    const flag = document.querySelector("[data-flag-image]");
    if (label) label.textContent = language === "en" ? "EN" : "PT";
    if (flag) {
      flag.src = language === "en" ? "/images/GBR.png" : "/images/BRA.png";
      flag.alt = language === "en" ? "United Kingdom" : "Brasil";
    }
  };

  apply(select.value);
  select.addEventListener("change", (event) => apply(event.target.value));
});
