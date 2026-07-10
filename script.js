// Кнопка для показа/скрытия блока выбора языка
const translations = {
  ru: {
    navServices: "Услуги",
    navBotDemo: "Сайт",
    navCases: "Кейсы",
    navPricing: "Тарифы",
    navContact: "Контакты",
    navLinks: "Соцсети",
    navCta: "Связаться",
    heroBadge: "AI-ускорение для малого и среднего бизнеса",
    heroTitle: "LidCraft Studio превращает хаос в воронку заявок за 14 дней",
    heroText: "Связываем сайт, бот, CRM и постпродажи в единую систему. Клиенты получают ответ за минуты, команда — прозрачные цифры, вы — прогнозируемый рост без расширения штата.",
    heroCta1: "Запросить аудит",
    heroCta2: "Все каналы связи",
    heroCtaCases: "Смотреть кейсы",
    heroCtaNote: "Ответим в Telegram или WhatsApp с планом запуска и ближайшим сроком старта.",
    fitTitle: "Кому подходим",
    fitItem1: "Сервисному бизнесу, где заявки теряются в чатах и звонках.",
    fitItem2: "E-commerce, где поддержка съедает время команды.",
    fitItem3: "Экспертным продуктам, где нужен путь от контента до созвона.",
    solveTitle: "Что закрываем за 14 дней",
    solveItem1: "Новый оффер и понятный первый экран без лишнего шума.",
    solveItem2: "Маршрут заявки: сайт → бот → CRM → уведомление менеджеру.",
    solveItem3: "FAQ, SLA и повторные касания, чтобы лид не выпадал.",
    resultTitle: "Что получаете на выходе",
    resultItem1: "Рабочий лендинг, а не только макет.",
    resultItem2: "Форму и каналы связи, которые реально конвертируют.",
    resultItem3: "Понятный план следующего спринта по данным, а не по ощущениям.",
    servicesTitle: "Что получаете на каждом уровне",
    s1Title: "Signal",
    s1Text: "Аудит, формулировка ценности и быстрый прототип, чтобы протестировать гипотезы до крупных затрат.",
    s2Title: "Motion",
    s2Text: "Лид-машина под ключ: сценарии, голосовые ответы, интеграции с CRM и точные уведомления по каждому обращению.",
    s3Title: "Pulse",
    s3Text: "Рост и LTV: персональные триггеры, апселл-воронки, автоматизированные рассылки и контент-хаб.",
    processTitle: "Как мы работаем",
    pr1Title: "1. Диагностика",
    pr1Text: "30-минутный созвон: фиксируем цели, ограничения и собираем данные для прототипа.",
    pr2Title: "2. План и запуск",
    pr2Text: "Согласовываем структуру сайта и бота, подключаем интеграции, тестируем первую версию.",
    pr3Title: "3. Оптимизация",
    pr3Text: "Отслеживаем метрики, добавляем сценарии, делимся отчётами и планируем следующие итерации.",
    botDemoTitle: "Сайт LidCraft в работе",
    botDemoText: "Показываем, как страница ведёт клиента от первого экрана до заявки: скорость загрузки, блоки доверия, уведомления менеджера.",
    botDemoCopy: "Скопировать сводку",
    botDemoCta: "Запросить похожий сайт",
    botMetricSpeedLabel: "Скорость загрузки",
    botMetricSpeedText: "Оптимизируем медиаконтент и скрипты, чтобы первый экран прогружался быстрее 1 секунды.",
    botMetricVoiceLabel: "Конверсия в лид",
    botMetricVoiceText: "Комбо из квиза, social proof и виджета обратной связи поднимает конверсию c 2% до 5%+.",
    botMetricManagerLabel: "Редактирование",
    botMetricManagerText: "Через Notion/Markdown и авто-деплой редактируем тексты и блоки без разработчика.",
    botDemoCap1: "Первый экран: оффер, квиз и CTA сразу ведут к действию.",
    botDemoCap2: "Заявки уходят в CRM и пингуют менеджера в Telegram/WhatsApp.",
    botDemoCap3: "Прозрачный процесс: сайт → CRM → уведомление → повторные касания.",
    liveBotLabel: "Live-просмотр",
    liveBotTitle: "Живая трансляция сайта прямо в браузере",
    liveBotText: "Демонстрируем, как сайт реагирует на действия пользователя: клики, квизы, заявку и уведомление менеджера в реальном времени.",
    liveBotPoint1: "Снимаем экран и действия без подключения сторонних сервисов.",
    liveBotPoint2: "Показываем, как появляются кейсы, pop-up и CTA на конкретном сценарии.",
    liveBotPoint3: "Любую заявку сразу видит менеджер в CRM и мессенджерах.",
    liveBotInputLabel: "Комментарий к сайту",
    liveBotPlaceholder: "Спросите про блок или сценарий сайта",
    liveBotSend: "Спросить про сайт",
    liveBotStatUptime: "Аптайм",
    liveBotStatLatency: "Задержка",
    liveBotStatEscalations: "Обновления",
    trustEyebrow: "Доверие",
    trustTitle: "Услуги, e-commerce и EdTech уже подключили LidCraft Studio",
    trustText: "Встраиваемся в рабочие процессы клиента и запускаем сайт там, где эффект наступает быстрее всего: горячая линия, записи, CRM и рассылки.",
    trustList1: "Ответ за 1–5 минут даже в пиковые сезоны.",
    trustList2: "Потери лидов падают с ~30% до 10%.",
    trustList3: "Каждое обращение фиксируется в CRM или таблицах.",
    trustMetricSlaLabel: "SLA <5 мин",
    trustMetricSlaText: "чатов закрываем быстрее, чем отвечает менеджер.",
    trustMetricNpsLabel: "NPS",
    trustMetricNpsText: "оценка клиентов после первой недели работы сайта.",
    trustMetricHoursLabel: "Высвобождено",
    trustMetricHoursText: "среднее снижение ручных касаний у команд продаж.",
    casesTitle: "Кейсы",
    pricingTitle: "Тарифы",
    p1Title: "Start",
    p1Text: "Экспресс-аудит, карта задач и 1 консультация. Точный расчёт: +216 000 ₸/мес при 120 лидах, 45 000 ₸ чеке и росте 12% → 16%.",
    p2Title: "Growth",
    p2Text: "Запуск сайта, сценариев и первой автоматизации. Точный расчёт: +540 000 ₸/мес при 120 лидах, 45 000 ₸ чеке и росте 12% → 22%.",
    p3Title: "Scale",
    p3Text: "Комплекс: сайт, интеграции, сопровождение и аналитика. Точный расчёт: +864 000 ₸/мес при 120 лидах, 45 000 ₸ чеке и росте 12% → 28%.",
    calcTitle: "Прогноз роста",
    calcLeadsLabel: "Лидов в месяц",
    calcAvgCheckLabel: "Средний чек (₸)",
    calcConversionBefore: "Конверсия до (%)",
    calcConversionAfter: "Цель конверсии (%)",
    calcTeamSizeLabel: "Часов команды на обработку",
    calcIndustryLabel: "Ниша",
    calcButton: "Рассчитать",
    calcShare: "Отправить расчёт команде",
    calcResultPlaceholder: "Введите данные, чтобы увидеть потенциал роста.",
    calcInsightWin: "рост win-rate при быстром ответе",
    calcInsightHours: "экономия времени команды",
    calcInsightEsc: "диалогов уходит менеджеру",
    calcPrefill: "Получить точный прогноз",
    faqTitle: "Частые вопросы",
    f1Title: "Сколько времени занимает запуск?",
    f1Text: "Первая рабочая версия обычно готова в течение 3–7 дней.",
    f2Title: "Подойдет ли это моему бизнесу?",
    f2Text: "На стартовом созвоне проверяем задачу и предлагаем только то, что реально окупается.",
    f3Title: "Есть ли поддержка после запуска?",
    f3Text: "Да, можно выбрать сопровождение и регулярные доработки.",
    contactTitle: "Контакты",
    contactText: "Напишите нам в удобной соцсети — в ответ получите короткий план запуска под ваш кейс.",
    leadNameLabel: "Имя или компания*",
    leadNamePlaceholder: "Мария, RetailLab",
    leadChannelLabel: "Куда ответить*",
    leadChannelPlaceholder: "Выберите канал",
    leadBusinessLabel: "Ниша / продукт",
    leadBusinessPlaceholder: "онлайн-школа, косметология...",
    leadMessageLabel: "Что нужно автоматизировать*",
    leadMessagePlaceholder: "Например: входящие заявки, ответы в WhatsApp, CRM и отчёты",
    leadHint: "Чем конкретнее задача, тем быстрее вернёмся с планом и оценкой срока.",
    leadSubmit: "Отправить заявку",
    allSocials: "Все соцсети",
    footerText: "Название и материалы сайта защищены авторским правом."
  },
  en: {
    navServices: "Services",
    navBotDemo: "Site",
    navCases: "Cases",
    navPricing: "Pricing",
    navContact: "Contact",
    navLinks: "Socials",
    navCta: "Contact us",
    heroBadge: "AI acceleration for SMBs",
    heroTitle: "LidCraft Studio turns chaos into a predictable funnel in 14 days",
    heroText: "We connect the site, bot, CRM, and post-sale workflows into one system. Customers get answers in minutes, the team sees clean numbers, and you get forecastable growth without extra hires.",
    heroCta1: "Request an audit",
    heroCta2: "All communication channels",
    heroCtaCases: "See cases",
    heroCtaNote: "We reply in Telegram or WhatsApp with a launch plan and the nearest available start window.",
    fitTitle: "Who we fit",
    fitItem1: "Service businesses losing leads in chats and calls.",
    fitItem2: "E-commerce teams buried under support requests.",
    fitItem3: "Expert products that need a path from content to a call.",
    solveTitle: "What we solve in 14 days",
    solveItem1: "Sharper offer and a first screen without noise.",
    solveItem2: "Lead route: site → bot → CRM → manager alert.",
    solveItem3: "FAQ, SLA, and follow-up logic so leads do not disappear.",
    resultTitle: "What you get",
    resultItem1: "A working landing page, not just a mockup.",
    resultItem2: "A form and contact channels built to convert.",
    resultItem3: "A data-based next sprint plan instead of guesswork.",
    servicesTitle: "What you get at each level",
    s1Title: "Signal",
    s1Text: "Audit, refined value proposition, and a fast prototype so you can test hypotheses before major spend.",
    s2Title: "Motion",
    s2Text: "A lead machine on day one: scripts, voice replies, CRM integrations, and precise notifications for every request.",
    s3Title: "Pulse",
    s3Text: "Growth & LTV: personalized triggers, upsell funnels, automated campaigns, and a content hub.",
    processTitle: "How we work",
    pr1Title: "1. Discovery",
    pr1Text: "30-minute call to capture goals, constraints, and data for the prototype.",
    pr2Title: "2. Launch core",
    pr2Text: "Align the site and bot structure, wire integrations, and ship the first version.",
    pr3Title: "3. Optimization",
    pr3Text: "Track metrics, add scenarios, share reports, and plan the next sprint.",
    botDemoTitle: "LidCraft site in action",
    botDemoText: "See how the page guides a visitor from hero to submission: load speed, trust blocks, manager alerts.",
    botDemoCopy: "Copy summary",
    botDemoCta: "Request a similar site",
    botMetricSpeedLabel: "Load speed",
    botMetricSpeedText: "We optimize media and scripts so the hero renders in under a second.",
    botMetricVoiceLabel: "Lead conversion",
    botMetricVoiceText: "Quiz + social proof + support widget lift conversion from 2% to 5%+.",
    botMetricManagerLabel: "Editing",
    botMetricManagerText: "Edit copy in Notion/Markdown and auto-deploy without involving developers.",
    botDemoCap1: "Hero: offer, quiz, and CTA prompt action instantly.",
    botDemoCap2: "Submissions hit the CRM and ping a manager in Telegram/WhatsApp.",
    botDemoCap3: "Transparent flow: site → CRM → alert → follow-ups.",
    liveBotLabel: "Live preview",
    liveBotTitle: "Live site stream inside your browser",
    liveBotText: "Watch the site respond to clicks, quizzes, submissions, and manager alerts in real time.",
    liveBotPoint1: "Screen capture without third-party services.",
    liveBotPoint2: "Show how cases, pop-ups, and CTAs appear in a chosen scenario.",
    liveBotPoint3: "Every submission instantly pings a manager in CRM and messengers.",
    liveBotInputLabel: "Site comment",
    liveBotPlaceholder: "Ask about a block or scenario",
    liveBotSend: "Ask about the site",
    liveBotStatUptime: "Uptime",
    liveBotStatLatency: "Latency",
    liveBotStatEscalations: "Refresh rate",
    trustEyebrow: "Trust",
    trustTitle: "Services, e-commerce, and EdTech already run on LidCraft Studio",
    trustText: "We embed into client workflows and launch the site where impact is fastest: hotlines, bookings, CRM, and broadcasts.",
    trustList1: "Replies land within 1–5 minutes even at peak load.",
    trustList2: "Lead loss drops from ~30% to 10%.",
    trustList3: "Every inquiry is logged in the CRM or sheets.",
    trustMetricSlaLabel: "SLA <5 min",
    trustMetricSlaText: "of chats are closed faster than a manager could reply.",
    trustMetricNpsLabel: "NPS",
    trustMetricNpsText: "client score after the first week online.",
    trustMetricHoursLabel: "Hours freed",
    trustMetricHoursText: "average reduction of manual touches for sales teams.",
    casesTitle: "Cases",
    pricingTitle: "Pricing",
    p1Title: "Start",
    p1Text: "Express audit, task map, and one consult. Exact scenario: +216,000 KZT/month at 120 leads, 45,000 KZT average check, conversion 12% → 16%.",
    p2Title: "Growth",
    p2Text: "Site launch, key scenarios, and first automation. Exact scenario: +540,000 KZT/month at 120 leads, 45,000 KZT average check, conversion 12% → 22%.",
    p3Title: "Scale",
    p3Text: "Full launch: site, integrations, support, and analytics. Exact scenario: +864,000 KZT/month at 120 leads, 45,000 KZT average check, conversion 12% → 28%.",
    calcTitle: "Growth forecast",
    calcLeadsLabel: "Leads per month",
    calcAvgCheckLabel: "Average check (₸)",
    calcConversionBefore: "Conversion before (%)",
    calcConversionAfter: "Target conversion (%)",
    calcTeamSizeLabel: "Team hours spent",
    calcIndustryLabel: "Industry",
    calcButton: "Calculate",
    calcShare: "Share with team",
    calcResultPlaceholder: "Enter your data to see the potential.",
    calcInsightWin: "win-rate lift from faster replies",
    calcInsightHours: "team hours saved",
    calcInsightEsc: "dialogs escalated to a manager",
    calcPrefill: "Get an accurate forecast",
    faqTitle: "FAQ",
    f1Title: "How long does launch take?",
    f1Text: "The first working version is usually ready within 3–7 days.",
    f2Title: "Will this fit my business?",
    f2Text: "We validate the task on the intro call and recommend only what pays off.",
    f3Title: "Do you provide post-launch support?",
    f3Text: "Yes, pick a care plan and ongoing improvements.",
    contactTitle: "Contact",
    contactText: "Message us on your preferred channel and get a short launch plan tailored to you.",
    leadNameLabel: "Name or company*",
    leadNamePlaceholder: "Maria, RetailLab",
    leadChannelLabel: "Best reply channel*",
    leadChannelPlaceholder: "Choose a channel",
    leadBusinessLabel: "Industry / product",
    leadBusinessPlaceholder: "online school, beauty clinic...",
    leadMessageLabel: "What do you want to automate?*",
    leadMessagePlaceholder: "For example: inbound leads, WhatsApp replies, CRM, and reports",
    leadHint: "The more specific the task, the faster we return with a plan and timeline.",
    leadSubmit: "Send request",
    allSocials: "All socials",
    footerText: "Site name and materials are protected by copyright."
  }
};

function safeGetFromStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetToStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
  }
}

const supportedLangs = Object.keys(translations);
const FORCE_RU_UI = true;
let lang = "ru";
if (!supportedLangs.includes(lang)) {
  lang = "ru";
}

const supportedThemes = ["midnight", "graphite"];
let theme = safeGetFromStorage("auraTheme") || "midnight";
if (!supportedThemes.includes(theme)) {
  theme = "midnight";
}

const toggle = document.getElementById("langToggle");
const themeSelect = document.getElementById("themeSelect");
const themeLabel = document.getElementById("themeLabel");
const year = document.getElementById("year");
const header = document.querySelector(".header");
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const quickContactFab = document.getElementById("quickContactFab");

function getThemeName(themeCode) {
  return themeCode === "graphite" ? "Graphite Platinum" : "Midnight Gold";
}

function updateThemeLabel() {
  if (!themeLabel) return;
  const prefix = lang === "ru" ? "Тема" : "Theme";
  themeLabel.textContent = `${prefix}: ${getThemeName(theme)}`;
}

function applyTheme(nextTheme) {
  const normalizedTheme = supportedThemes.includes(nextTheme) ? nextTheme : "midnight";
  theme = normalizedTheme;
  document.body.classList.remove("theme-midnight", "theme-graphite");
  document.body.classList.add(`theme-${normalizedTheme}`);
  if (themeSelect) {
    themeSelect.value = normalizedTheme;
  }
  updateThemeLabel();
  safeSetToStorage("auraTheme", normalizedTheme);
}

function applyLanguage(nextLang) {
  const requestedLang = FORCE_RU_UI ? "ru" : nextLang;
  const normalizedLang = supportedLangs.includes(requestedLang) ? requestedLang : "ru";
  lang = normalizedLang;
  document.documentElement.lang = normalizedLang;
  const dictionary = translations[normalizedLang] || translations.ru;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (dictionary[key] && "placeholder" in element) {
      element.setAttribute("placeholder", dictionary[key]);
    }
  });

  if (toggle) {
    toggle.textContent = normalizedLang === "ru" ? "EN" : "RU";
  }

  safeSetToStorage("auraLang", normalizedLang);
  updateThemeLabel();
}

if (toggle) {
  toggle.addEventListener("click", () => {
    applyLanguage(lang === "ru" ? "en" : "ru");
  });
}

if (themeSelect) {
  themeSelect.addEventListener("change", () => {
    applyTheme(themeSelect.value);
  });
}

if (header && navToggle && mainNav) {
  const setNavToggleState = (isOpen) => {
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
    navToggle.textContent = isOpen ? "X" : "☰";
  };

  setNavToggleState(false);

  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    setNavToggleState(isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      setNavToggleState(false);
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      header.classList.remove("nav-open");
      setNavToggleState(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth > 900 || !header.classList.contains("nav-open")) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    if (!target.closest("#mainNav") && !target.closest("#navToggle")) {
      header.classList.remove("nav-open");
      setNavToggleState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("nav-open")) {
      header.classList.remove("nav-open");
      setNavToggleState(false);
      navToggle.focus();
    }
  });

  const navSectionLinks = Array.from(
    mainNav.querySelectorAll('a[href^="#"]')
  );

  function markCurrentLink(activeLink) {
    navSectionLinks.forEach((link) => {
      link.classList.toggle("is-current", link === activeLink);
    });

    if (activeLink) {
      activeLink.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }
  }

  if (navSectionLinks.length > 0) {
    const sectionById = new Map();
    navSectionLinks.forEach((link) => {
      const sectionId = link.getAttribute("href")?.slice(1);
      if (!sectionId) return;
      const section = document.getElementById(sectionId);
      if (section) {
        sectionById.set(section, link);
      }
    });

    if (sectionById.size > 0 && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visible.length > 0) {
            const link = sectionById.get(visible[0].target);
            markCurrentLink(link || null);
          }
        },
        {
          root: null,
          threshold: [0.35, 0.6],
          rootMargin: "-20% 0px -55% 0px"
        }
      );

      sectionById.forEach((_, section) => observer.observe(section));
    }

    const firstHash = window.location.hash
      ? mainNav.querySelector(`a[href="${window.location.hash}"]`)
      : navSectionLinks[0];
    markCurrentLink(firstHash instanceof HTMLAnchorElement ? firstHash : null);
  }

  mainNav.addEventListener(
    "wheel",
    (event) => {
      if (window.innerWidth <= 900 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      mainNav.scrollLeft += event.deltaY;
      event.preventDefault();
    },
    { passive: false }
  );
}

if (year) {
  year.textContent = new Date().getFullYear();
}

function initRevealAnimations() {
  const animatedElements = Array.from(document.querySelectorAll(".reveal, .headline-reveal"));
  if (animatedElements.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    animatedElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  animatedElements.forEach((element) => revealObserver.observe(element));
}

applyLanguage(lang);
applyTheme(theme);
initRevealAnimations();

if (header) {
  let lastScrollY = window.scrollY;
  const delta = 8;
  let touchStartY = null;

  const updateHeaderVisibility = (currentScrollY) => {
    if (currentScrollY <= 0) {
      header.classList.remove("header-hidden");
      lastScrollY = 0;
      return;
    }

    if (currentScrollY > lastScrollY + delta) {
      header.classList.add("header-hidden");
    } else if (currentScrollY < lastScrollY - delta) {
      header.classList.remove("header-hidden");
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", () => {
    updateHeaderVisibility(window.scrollY);
  }, { passive: true });

  window.addEventListener("touchstart", (event) => {
    if (!event.touches || event.touches.length !== 1) {
      touchStartY = null;
      return;
    }
    touchStartY = event.touches[0].clientY;
  }, { passive: true });

  window.addEventListener("touchmove", (event) => {
    if (touchStartY === null || !event.touches || event.touches.length !== 1) return;

    const touchY = event.touches[0].clientY;
    const diff = touchY - touchStartY;
    if (Math.abs(diff) < 6) return;

    if (diff < 0) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }
  }, { passive: true });

  window.addEventListener("touchend", () => {
    touchStartY = null;
  });
}

if (quickContactFab) {
  const contactSection = document.getElementById("contact");
  if (contactSection && "IntersectionObserver" in window) {
    const fabObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        quickContactFab.classList.toggle("is-hidden", entry.isIntersecting);
      },
      {
        threshold: 0.2
      }
    );
    fabObserver.observe(contactSection);
  }
}
