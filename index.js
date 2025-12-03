document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("btnMenu");
  const navMenu = document.getElementById("navMenu");

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
});