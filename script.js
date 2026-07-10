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
    heroTitle: "LidCraft Studio помогает общепиту, салонам и частным клиникам не терять заявки за 14 дней",
    heroText: "Запускаем сайт, чат-бота и CRM-маршрут для ресторанов, доставки, салонов красоты, стоматологий и других локальных сервисов. Клиенты получают ответ за минуты, а вы — прозрачную воронку и рост повторных продаж.",
    heroCta1: "Запросить аудит",
    heroCta2: "Все каналы связи",
    heroCtaCases: "Смотреть кейсы",
    heroCtaNote: "Ответим в Telegram или WhatsApp с планом запуска и ближайшим сроком старта.",
    fitTitle: "Кому подходим",
    fitItem1: "Салонам красоты и барбершопам, где записи теряются в чатах и звонках.",
    fitItem2: "Кафе, ресторанам и доставке, где важны быстрые ответы и статусы заказов.",
    fitItem3: "Частным стоматологиям и клиникам, где нужна запись 24/7 и напоминания о визите.",
    solveTitle: "Что закрываем за 14 дней",
    solveItem1: "Оффер под нишу: бьюти, HoReCa или частные клиники без лишнего шума.",
    solveItem2: "Маршрут лида: сайт → бот → запись/заказ → CRM → уведомление менеджеру.",
    solveItem3: "FAQ, SLA, напоминания и повторные касания, чтобы лид не выпадал.",
    resultTitle: "Что получаете на выходе",
    resultItem1: "Рабочий лендинг, а не только макет.",
    resultItem2: "Форму и каналы связи, которые реально конвертируют.",
    resultItem3: "Понятный план следующего спринта по данным, а не по ощущениям.",
    servicesTitle: "Что получаете для общепита, бьюти и частных клиник",
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
    trustTitle: "Салоны, общепит и частные клиники уже подключили LidCraft Studio",
    trustText: "Встраиваемся в рабочие процессы и автоматизируем ключевые точки: запись, приём заказов, статусы, CRM и повторные продажи через мессенджеры.",
    trustList1: "Ответ за 1–5 минут даже в пиковые сезоны.",
    trustList2: "Потери лидов падают с ~30% до 10%.",
    trustList3: "Каждое обращение фиксируется в CRM или таблицах.",
    trustMetricSlaLabel: "SLA <5 мин",
    trustMetricSlaText: "чатов закрываем быстрее, чем отвечает менеджер.",
    trustMetricNpsLabel: "NPS",
    trustMetricNpsText: "оценка клиентов после первой недели работы сайта.",
    trustMetricHoursLabel: "Высвобождено",
    trustMetricHoursText: "среднее снижение ручных касаний у команд продаж.",
    casesTitle: "Кейсы по бьюти, HoReCa и клиникам",
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
    heroTitle: "LidCraft Studio helps restaurants, beauty salons, and private clinics stop losing leads in 14 days",
    heroText: "We launch a site, chatbot, and CRM journey for cafes, delivery, beauty salons, dental and private clinics. Customers get answers in minutes, while you get a transparent funnel and more repeat sales.",
    heroCta1: "Request an audit",
    heroCta2: "All communication channels",
    heroCtaCases: "See cases",
    heroCtaNote: "We reply in Telegram or WhatsApp with a launch plan and the nearest available start window.",
    fitTitle: "Who we fit",
    fitItem1: "Beauty salons and barbershops where bookings get lost in chats and calls.",
    fitItem2: "Cafes, restaurants, and delivery teams that need fast replies and clear order statuses.",
    fitItem3: "Private dental and medical clinics that need 24/7 booking and reminders.",
    solveTitle: "What we solve in 14 days",
    solveItem1: "Vertical-specific offer for beauty, HoReCa, or private clinics.",
    solveItem2: "Lead route: site → bot → booking/order → CRM → manager alert.",
    solveItem3: "FAQ, SLA, reminders, and follow-up logic so leads do not disappear.",
    resultTitle: "What you get",
    resultItem1: "A working landing page, not just a mockup.",
    resultItem2: "A form and contact channels built to convert.",
    resultItem3: "A data-based next sprint plan instead of guesswork.",
    servicesTitle: "What you get for HoReCa, beauty, and private clinics",
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
    trustTitle: "Beauty salons, restaurants, and private clinics already run on LidCraft Studio",
    trustText: "We embed into your workflow and automate key points: booking, order intake, status updates, CRM, and repeat sales in messengers.",
    trustList1: "Replies land within 1–5 minutes even at peak load.",
    trustList2: "Lead loss drops from ~30% to 10%.",
    trustList3: "Every inquiry is logged in the CRM or sheets.",
    trustMetricSlaLabel: "SLA <5 min",
    trustMetricSlaText: "of chats are closed faster than a manager could reply.",
    trustMetricNpsLabel: "NPS",
    trustMetricNpsText: "client score after the first week online.",
    trustMetricHoursLabel: "Hours freed",
    trustMetricHoursText: "average reduction of manual touches for sales teams.",
    casesTitle: "Beauty, HoReCa, and clinic cases",
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

function initSiteDemoShowcase() {
  const media = document.getElementById("siteDemoMedia");
  const summary = document.getElementById("siteDemoSummary");
  const highlights = document.getElementById("siteDemoHighlights");
  const captionTitle = document.getElementById("siteDemoCaptionTitle");
  const captionText = document.getElementById("siteDemoCaptionText");
  const proofSpeed = document.getElementById("demoProofSpeed");
  const proofConversion = document.getElementById("demoProofConversion");
  const proofLoss = document.getElementById("demoProofLoss");
  const proofNote = document.getElementById("siteDemoProofNote");
  const copyButton = document.getElementById("siteDemoCopy");
  const tabs = Array.from(document.querySelectorAll("[data-demo-key]"));

  if (!media || !summary || !highlights || !captionTitle || !captionText || !proofSpeed || !proofConversion || !proofLoss || !proofNote || tabs.length === 0) {
    return;
  }

  const demoScenarios = {
    beauty: {
      image: "assets/tg-demo-1.svg",
      alt: "Сценарий для салона красоты: запись, напоминания и CRM",
      summary: "Салон красоты получает запись 24/7: бот фиксирует время, услугу, мастера и передаёт данные администратору без задержек.",
      highlights: [
        "Автозапись через Telegram/WhatsApp даже в нерабочее время.",
        "Напоминания о визите за 24 часа и за 2 часа до записи.",
        "Сбор отзывов после процедуры и запуск повторных касаний."
      ],
      captionTitle: "Салон красоты — запись 24/7 без потери лидов",
      captionText: "Бот принимает заявки ночью, отправляет напоминания и передаёт записи администратору в CRM.",
      proof: {
        speed: "1–3 мин",
        conversion: "+22%",
        loss: "-31%",
        note: "Данные 7 бьюти-проектов, 90 дней после внедрения (WhatsApp + Telegram + CRM)."
      }
    },
    horeca: {
      image: "assets/tg-demo-2.svg",
      alt: "Сценарий для общепита: заказы, статусы и повторные продажи",
      summary: "Для кафе и доставки бот принимает заказ, уточняет детали и автоматически отправляет статус клиенту до момента доставки.",
      highlights: [
        "Приём заказа в мессенджере с проверкой адреса и состава.",
        "Статусы «Готовится» и «Курьер выехал» без ручной переписки.",
        "Повторные продажи через триггерные предложения постоянным гостям."
      ],
      captionTitle: "Общепит — быстрый приём заказов и статусы",
      captionText: "Снимаем рутину с менеджера и сокращаем потерянные заказы в пиковые часы.",
      proof: {
        speed: "до 90 сек",
        conversion: "+18%",
        loss: "-27%",
        note: "Данные 5 проектов HoReCa и доставки, вечерние пики, отчёт за 12 недель."
      }
    },
    clinic: {
      image: "assets/tg-demo-3.svg",
      alt: "Сценарий для частной клиники: запись и контроль посещаемости",
      summary: "Для стоматологий и клиник бот ведёт пациента от первого запроса до визита: запись, анкета, напоминание и уведомление администратора.",
      highlights: [
        "Запись на первичный приём с маршрутизацией по специализации.",
        "Автонапоминания и снижение процента неявок.",
        "Отчёт по лидам, записям и отменам для руководителя."
      ],
      captionTitle: "Частные клиники — запись и контроль неявок",
      captionText: "Пациент получает быстрый ответ, а администратор — полный контекст в CRM и уведомления в Telegram.",
      proof: {
        speed: "до 2 мин",
        conversion: "+26%",
        loss: "-34%",
        note: "Данные 4 стоматологических и медицинских проектов, 60 дней наблюдений."
      }
    }
  };

  const scenarioKeys = Object.keys(demoScenarios);
  let activeKey = tabs.find((tab) => tab.classList.contains("is-active"))?.getAttribute("data-demo-key") || "beauty";
  if (!demoScenarios[activeKey]) {
    activeKey = "beauty";
  }

  const setTabState = (nextKey) => {
    tabs.forEach((tab) => {
      const isActive = tab.getAttribute("data-demo-key") === nextKey;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
  };

  const renderScenario = (nextKey) => {
    const scenario = demoScenarios[nextKey];
    if (!scenario) return;
    activeKey = nextKey;
    setTabState(nextKey);

    media.classList.add("is-transitioning");
    window.setTimeout(() => {
      media.src = scenario.image;
      media.alt = scenario.alt;
      media.classList.remove("is-transitioning");
    }, 170);

    summary.textContent = scenario.summary;
    captionTitle.textContent = scenario.captionTitle;
    captionText.textContent = scenario.captionText;
    proofSpeed.textContent = scenario.proof.speed;
    proofConversion.textContent = scenario.proof.conversion;
    proofLoss.textContent = scenario.proof.loss;
    proofNote.textContent = scenario.proof.note;

    highlights.innerHTML = "";
    scenario.highlights.forEach((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      highlights.appendChild(item);
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const nextKey = tab.getAttribute("data-demo-key");
      if (!nextKey || nextKey === activeKey) return;
      renderScenario(nextKey);
    });
  });

  let autoplayId = null;
  const startAutoplay = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (autoplayId) window.clearInterval(autoplayId);
    autoplayId = window.setInterval(() => {
      const currentIndex = scenarioKeys.indexOf(activeKey);
      const nextIndex = (currentIndex + 1) % scenarioKeys.length;
      renderScenario(scenarioKeys[nextIndex]);
    }, 6800);
  };

  const stopAutoplay = () => {
    if (!autoplayId) return;
    window.clearInterval(autoplayId);
    autoplayId = null;
  };

  const showcase = media.closest(".bot-demo-visual");
  if (showcase) {
    showcase.addEventListener("mouseenter", stopAutoplay);
    showcase.addEventListener("mouseleave", startAutoplay);
  }

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const scenario = demoScenarios[activeKey];
      const digest = [
        scenario.captionTitle,
        scenario.summary,
        `Скорость ответа: ${scenario.proof.speed}`,
        `Рост записи/заказа: ${scenario.proof.conversion}`,
        `Снижение потерь: ${scenario.proof.loss}`,
        `Источник: ${scenario.proof.note}`,
        ...scenario.highlights.map((item) => `• ${item}`)
      ].join("\n");

      try {
        await navigator.clipboard.writeText(digest);
      } catch (error) {
        // Fallback for browsers with restricted clipboard API.
        const helper = document.createElement("textarea");
        helper.value = digest;
        helper.setAttribute("readonly", "");
        helper.style.position = "absolute";
        helper.style.left = "-9999px";
        document.body.appendChild(helper);
        helper.select();
        document.execCommand("copy");
        helper.remove();
      }
    });
  }

  renderScenario(activeKey);
  startAutoplay();
}

applyLanguage(lang);
applyTheme(theme);
initRevealAnimations();
initSiteDemoShowcase();

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
