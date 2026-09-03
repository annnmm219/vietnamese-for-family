(() => {
  const sidebar = document.getElementById("lesson-sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  const openButton = document.getElementById("lesson-menu-button");
  const closeButton = document.getElementById("sidebar-close");

  if (!sidebar || !backdrop || !openButton || !closeButton) return;

  function openSidebar() {
    sidebar.classList.add("open");
    backdrop.classList.add("open");
    document.body.classList.add("sidebar-open");
    sidebar.setAttribute("aria-hidden", "false");
    openButton.setAttribute("aria-expanded", "true");
    closeButton.focus();
  }

  function closeSidebar(returnFocus = false) {
    sidebar.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.classList.remove("sidebar-open");
    sidebar.setAttribute("aria-hidden", "true");
    openButton.setAttribute("aria-expanded", "false");
    if (returnFocus) openButton.focus();
  }

  openButton.addEventListener("click", openSidebar);
  closeButton.addEventListener("click", () => closeSidebar(true));
  backdrop.addEventListener("click", () => closeSidebar(true));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && sidebar.classList.contains("open")) {
      closeSidebar(true);
    }
  });

  sidebar.addEventListener("click", event => {
    if (event.target.closest("[data-lesson-id]")) {
      closeSidebar(false);
    }
  });
})();
