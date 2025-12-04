document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.getElementById("btnMenu");
  const navMenu = document.getElementById("navMenu");

  const items = document.querySelectorAll(".navContainer__containerLinks__links");
  const sections = document.querySelectorAll(".dynamicContainer");

  items.forEach(item => {
    item.addEventListener("click", () => {
      const target = item.dataset.target;

      //Quitar activos del menú
      items.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      //Cambiar contenido
      sections.forEach(sec => {
        sec.classList.toggle("active", sec.dataset.section === target);
      });
    });
  });

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
});