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
    initChatDemo();
    initTimeline();
    initCaseFilter();
    initTilt();
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

  // ---- Live bot chat demo ----
  function initChatDemo() {
    var thread = document.getElementById("chatThread");
    if (!thread) return;

    var steps = document.querySelectorAll(".chat-steps li");

    var script = [
      { type: "user", text: "Здравствуйте! Записаться на стрижку и бороду в субботу?", step: 0 },
      { type: "typing", after: 500 },
      { type: "bot", text: "Здравствуйте 👋 Конечно! В субботу есть окна в 12:00, 15:30 и 18:00. Какое удобно?", step: 1 },
      { type: "user", text: "Давайте 15:30", step: 0 },
      { type: "typing", after: 600 },
      { type: "bot", text: "Отлично! Уточните имя и телефон — закреплю запись и пришлю напоминание.", step: 2 },
      { type: "user", text: "Тимур, +7 700 123-45-67", step: 0 },
      { type: "typing", after: 700 },
      { type: "bot", text: "Готово, Тимур! Запись на сб, 15:30 подтверждена ✅ Напомню за 2 часа.", step: 3 },
      { type: "system", text: "Лид создан в CRM · менеджеру отправлен push", step: 4 },
    ];

    var idx = 0;
    var started = false;

    function setActiveStep(n) {
      if (!steps.length || !n) return;
      steps.forEach(function (li, i) {
        li.classList.toggle("is-active", i === n - 1);
      });
    }

    function scrollDown() {
      thread.scrollTop = thread.scrollHeight;
    }

    function addMessage(item) {
      var el = document.createElement("div");
      el.className = "chat-msg " + item.type;
      el.textContent = item.text;
      thread.appendChild(el);
      scrollDown();
    }

    function showTyping(cb, delay) {
      var t = document.createElement("div");
      t.className = "chat-typing";
      t.innerHTML = "<span></span><span></span><span></span>";
      thread.appendChild(t);
      scrollDown();
      setTimeout(function () {
        t.remove();
        cb();
      }, delay || 900);
    }

    function next() {
      if (idx >= script.length) {
        setTimeout(function () {
          thread.innerHTML = "";
          idx = 0;
          setActiveStep(0);
          setTimeout(next, 900);
        }, 4200);
        return;
      }
      var item = script[idx];
      idx++;

      if (item.type === "typing") {
        showTyping(next, item.after);
        return;
      }
      addMessage(item);
      if (item.step) setActiveStep(item.step);

      var pause = item.type === "user" ? 900 : 1500;
      setTimeout(next, pause);
    }

    function start() {
      if (started) return;
      started = true;
      if (reduceMotion) {
        script.forEach(function (item) {
          if (item.type !== "typing") addMessage(item);
        });
        setActiveStep(4);
        return;
      }
      next();
    }

    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              start();
              obs.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      obs.observe(thread);
    } else {
      start();
    }
  }

  // ---- Scroll-driven process timeline ----
  function initTimeline() {
    var timeline = document.getElementById("processTimeline");
    if (!timeline) return;
    var items = timeline.querySelectorAll(".timeline-item");
    if (!items.length) return;

    var ticking = false;

    function update() {
      ticking = false;
      var rect = timeline.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var trigger = vh * 0.55;

      var total = rect.height;
      var passed = trigger - rect.top;
      var progress = Math.max(0, Math.min(1, passed / total));
      timeline.style.setProperty("--timeline-progress", progress * 100 + "%");

      items.forEach(function (item) {
        var r = item.getBoundingClientRect();
        var dotY = r.top + 12;
        item.classList.toggle("is-active", dotY <= trigger);
      });
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  // ---- Cases: niche filter ----
  function initCaseFilter() {
    var buttons = document.querySelectorAll(".case-filter-btn");
    var cards = document.querySelectorAll(".case-card[data-niche]");
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");
        buttons.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });

        cards.forEach(function (card) {
          var match = filter === "all" || card.getAttribute("data-niche") === filter;
          if (match) {
            card.classList.remove("is-hidden");
            requestAnimationFrame(function () {
              card.classList.remove("filtering");
            });
          } else {
            card.classList.add("filtering");
            setTimeout(function () {
              card.classList.add("is-hidden");
            }, 250);
          }
        });
      });
    });
  }

  // ---- 3D tilt on hover ----
  function initTilt() {
    if (reduceMotion) return;
    var supportsHover =
      window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supportsHover) return;

    var tilts = document.querySelectorAll(".tilt");
    tilts.forEach(function (el) {
      var raf = null;
      var rx = 0;
      var ry = 0;

      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        ry = px * 8;
        rx = -py * 8;
        if (!raf) raf = requestAnimationFrame(apply);
      });

      el.addEventListener("mouseleave", function () {
        rx = 0;
        ry = 0;
        if (!raf) raf = requestAnimationFrame(apply);
      });

      function apply() {
        raf = null;
        el.style.transform =
          "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-4px)";
        if (rx === 0 && ry === 0) {
          el.style.transform = "";
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();