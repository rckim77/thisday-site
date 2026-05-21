(function () {
  var carousel = document.querySelector("[data-feature-carousel]");
  if (!carousel) return;

  var visualSlides = Array.prototype.slice.call(
    carousel.querySelectorAll("[data-feature-visual-slide]")
  );
  var copySlides = Array.prototype.slice.call(
    carousel.querySelectorAll("[data-feature-copy-slide]")
  );
  var copyViewport = carousel.querySelector("[data-feature-copy-viewport]");
  var dots = Array.prototype.slice.call(
    carousel.querySelectorAll("[data-feature-dot]")
  );
  var prevButton = carousel.querySelector("[data-feature-prev]");
  var nextButton = carousel.querySelector("[data-feature-next]");

  var slideCount = visualSlides.length;
  if (!slideCount || slideCount !== copySlides.length || !copyViewport) {
    return;
  }

  var activeIndex = 0;
  var timerId = null;
  var intervalMs = 5000;
  var transitionMs = 700;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function syncCopyHeight() {
    var activePanel = copySlides[activeIndex];
    if (!activePanel) return;
    copyViewport.style.minHeight = activePanel.offsetHeight + "px";
  }

  function setAria(index) {
    visualSlides.forEach(function (slide, i) {
      slide.setAttribute("aria-hidden", i === index ? "false" : "true");
    });
    copySlides.forEach(function (slide, i) {
      slide.setAttribute("aria-hidden", i === index ? "false" : "true");
    });
    dots.forEach(function (dot, i) {
      var isActive = i === index;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function setActive(index, direction) {
    var nextIndex = (index + slideCount) % slideCount;
    if (nextIndex === activeIndex) return;

    carousel.setAttribute("data-direction", direction || "next");

    visualSlides[activeIndex].classList.remove("is-active");
    copySlides[activeIndex].classList.remove("is-active");

    activeIndex = nextIndex;

    visualSlides[activeIndex].classList.add("is-active");
    copySlides[activeIndex].classList.add("is-active");

    setAria(activeIndex);

    window.requestAnimationFrame(syncCopyHeight);
    window.setTimeout(function () {
      carousel.removeAttribute("data-direction");
      syncCopyHeight();
    }, transitionMs);
  }

  function stopTimer() {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function startTimer() {
    stopTimer();
    timerId = window.setInterval(function () {
      setActive(activeIndex + 1, "next");
    }, intervalMs);
  }

  function goTo(index) {
    if (index === activeIndex) return;
    var direction = index > activeIndex ? "next" : "prev";
    if (index === 0 && activeIndex === slideCount - 1) {
      direction = "next";
    } else if (index === slideCount - 1 && activeIndex === 0) {
      direction = "prev";
    }
    setActive(index, direction);
    startTimer();
  }

  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      goTo(index);
    });
  });

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      setActive(activeIndex - 1, "prev");
      startTimer();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      setActive(activeIndex + 1, "next");
      startTimer();
    });
  }

  carousel.addEventListener("mouseenter", stopTimer);
  carousel.addEventListener("mouseleave", startTimer);
  carousel.addEventListener("focusin", stopTimer);
  carousel.addEventListener("focusout", function (event) {
    if (!carousel.contains(event.relatedTarget)) {
      startTimer();
    }
  });

  window.addEventListener("resize", syncCopyHeight);

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            startTimer();
          } else {
            stopTimer();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(carousel);
  } else {
    startTimer();
  }

  if (prefersReducedMotion) {
    carousel.classList.add("feature-carousel--reduced-motion");
  }

  setAria(activeIndex);
  syncCopyHeight();
})();
