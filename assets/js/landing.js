(function () {
  var carousel = document.querySelector("[data-feature-carousel]");
  if (!carousel) return;

  var visualTrack = carousel.querySelector("[data-feature-visual-track]");
  var copyTrack = carousel.querySelector("[data-feature-copy-track]");
  var copyViewport = carousel.querySelector(".feature-copy-viewport");
  var visualSlides = visualTrack
    ? Array.prototype.slice.call(visualTrack.querySelectorAll("[data-feature-slide]"))
    : [];
  var copySlides = copyTrack
    ? Array.prototype.slice.call(copyTrack.querySelectorAll("[data-feature-slide]"))
    : [];
  var dots = Array.prototype.slice.call(
    carousel.querySelectorAll("[data-feature-dot]")
  );
  var prevButton = carousel.querySelector("[data-feature-prev]");
  var nextButton = carousel.querySelector("[data-feature-next]");

  var slideCount = visualSlides.length;
  if (!slideCount || slideCount !== copySlides.length || !visualTrack || !copyTrack) {
    return;
  }

  var activeIndex = 0;
  var timerId = null;
  var intervalMs = 4000;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setTrackOffset(track, index) {
    track.style.transform = "translate3d(-" + index * 100 + "%, 0, 0)";
  }

  function syncCopyHeight() {
    if (!copyViewport) return;
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

  function setActive(index) {
    activeIndex = (index + slideCount) % slideCount;
    setTrackOffset(visualTrack, activeIndex);
    setTrackOffset(copyTrack, activeIndex);
    setAria(activeIndex);
    window.requestAnimationFrame(syncCopyHeight);
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
      setActive(activeIndex + 1);
    }, intervalMs);
  }

  function goTo(index) {
    if (index === activeIndex) return;
    setActive(index);
    startTimer();
  }

  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      goTo(index);
    });
  });

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      goTo(activeIndex - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      goTo(activeIndex + 1);
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
    visualTrack.style.transition = "none";
    copyTrack.style.transition = "none";
  }

  setActive(0);
  syncCopyHeight();
})();
