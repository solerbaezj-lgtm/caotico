document.addEventListener("DOMContentLoaded", () => {
  /* Inicializar iconos de Lucide */
  if (window.lucide) {
    lucide.createIcons();
  }

  /* Menú móvil */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Cerrar menú de navegación"
          : "Abrir menú de navegación"
      );
    });

    /* Cerrar menú al seleccionar un enlace */
    document.querySelectorAll("#mobile-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Abrir menú de navegación"
        );
      });
    });
  }

  /* Animaciones al entrar en pantalla */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    /* Fallback para navegadores antiguos */
    revealElements.forEach((element) => {
      element.classList.add("in-view");
    });
  }

  /* Altura real del viewport en móviles */
  function updateViewportHeight() {
    const viewportHeight = window.innerHeight * 0.01;

    document.documentElement.style.setProperty(
      "--vh",
      `${viewportHeight}px`
    );
  }

  updateViewportHeight();

  window.addEventListener(
    "resize",
    updateViewportHeight,
    { passive: true }
  );
});