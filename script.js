const yearEl = document.getElementById("current-year");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

(function () {
  const gallery = document.querySelector(".hero-gallery");
  if (!gallery) return;

  const track = gallery.querySelector(".hero-gallery-track");
  const images = track.querySelectorAll("img");
  const dotsWrap = gallery.querySelector(".hero-gallery-dots");
  const total = images.length;
  let current = 0;
  let interval;
  const DELAY = 4000;

  images.forEach(function (_, i) {
    const dot = document.createElement("button");
    dot.className = "hero-gallery-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Show image " + (i + 1));
    dot.addEventListener("click", function () {
      goTo(i);
      resetAutoplay();
    });
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    current = ((index % total) + total) % total;
    track.style.transform = "translateX(-" + current * 100 + "%)";
    var dots = dotsWrap.querySelectorAll(".hero-gallery-dot");
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === current);
    });
  }

  function next() {
    goTo(current + 1);
  }

  function resetAutoplay() {
    clearInterval(interval);
    interval = setInterval(next, DELAY);
  }

  let startX = 0;
  track.addEventListener("pointerdown", function (e) {
    startX = e.clientX;
  });
  track.addEventListener("pointerup", function (e) {
    var diff = e.clientX - startX;
    if (Math.abs(diff) > 40) {
      goTo(current + (diff < 0 ? 1 : -1));
      resetAutoplay();
    }
  });

  resetAutoplay();
})();
