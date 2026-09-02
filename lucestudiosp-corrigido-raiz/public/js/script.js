document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".contact-form-common, #contact-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const msg = form.querySelector(".footer-form-message") || document.getElementById("form-msg");
      if (msg) {
        msg.hidden = false;
        window.setTimeout(() => { msg.hidden = true; }, 4000);
      }
      form.reset();
    });
  });

  const button = document.getElementById("mobileMenuButton");
  const menu = document.getElementById("mobileNav");
  if (button && menu) {
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      button.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
      menu.setAttribute("aria-hidden", String(open));
      menu.classList.toggle("is-open", !open);
      document.body.classList.toggle("menu-open", !open);
    });

    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Abrir menu");
      menu.setAttribute("aria-hidden", "true");
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    }));
  }
});