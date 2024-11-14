// Mobile menu toggling

let menuToggle = document.getElementById("hamburger-menu-icon");
let mobileMenu = document.getElementById("mobile-menu-list");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("open--mobile--menu");
});
