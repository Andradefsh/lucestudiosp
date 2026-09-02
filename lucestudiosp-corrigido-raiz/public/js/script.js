document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(
      ".contact-form-common, #contact-form, #footer-contact-form",
    )
    .forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const msg =
          form.querySelector(".footer-form-message") ||
          document.getElementById("form-msg");
        const button = form.querySelector("[type='submit']");
        if (button) button.disabled = true;
        if (msg) msg.classList.remove("is-success", "is-error");

        try {
          const response = await fetch(form.action || "/contato", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
              Accept: "application/json",
            },
            body: new URLSearchParams(new FormData(form)),
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.error || "Não foi possível enviar a mensagem.");
          }
          if (msg) {
            msg.textContent = result.message || "Mensagem enviada com sucesso!";
            msg.classList.add("is-success");
            msg.hidden = false;
          }
          form.reset();
        } catch (error) {
          if (msg) {
            msg.textContent =
              error.message || "Não foi possível enviar a mensagem.";
            msg.classList.add("is-error");
            msg.hidden = false;
          }
        } finally {
          if (button) button.disabled = false;
        }
      });
    });

  const button = document.getElementById("mobileMenuButton");
  const menu = document.getElementById("mobileNav");
  if (button && menu) {
    menu.inert = true;

    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      button.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
      menu.setAttribute("aria-hidden", String(open));
      menu.inert = open;
      menu.classList.toggle("is-open", !open);
      document.body.classList.toggle("menu-open", !open);
    });

    menu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Abrir menu");
        menu.setAttribute("aria-hidden", "true");
        menu.inert = true;
        menu.classList.remove("is-open");
        document.body.classList.remove("menu-open");
      }),
    );
  }
});
