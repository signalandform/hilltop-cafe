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
  var numberEl = gallery.querySelector(".hero-gallery-number");
  var total = images.length;
  if (numberEl) numberEl.textContent = "1 / " + total;
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

  function goTo(index, instant) {
    current = ((index % total) + total) % total;
    if (instant) {
      var prev = track.style.transition;
      track.style.transition = "none";
      track.style.transform = "translateX(-" + current * 100 + "%)";
      void track.offsetWidth;
      track.style.transition = prev || "";
    } else {
      track.style.transform = "translateX(-" + current * 100 + "%)";
    }
    var dots = dotsWrap.querySelectorAll(".hero-gallery-dot");
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === current);
    });
    if (numberEl) numberEl.textContent = (current + 1) + " / " + total;
  }

  function next() {
    if (current === total - 1) {
      goTo(0, true);
    } else {
      goTo(current + 1);
    }
  }

  function resetAutoplay() {
    clearInterval(interval);
    interval = setInterval(next, DELAY);
  }

  var prevBtn = gallery.querySelector(".hero-gallery-prev");
  var nextBtn = gallery.querySelector(".hero-gallery-next");
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      goTo(current - 1);
      resetAutoplay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      goTo(current + 1);
      resetAutoplay();
    });
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
