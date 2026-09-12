document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     ICONOS LUCIDE
  ========================= */

  if (window.lucide) {
    lucide.createIcons();
  }


  /* =========================
     MENÚ MÓVIL
  ========================= */

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

    document
      .querySelectorAll("#mobile-menu a")
      .forEach((link) => {

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


  /* =========================
     ANIMACIONES AL HACER SCROLL
  ========================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "in-view"
            );

            observer.unobserve(
              entry.target
            );
          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("in-view");
    });

  }


  /* =========================
     ALTURA REAL DEL VIEWPORT
  ========================= */

  function updateViewportHeight() {

    const viewportHeight =
      window.innerHeight * 0.01;

    document.documentElement.style.setProperty(
      "--vh",
      `${viewportHeight}px`
    );
  }


  updateViewportHeight();


  /* Actualizar al cambiar tamaño */

  window.addEventListener(
    "resize",
    updateViewportHeight,
    { passive: true }
  );


  /* Actualizar al cambiar orientación */

  window.addEventListener(
    "orientationchange",
    () => {
      setTimeout(
        updateViewportHeight,
        150
      );
    },
    { passive: true }
  );


  /* =========================
     CERRAR MENÚ SI PASAMOS A DESKTOP
  ========================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth >= 1024 &&
        mobileMenu &&
        menuToggle
      ) {

        mobileMenu.classList.remove(
          "open"
        );

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Abrir menú de navegación"
        );
      }

    },
    { passive: true }
  );
});
