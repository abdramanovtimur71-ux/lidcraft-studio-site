const growthButton = document.getElementById("calcGrowth");
const leadsInput = document.getElementById("leadsInput");
const calcResult = document.getElementById("calcResult");

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

if (growthButton && leadsInput && calcResult) {
  growthButton.addEventListener("click", () => {
    const leads = Number(leadsInput.value || 0);
    if (leads <= 0) {
      calcResult.textContent = "Введите корректное количество лидов в месяц.";
      calcResult.dataset.state = "error";
      return;
    }

    const lostBeforeRate = 0.30;
    const lostAfterRate = 0.10;
    const savedRate = lostBeforeRate - lostAfterRate;
    const fasterReplyRate = 0.35;

    const lostBefore = leads * lostBeforeRate;
    const lostAfter = leads * lostAfterRate;
    const savedLeads = leads * savedRate;
    const fasterReply = leads * fasterReplyRate;

    const formatCount = (value) => {
      if (value < 10) return value.toFixed(1).replace(".", ",");
      return Math.round(value).toString();
    };

    calcResult.textContent = `Статистика: до автоматизации может теряться около ${formatCount(lostBefore)} лидов/мес (≈30%), после — около ${formatCount(lostAfter)} (≈10%). Экономия: ${formatCount(savedLeads)} лидов/мес (≈20%). Ускоренная обработка: ${formatCount(fasterReply)} обращений/мес (≈35%).`;
    calcResult.dataset.state = "success";
  });

  leadsInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      growthButton.click();
    }
  });
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
