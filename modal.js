function initModal() {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");
  document.body.appendChild(overlay);
}

function openModal(modal) {
  try {
    document.body.style.overflow = "hidden";
    const overlay = document.querySelector(".modal-overlay");

    overlay.classList.add("modal-overlay-open");
    overlay.addEventListener("click", () => closeModal(modal));

    modal.classList.add("open");
  } catch (err) {
    console.error("Du må kjøre initModal()");
    console.error(err);
  }
}

function closeModal(modal) {
  try {
    document.body.style.overflow = "auto";

    const overlay = document.querySelector(".modal-overlay");
    overlay.classList.remove("modal-overlay-open");

    overlay.removeEventListener("click", () => closeModal(modal));

    modal.classList.remove("open");
  } catch (err) {
    console.error("Du må kjøre initModal()");
    console.error(err);
  }
}

document.onkeydown = function (evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    try {
      const modal = document.querySelector(".open");
      if (modal === null) return;
      closeModal(modal);
    } catch (err) {
      return;
    }
  }
};