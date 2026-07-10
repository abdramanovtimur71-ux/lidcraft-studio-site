(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Parse "−14 ч/нед" -> { prefix: "−", value: 14, suffix: " ч/нед", decimals: 0 }
  function parseStat(text) {
    var match = text.match(/^(\D*?)([\d]+(?:[.,]\d+)?)(.*)$/u);
    if (!match) return null;
    var raw = match[2].replace(",", ".");
    var decimals = raw.indexOf(".") >= 0 ? raw.split(".")[1].length : 0;
    return {
      prefix: match[1],
      value: parseFloat(raw),
      suffix: match[3],
      decimals: decimals,
      separator: match[2].indexOf(",") >= 0 ? "," : ".",
    };
  }

  function formatNumber(value, decimals, separator) {
    var fixed = value.toFixed(decimals);
    return separator === "," ? fixed.replace(".", ",") : fixed;
  }

  function animateStat(el) {
    var original = el.textContent.trim();
    var parsed = parseStat(original);
    if (!parsed) return;

    if (reduceMotion) {
      el.textContent = original;
      return;
    }

    var duration = 1400;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      // easeOutExpo
      var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      var current = parsed.value * eased;
      el.textContent =
        parsed.prefix +
        formatNumber(current, parsed.decimals, parsed.separator) +
        parsed.suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = original;
      }
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var stats = Array.prototype.slice.call(
      document.querySelectorAll(".stat-num")
    );
    if (!stats.length) return;

    if (!("IntersectionObserver" in window)) {
      stats.forEach(animateStat);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = "1";
            animateStat(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    stats.forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCounters);
  } else {
    initCounters();
  }
})();
