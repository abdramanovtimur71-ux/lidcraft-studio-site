const growthButton = document.getElementById("calcGrowth");
const leadsInput = document.getElementById("leadsInput");
const avgCheckInput = document.getElementById("avgCheck");
const conversionBeforeInput = document.getElementById("conversionBefore");
const conversionAfterInput = document.getElementById("conversionAfter");
const teamSizeInput = document.getElementById("teamSize");
const industrySelect = document.getElementById("industrySelect");
const calcResult = document.getElementById("calcResult");
const calcShareButton = document.getElementById("calcShare");
const calcPrefillButton = document.getElementById("calcPrefill");
const calcFollowup = document.getElementById("calcFollowup");
const calcFollowupText = document.getElementById("calcFollowupText");
const lostBeforeValue = document.getElementById("lostBeforeValue");
const lostAfterValue = document.getElementById("lostAfterValue");
const savedPercent = document.getElementById("savedPercent");
const savedLeadsNode = document.getElementById("savedLeads");
const savedRevenueNode = document.getElementById("savedRevenue");
const calcWinRate = document.getElementById("calcWinRate");
const calcHoursSaved = document.getElementById("calcHoursSaved");
const calcEscalations = document.getElementById("calcEscalations");
const barLostBefore = document.querySelector('[data-bar="lost-before"]');
const barLostAfter = document.querySelector('[data-bar="lost-after"]');
const barSaved = document.querySelector('[data-bar="saved"]');
const calcPresetButtons = Array.from(document.querySelectorAll("[data-calc-preset]"));

const openTranslate = document.getElementById("openTranslate");
const globalLang = document.getElementById("globalLang");
const langSearch = document.getElementById("langSearch");

const ALL_LANGUAGES = [
  { code: "af", label: "Afrikaans" },
  { code: "sq", label: "Albanian — Shqip" },
  { code: "am", label: "Amharic — አማርኛ" },
  { code: "ar", label: "Arabic — العربية" },
  { code: "hy", label: "Armenian — Հայերեն" },
  { code: "as", label: "Assamese — অসমীয়া" },
  { code: "ay", label: "Aymara" },
  { code: "az", label: "Azerbaijani — Azərbaycan dili" },
  { code: "bm", label: "Bambara" },
  { code: "eu", label: "Basque — Euskara" },
  { code: "be", label: "Belarusian — Беларуская" },
  { code: "bn", label: "Bengali — বাংলা" },
  { code: "bho", label: "Bhojpuri" },
  { code: "bs", label: "Bosnian — Bosanski" },
  { code: "bg", label: "Bulgarian — Български" },
  { code: "ca", label: "Catalan — Català" },
  { code: "ceb", label: "Cebuano" },
  { code: "zh-CN", label: "Chinese (Simplified) — 简体中文" },
  { code: "zh-TW", label: "Chinese (Traditional) — 繁體中文" },
  { code: "co", label: "Corsican" },
  { code: "hr", label: "Croatian — Hrvatski" },
  { code: "cs", label: "Czech — Čeština" },
  { code: "da", label: "Danish — Dansk" },
  { code: "dv", label: "Dhivehi" },
  { code: "doi", label: "Dogri" },
  { code: "nl", label: "Dutch — Nederlands" },
  { code: "en", label: "English" },
  { code: "eo", label: "Esperanto" },
  { code: "et", label: "Estonian — Eesti" },
  { code: "ee", label: "Ewe" },
  { code: "fil", label: "Filipino" },
  { code: "fi", label: "Finnish — Suomi" },
  { code: "fr", label: "French — Français" },
  { code: "fy", label: "Frisian" },
  { code: "gl", label: "Galician — Galego" },
  { code: "ka", label: "Georgian — ქართული" },
  { code: "de", label: "German — Deutsch" },
  { code: "el", label: "Greek — Ελληνικά" },
  { code: "gn", label: "Guarani" },
  { code: "gu", label: "Gujarati — ગુજરાતી" },
  { code: "ht", label: "Haitian Creole" },
  { code: "ha", label: "Hausa" },
  { code: "haw", label: "Hawaiian" },
  { code: "he", label: "Hebrew — עברית" },
  { code: "hi", label: "Hindi — हिन्दी" },
  { code: "hmn", label: "Hmong" },
  { code: "hu", label: "Hungarian — Magyar" },
  { code: "is", label: "Icelandic — Íslenska" },
  { code: "ig", label: "Igbo" },
  { code: "ilo", label: "Ilocano" },
  { code: "id", label: "Indonesian — Bahasa Indonesia" },
  { code: "ga", label: "Irish — Gaeilge" },
  { code: "it", label: "Italian — Italiano" },
  { code: "ja", label: "Japanese — 日本語" },
  { code: "jv", label: "Javanese" },
  { code: "kn", label: "Kannada — ಕನ್ನಡ" },
  { code: "kk", label: "Kazakh — Қазақша" },
  { code: "km", label: "Khmer — ខ្មែរ" },
  { code: "rw", label: "Kinyarwanda" },
  { code: "gom", label: "Konkani" },
  { code: "ko", label: "Korean — 한국어" },
  { code: "kri", label: "Krio" },
  { code: "ku", label: "Kurdish (Kurmanji)" },
  { code: "ckb", label: "Kurdish (Sorani)" },
  { code: "ky", label: "Kyrgyz" },
  { code: "lo", label: "Lao — ລາວ" },
  { code: "la", label: "Latin" },
  { code: "lv", label: "Latvian — Latviešu" },
  { code: "ln", label: "Lingala" },
  { code: "lt", label: "Lithuanian — Lietuvių" },
  { code: "lg", label: "Luganda" },
  { code: "lb", label: "Luxembourgish" },
  { code: "mk", label: "Macedonian — Македонски" },
  { code: "mai", label: "Maithili" },
  { code: "mg", label: "Malagasy" },
  { code: "ms", label: "Malay — Bahasa Melayu" },
  { code: "ml", label: "Malayalam — മലയാളം" },
  { code: "mt", label: "Maltese — Malti" },
  { code: "mi", label: "Maori" },
  { code: "mr", label: "Marathi — मराठी" },
  { code: "mni-Mtei", label: "Meiteilon (Manipuri)" },
  { code: "lus", label: "Mizo" },
  { code: "mn", label: "Mongolian — Монгол" },
  { code: "my", label: "Myanmar (Burmese) — မြန်မာ" },
  { code: "ne", label: "Nepali — नेपाली" },
  { code: "no", label: "Norwegian — Norsk" },
  { code: "or", label: "Odia (Oriya) — ଓଡ଼ିଆ" },
  { code: "om", label: "Oromo" },
  { code: "ps", label: "Pashto — پښتو" },
  { code: "fa", label: "Persian — فارسی" },
  { code: "pl", label: "Polish — Polski" },
  { code: "pt", label: "Portuguese — Português" },
  { code: "pa", label: "Punjabi — ਪੰਜਾਬੀ" },
  { code: "qu", label: "Quechua" },
  { code: "ro", label: "Romanian — Română" },
  { code: "ru", label: "Russian — Русский" },
  { code: "sm", label: "Samoan" },
  { code: "sa", label: "Sanskrit — संस्कृत" },
  { code: "gd", label: "Scots Gaelic" },
  { code: "nso", label: "Sepedi" },
  { code: "sr", label: "Serbian — Српски" },
  { code: "st", label: "Sesotho" },
  { code: "sn", label: "Shona" },
  { code: "sd", label: "Sindhi" },
  { code: "si", label: "Sinhala — සිංහල" },
  { code: "sk", label: "Slovak — Slovenčina" },
  { code: "sl", label: "Slovenian — Slovenščina" },
  { code: "so", label: "Somali" },
  { code: "es", label: "Spanish — Español" },
  { code: "su", label: "Sundanese" },
  { code: "sw", label: "Swahili — Kiswahili" },
  { code: "sv", label: "Swedish — Svenska" },
  { code: "tg", label: "Tajik" },
  { code: "ta", label: "Tamil — தமிழ்" },
  { code: "tt", label: "Tatar" },
  { code: "te", label: "Telugu — తెలుగు" },
  { code: "th", label: "Thai — ไทย" },
  { code: "ti", label: "Tigrinya" },
  { code: "ts", label: "Tsonga" },
  { code: "tr", label: "Turkish — Türkçe" },
  { code: "tk", label: "Turkmen" },
  { code: "ak", label: "Twi" },
  { code: "uk", label: "Ukrainian — Українська" },
  { code: "ur", label: "Urdu — اردو" },
  { code: "ug", label: "Uyghur" },
  { code: "uz", label: "Uzbek — Oʻzbek" },
  { code: "vi", label: "Vietnamese — Tiếng Việt" },
  { code: "cy", label: "Welsh — Cymraeg" },
  { code: "xh", label: "Xhosa" },
  { code: "yi", label: "Yiddish" },
  { code: "yo", label: "Yoruba" },
  { code: "zu", label: "Zulu" }
];

const POPULAR_LANGUAGE_CODES = [
  "en", "ru", "es", "fr", "de", "it", "pt", "tr", "ar", "zh-CN", "ja", "ko", "hi", "uk", "pl"
];

const POPULAR_LANGUAGES = POPULAR_LANGUAGE_CODES
  .map((code) => ALL_LANGUAGES.find((item) => item.code === code))
  .filter(Boolean);

function populateLanguageOptions(languageList, currentValue) {
  if (!globalLang) return;

  globalLang.innerHTML = "";

  languageList.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.code;
    option.textContent = item.label;
    globalLang.appendChild(option);
  });

  if (languageList.some((item) => item.code === currentValue)) {
    globalLang.value = currentValue;
  } else if (languageList.length) {
    globalLang.value = languageList[0].code;
  }
}

function renderLanguageOptions(searchText = "") {
  if (!globalLang) return;

  const currentValue = globalLang.value || "en";
  const query = searchText.trim().toLowerCase();

  if (!query) {
    populateLanguageOptions(POPULAR_LANGUAGES, currentValue);
    return;
  }

  const filtered = ALL_LANGUAGES.filter((item) => item.label.toLowerCase().includes(query) || item.code.toLowerCase().includes(query));
  populateLanguageOptions(filtered, currentValue);
}

if (globalLang) {
  populateLanguageOptions(POPULAR_LANGUAGES, "en");
}

if (langSearch && globalLang) {
  let searchTimer = null;

  langSearch.addEventListener("input", (event) => {
    clearTimeout(searchTimer);
    const value = event.target.value || "";
    searchTimer = setTimeout(() => {
      renderLanguageOptions(value);
    }, 120);
  });

  langSearch.addEventListener("focus", () => {
    if (!langSearch.value.trim()) {
      populateLanguageOptions(ALL_LANGUAGES, globalLang.value || "en");
    }
  });

  langSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (openTranslate) {
        openTranslate.click();
      }
    }
  });
}

if (openTranslate && globalLang) {
  openTranslate.addEventListener("click", () => {
    const targetLang = globalLang.value || "en";
    const currentUrl = window.location.href;
    const translatedUrl = `https://translate.google.com/translate?sl=auto&tl=${encodeURIComponent(targetLang)}&u=${encodeURIComponent(currentUrl)}`;
    window.open(translatedUrl, "_blank", "noopener");
  });
}

if (
  growthButton &&
  leadsInput &&
  avgCheckInput &&
  conversionBeforeInput &&
  conversionAfterInput &&
  teamSizeInput &&
  industrySelect &&
  calcResult
) {
  const industryProfiles = {
    beauty: { label: "салонов красоты", lostBefore: 0.28, lostAfter: 0.11, escalations: 0.34 },
    horeca: { label: "общепита", lostBefore: 0.32, lostAfter: 0.14, escalations: 0.41 },
    clinic: { label: "частных клиник", lostBefore: 0.24, lostAfter: 0.09, escalations: 0.31 },
    services: { label: "сервисного бизнеса", lostBefore: 0.26, lostAfter: 0.1, escalations: 0.35 }
  };

  const formatInt = (value) => Math.max(0, Math.round(value)).toLocaleString("ru-RU");
  const formatMoney = (value) => `${Math.max(0, Math.round(value)).toLocaleString("ru-RU")} ₸`;
  const formatPercent = (value) => `${Math.max(0, value).toFixed(0)}%`;

  const applyPreset = (preset) => {
    const presets = {
      beauty: { leads: 180, avgCheck: 24000, conversionBefore: 11, conversionAfter: 17, teamSize: 48, industry: "beauty" },
      horeca: { leads: 320, avgCheck: 6800, conversionBefore: 9, conversionAfter: 13, teamSize: 72, industry: "horeca" },
      clinic: { leads: 140, avgCheck: 52000, conversionBefore: 14, conversionAfter: 21, teamSize: 44, industry: "clinic" }
    };
    const next = presets[preset];
    if (!next) return;
    leadsInput.value = String(next.leads);
    avgCheckInput.value = String(next.avgCheck);
    conversionBeforeInput.value = String(next.conversionBefore);
    conversionAfterInput.value = String(next.conversionAfter);
    teamSizeInput.value = String(next.teamSize);
    industrySelect.value = next.industry;
  };

  const calculate = () => {
    const leads = Number(leadsInput.value || 0);
    const avgCheck = Number(avgCheckInput.value || 0);
    const conversionBefore = Number(conversionBeforeInput.value || 0);
    const conversionAfter = Number(conversionAfterInput.value || 0);
    const teamHours = Number(teamSizeInput.value || 0);
    const profile = industryProfiles[industrySelect.value] || industryProfiles.services;

    if (leads <= 0 || avgCheck <= 0 || conversionBefore <= 0 || conversionAfter <= 0 || teamHours <= 0) {
      calcResult.textContent = "Заполните все поля: лиды, чек, конверсию и часы команды.";
      calcResult.dataset.state = "error";
      return null;
    }

    const beforeLossRate = profile.lostBefore;
    const afterLossRate = profile.lostAfter;
    const savedRate = Math.max(0, beforeLossRate - afterLossRate);

    const lostBefore = leads * beforeLossRate;
    const lostAfter = leads * afterLossRate;
    const savedLeads = leads * savedRate;

    const conversionDelta = Math.max(0, conversionAfter - conversionBefore);
    const extraDeals = leads * (conversionDelta / 100);
    const extraRevenue = extraDeals * avgCheck;
    const savedHours = teamHours * (0.28 + Math.min(0.17, conversionDelta / 100));
    const escalations = profile.escalations * 100;

    if (lostBeforeValue) lostBeforeValue.textContent = formatPercent(beforeLossRate * 100);
    if (lostAfterValue) lostAfterValue.textContent = formatPercent(afterLossRate * 100);
    if (savedPercent) savedPercent.textContent = formatPercent(savedRate * 100);
    if (savedLeadsNode) savedLeadsNode.textContent = formatInt(savedLeads);
    if (savedRevenueNode) savedRevenueNode.textContent = formatMoney(extraRevenue);
    if (calcWinRate) calcWinRate.textContent = `+${conversionDelta.toFixed(1)}%`;
    if (calcHoursSaved) calcHoursSaved.textContent = `${formatInt(savedHours)} ч`;
    if (calcEscalations) calcEscalations.textContent = `${formatPercent(escalations)}`;

    if (barLostBefore) barLostBefore.style.setProperty("--value", `${beforeLossRate * 100}%`);
    if (barLostAfter) barLostAfter.style.setProperty("--value", `${afterLossRate * 100}%`);
    if (barSaved) barSaved.style.setProperty("--value", `${savedRate * 100}%`);

    const summary = `Для ${profile.label}: при ${formatInt(leads)} лидах/мес и чеке ${formatMoney(avgCheck)} можно вернуть около ${formatInt(savedLeads)} лидов и получить до ${formatMoney(extraRevenue)} дополнительной выручки в месяц.`;
    calcResult.textContent = summary;
    calcResult.dataset.state = "success";

    if (calcFollowup && calcFollowupText) {
      calcFollowup.classList.add("is-visible");
      calcFollowupText.textContent = `Хотите точный прогноз для ${profile.label}? Оставьте заявку — подготовим расчёт под ваши реальные цифры.`;
    }

    return {
      summary,
      profileLabel: profile.label
    };
  };

  growthButton.addEventListener("click", () => {
    calculate();
  });

  [leadsInput, avgCheckInput, conversionBeforeInput, conversionAfterInput, teamSizeInput].forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        calculate();
      }
    });
  });

  calcPresetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const preset = button.getAttribute("data-calc-preset");
      if (!preset) return;
      applyPreset(preset);
      calculate();
    });
  });

  if (calcShareButton) {
    calcShareButton.addEventListener("click", async () => {
      const result = calculate();
      if (!result) return;
      const text = `${result.summary}\nИсточник: калькулятор LidCraft Studio`;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const helper = document.createElement("textarea");
        helper.value = text;
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

  if (calcPrefillButton) {
    calcPrefillButton.addEventListener("click", () => {
      const leadMessage = document.getElementById("leadMessage");
      if (!(leadMessage instanceof HTMLTextAreaElement)) return;
      if (!leadMessage.value.trim()) {
        leadMessage.value = `Нужен точный расчёт по нашей нише (${industrySelect.options[industrySelect.selectedIndex]?.text || "бизнес"}).`;
      }
      leadMessage.focus();
      leadMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
}

const quizQuestions = [
  "1) Теряются ли заявки из-за медленного ответа?",
  "2) Есть ли повторяющиеся вопросы от клиентов каждый день?",
  "3) Тратит ли команда много времени на однотипные переписки?",
  "4) Нужен ли вам контроль всех лидов в одном месте?",
  "5) Хотите ли вы увеличить конверсию без расширения штата?"
];

let quizIndex = 0;
let quizScore = 0;

const quizQuestion = document.getElementById("quizQuestion");
const quizProgress = document.getElementById("quizProgress");
const quizResult = document.getElementById("quizResult");
const quizButtons = document.querySelectorAll("[data-quiz]");

function isTypingContext() {
  const active = document.activeElement;
  if (!active) return false;
  const tag = (active.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return true;
  return active.isContentEditable === true;
}

function updateQuizView() {
  if (!quizQuestion || !quizProgress) return;
  if (quizIndex < quizQuestions.length) {
    quizQuestion.textContent = quizQuestions[quizIndex];
    quizProgress.textContent = `Вопрос ${quizIndex + 1} из ${quizQuestions.length}`;
  }
}

function finishQuiz() {
  if (!quizResult || !quizQuestion || !quizProgress) return;
  quizQuestion.textContent = "Тест завершен";
  quizProgress.textContent = "Готово";

  if (quizScore >= 4) {
    quizResult.textContent = "Высокий потенциал: автоматизацию стоит запускать сейчас, эффект будет заметен быстро.";
  } else if (quizScore >= 2) {
    quizResult.textContent = "Средний потенциал: рекомендуем начать с одного ключевого процесса и расширять поэтапно.";
  } else {
    quizResult.textContent = "Базовый потенциал: начните с диагностики и карты процессов, чтобы увидеть точные точки роста.";
  }
}

if (quizButtons.length) {
  const answerByValue = (value) => {
    if (quizIndex >= quizQuestions.length) return;
    if (value === "yes") {
      quizScore += 1;
    }
    quizIndex += 1;
    if (quizIndex >= quizQuestions.length) {
      finishQuiz();
    } else {
      updateQuizView();
    }
  };

  quizButtons.forEach((button) => {
    button.addEventListener("click", () => {
      answerByValue(button.getAttribute("data-quiz"));
    });
  });

  document.addEventListener("keydown", (event) => {
    if (isTypingContext()) return;
    if (quizIndex >= quizQuestions.length) return;

    const key = (event.key || "").toLowerCase();
    if (key === "y" || key === "н") {
      event.preventDefault();
      answerByValue("yes");
      return;
    }
    if (key === "n" || key === "т") {
      event.preventDefault();
      answerByValue("no");
    }
  });

  updateQuizView();
}
