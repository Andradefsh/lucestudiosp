(() => {
  const floatingMenu = document.querySelector(".floating-menu");
  const menuToggle = document.getElementById("menuToggle");

  const setMenuState = (isOpen) => {
    if (!floatingMenu || !menuToggle) return;

    floatingMenu.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuPanel.setAttribute("aria-hidden", String(!isOpen));
    menuPanel.inert = !isOpen;
  };

  const menuPanel = document.getElementById("menuPanel");

  setMenuState(false);

  menuToggle.addEventListener("click", () => {
    const isOpen = !floatingMenu.classList.contains("open");
    setMenuState(isOpen);
  });

  menuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && floatingMenu.classList.contains("open")) {
      setMenuState(false);
      menuToggle.focus();
    }
  });
})();