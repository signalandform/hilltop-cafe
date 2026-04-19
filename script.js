const yearEl = document.getElementById("current-year");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

(function () {
  var gallery = document.querySelector(".hero-gallery");
  if (!gallery) return;

  var track = gallery.querySelector(".hero-gallery-track");
  var images = track.querySelectorAll("img");
  var dotsWrap = gallery.querySelector(".hero-gallery-dots");
  var total = images.length;
  var current = 0;
  var interval;
  var DELAY = 4000;

  track.style.transform = "translateX(0)";

  images.forEach(function (_, i) {
    var dot = document.createElement("button");
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

  var startX = 0;
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

(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open");
  });

  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    }
  });
})();
