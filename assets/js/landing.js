(function () {
  var carousel = document.querySelector("[data-feature-carousel]");
  if (!carousel) return;

  var visualSlides = Array.prototype.slice.call(
    carousel.querySelectorAll(".feature-carousel-visual [data-feature-slide]")
  );
  var copySlides = Array.prototype.slice.call(
    carousel.querySelectorAll(".feature-carousel-copy [data-feature-slide]")
  );
  var dots = Array.prototype.slice.call(
    carousel.querySelectorAll("[data-feature-dot]")
  );
  var prevButton = carousel.querySelector("[data-feature-prev]");
  var nextButton = carousel.querySelector("[data-feature-next]");

  var slideCount = visualSlides.length;
  if (!slideCount || slideCount !== copySlides.length) return;

  var activeIndex = 0;
  var timerId = null;
  var intervalMs = 4000;

  function setSlideState(nodes, index) {
    nodes.forEach(function (node, i) {
      var isActive = i === index;
      node.hidden = !isActive;
      node.setAttribute("aria-hidden", isActive ? "false" : "true");
    });
  }

  function setActive(index) {
    activeIndex = (index + slideCount) % slideCount;
    setSlideState(visualSlides, activeIndex);
    setSlideState(copySlides, activeIndex);
    dots.forEach(function (dot, i) {
      var isActive = i === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
    });
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

  setActive(0);
})();
