document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".containerAliadosInternos__fourColumns__circles");
  const dotsContainer = document.querySelector(".containerAliadosInternos__controls--dots");
  const container = document.querySelector(".containerAliadosInternos__fourColumns");

  let perPage;
  let index = 0;
  let isSliding = false;
  let auto;

  function updatePerPage() {
    if (window.innerWidth < 700){
      perPage = 1;
    } else if (window.innerWidth < 900){
      perPage = 2;
    } else if (window.innerWidth < 1500) {
      perPage = 3;
    } else {
      perPage = 4;
    }
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    const totalPages = Math.ceil(items.length / perPage);

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      dot.dataset.page = i;

      dot.addEventListener("click", () => {
        index = i * perPage;
        render("right");
        resetAutoplay();
      });

      dotsContainer.appendChild(dot);
    }
  }

  function render(direction = "right") {
    if (isSliding) return;
    isSliding = true;

    const totalPages = Math.ceil(items.length / perPage);
    if (index >= items.length) index = (totalPages - 1) * perPage;
    if (index < 0) index = 0;

    items.forEach((item, i) => {
      const visible = i >= index && i < index + perPage;
      item.style.display = visible ? "block" : "none";
      item.classList.remove("slide-left", "slide-right");
    });

    setTimeout(() => {
      items.forEach((item, i) => {
        if (i >= index && i < index + perPage) {
          item.classList.add(direction === "left" ? "slide-left" : "slide-right");
        }
      });
      setTimeout(() => { isSliding = false; }, 400);
    }, 10);

    const allDots = dotsContainer.querySelectorAll(".dot");
    allDots.forEach(d => d.classList.remove("active"));
    const page = Math.floor(index / perPage);
    const activeDot = dotsContainer.querySelector(`.dot[data-page="${page}"]`);
    if (activeDot) activeDot.classList.add("active");
  }

  function next() {
    index += perPage;
    if (index >= items.length) index = 0;
    render("right");
    resetAutoplay();
  }

  function prev() {
    index -= perPage;
    if (index < 0) {
      const mod = items.length % perPage;
      index = mod === 0 ? items.length - perPage : items.length - mod;
    }
    render("left");
    resetAutoplay();
  }

  // Swipe en móvil
  if (container) {
    let startX = 0;
    let endX = 0;

    container.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });

    container.addEventListener("touchend", e => {
      endX = e.changedTouches[0].clientX;
      const diff = endX - startX;

      if (Math.abs(diff) > 60) {
        diff < 0 ? next() : prev();
      }
    });
  }

  function resetAutoplay() {
    clearInterval(auto);
    auto = setInterval(next, 5000);
  }

  updatePerPage();
  createDots();
  render();

  window.addEventListener("resize", () => {
    updatePerPage();
    createDots();
    render("right");
  });

  auto = setInterval(next, 5000);
});