document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const screens = document.querySelectorAll(".screen");

  // Navegar entre seções
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = link.getAttribute("data-target");

      screens.forEach((screen) => {
        if (screen.id === target) {
          screen.classList.add("active");
          screen.classList.remove("hidden");
        } else {
          screen.classList.remove("active");
          screen.classList.add("hidden");
        }
      });
    });
  });

  // Modal para ampliar imagens com navegação
  const galleryItems = document.querySelectorAll(".gallery-item");
  let currentImageIndex = 0; // Índice da imagem atual

  const openModal = (index) => {
    currentImageIndex = index;

    // Criar o modal
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";

    // Criar a imagem ampliada
    const modalImage = document.createElement("img");
    modalImage.src = galleryItems[currentImageIndex].src;
    modalImage.style.maxWidth = "90%";
    modalImage.style.maxHeight = "90%";
    modalImage.style.borderRadius = "8px";

    // Criar botão de fechamento
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "20px";
    closeButton.style.right = "20px";
    closeButton.style.fontSize = "24px";
    closeButton.style.color = "#fff";
    closeButton.style.background = "none";
    closeButton.style.border = "none";
    closeButton.style.cursor = "pointer";

    // Fechar o modal
    closeButton.addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    // Botões de navegação
    const createNavButton = (direction) => {
      const button = document.createElement("button");
      button.textContent = direction === "prev" ? "<" : ">";
      button.style.position = "absolute";
      button.style.top = "50%";
      button.style[direction === "prev" ? "left" : "right"] = "20px";
      button.style.fontSize = "36px";
      button.style.color = "#fff";
      button.style.background = "none";
      button.style.border = "none";
      button.style.cursor = "pointer";
      button.style.transform = "translateY(-50%)";

      button.addEventListener("click", () => {
        currentImageIndex =
          (currentImageIndex + (direction === "prev" ? -1 : 1) + galleryItems.length) %
          galleryItems.length;
        modalImage.src = galleryItems[currentImageIndex].src;
      });

      return button;
    };

    const prevButton = createNavButton("prev");
    const nextButton = createNavButton("next");

    // Adicionar elementos ao modal
    modal.appendChild(modalImage);
    modal.appendChild(closeButton);
    modal.appendChild(prevButton);
    modal.appendChild(nextButton);
    document.body.appendChild(modal);
  };

  // Abrir modal ao clicar em uma imagem
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openModal(index));
  });
});
