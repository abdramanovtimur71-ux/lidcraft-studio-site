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

  // ---- Universal scroll reveal (skips pages/elements already using .reveal) ----
  function initReveal() {
    // If the page already runs the legacy ".reveal" system, don't double-animate
    // its elements; but we still add reveal to elements without it.
    var selectors = [
      ".card",
      ".dashboard-card",
      ".account-meta-pill",
      ".account-hero-intro",
      ".account-section-head",
      ".settings-group",
      ".quiz-box",
      ".proof-pill",
      ".bot-metric-card",
      ".case-card",
      ".quote-card",
      ".testimonials article",
      ".contact-card",
      ".links-card",
      ".legal-card",
      "section > h2",
    ];

    var candidates = [];
    selectors.forEach(function (sel) {
      Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
        if (
          el.classList.contains("reveal") ||
          el.classList.contains("headline-reveal") ||
          el.classList.contains("fx-reveal") ||
          el.closest(".reveal")
        ) {
          return;
        }
        candidates.push(el);
      });
    });

    if (!candidates.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      candidates.forEach(function (el) {
        el.classList.add("fx-reveal", "fx-in");
      });
      return;
    }

    // Stagger siblings within the same parent for a polished cascade
    var groupCounts = {};
    candidates.forEach(function (el) {
      el.classList.add("fx-reveal");
      var parent = el.parentElement;
      var key = parent
        ? parent.tagName + "-" + (parent.className || "x")
        : "root";
      groupCounts[key] = (groupCounts[key] || 0) % 6;
      groupCounts[key] += 1;
      el.classList.add("fx-d" + groupCounts[key]);
    });

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("fx-in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    candidates.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  function boot() {
    initCounters();
    initReveal();
    initHeroTyping();
    initAuroraParallax();
  }

  // ---- Hero: typing niches ----
  function initHeroTyping() {
    var target = document.getElementById("heroTyped");
    if (!target) return;

    var words = [
      "рестораны и доставку",
      "салоны красоты",
      "частные клиники",
      "барбершопы",
      "стоматологии",
      "фитнес-студии",
      "локальные сервисы",
    ];

    if (reduceMotion) {
      target.textContent = words[0];
      return;
    }

    var wordIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function tick() {
      var current = words[wordIndex];
      if (!deleting) {
        charIndex++;
        target.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          return setTimeout(tick, 1600);
        }
        return setTimeout(tick, 70);
      } else {
        charIndex--;
        target.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          return setTimeout(tick, 240);
        }
        return setTimeout(tick, 36);
      }
    }
    tick();
  }

  // ---- Hero: aurora parallax following the mouse ----
  function initAuroraParallax() {
    var aurora = document.querySelector(".hero-aurora");
    if (!aurora || reduceMotion) return;

    var hero = aurora.closest(".hero");
    if (!hero) return;

    var raf = null;
    var targetX = 0;
    var targetY = 0;

    hero.addEventListener("mousemove", function (e) {
      var rect = hero.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
      if (!raf) raf = requestAnimationFrame(apply);
    });

    hero.addEventListener("mouseleave", function () {
      targetX = 0;
      targetY = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    });

    function apply() {
      raf = null;
      aurora.style.transform =
        "translate(" + targetX * 30 + "px," + targetY * 30 + "px)";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();