function safeStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
  }
}

const THEME_KEY = "auraTheme";
const SUPPORTED_THEMES = ["midnight", "graphite"];

function getThemeName(themeCode) {
  return themeCode === "graphite" ? "Graphite Platinum" : "Midnight Gold";
}

function applyTheme(nextTheme) {
  const normalizedTheme = SUPPORTED_THEMES.includes(nextTheme) ? nextTheme : "midnight";
  document.body.classList.remove("theme-midnight", "theme-graphite");
  document.body.classList.add(`theme-${normalizedTheme}`);
  safeStorageSet(THEME_KEY, normalizedTheme);
  return normalizedTheme;
}

function addHours(date, hours) {
  const next = new Date(date.getTime());
  next.setHours(next.getHours() + hours);
  return next;
}

function parseJson(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function isSessionValid(session, user) {
  if (!session || !user) return false;
  if (!session.expiresAt || !session.userEmail) return false;
  if (session.userEmail !== user.email) return false;
  return new Date(session.expiresAt).getTime() > Date.now();
}

function isSubscriptionActive(user) {
  if (!user?.subscriptionEndsAt) return false;
  if (user.subscriptionActive === false) return false;
  return new Date(user.subscriptionEndsAt).getTime() > Date.now();
}

function isGuestUser(user) {
  if (!user) return false;
  if (user.role === "guest") return true;
  return String(user.email || "").endsWith("@lidcraft.local");
}

function animateGuestMessages() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const revealNodes = Array.from(document.querySelectorAll("main .container > h1, #guestBanner, .result-text"))
    .filter((node) => !node.hidden)
    .filter((node) => window.getComputedStyle(node).display !== "none");

  revealNodes.forEach((node, index) => {
    node.classList.add("guest-reveal");
    node.style.setProperty("--reveal-delay", `${index * 70}ms`);
  });

  requestAnimationFrame(() => {
    revealNodes.forEach((node) => {
      node.classList.add("is-visible");
    });
  });
}

function lockProtectedFeatures() {
  const protectedButtons = document.querySelectorAll(".btn.primary, [data-cab-quiz]");
  protectedButtons.forEach((node) => {
    const keepEnabled = ["logoutBtn", "saveProfileBtn", "renewAccessBtn", "saveSettingsBtn"].includes(node.id);
    if (!keepEnabled) {
      node.setAttribute("disabled", "disabled");
      node.style.opacity = "0.55";
      node.style.pointerEvents = "none";
    }
  });
}

function getLocalUsers() {
  const users = parseJson(safeStorageGet("auraUsers"));
  return Array.isArray(users) ? users : [];
}

function updateLocalUser(user, previousEmail = null) {
  const users = getLocalUsers();
  const anchorEmail = previousEmail || user.email;
  const index = users.findIndex((item) => item.email === anchorEmail);
  if (index !== -1) {
    users[index] = { ...users[index], ...user };
    safeStorageSet("auraUsers", JSON.stringify(users));
  }
}

function getSettingsStorageKey(email) {
  return `auraAccountSettings:${String(email || "").toLowerCase()}`;
}

const DEFAULT_SETTINGS = {
  language: "ru",
  timezone: "Europe/Moscow",
  privacyMode: "standard",
  autoLogoutMinutes: 60,
  notifications: {
    email: false,
    telegram: true,
    digest: true
  }
};

function getUserSettings(email) {
  const parsed = parseJson(safeStorageGet(getSettingsStorageKey(email)));
  return {
    ...DEFAULT_SETTINGS,
    ...(parsed || {}),
    notifications: {
      ...DEFAULT_SETTINGS.notifications,
      ...(parsed?.notifications || {})
    }
  };
}

function saveUserSettings(email, settings) {
  safeStorageSet(getSettingsStorageKey(email), JSON.stringify(settings));
}

function migrateUserSettingsEmail(oldEmail, newEmail) {
  if (!oldEmail || !newEmail || oldEmail === newEmail) return;
  const oldKey = getSettingsStorageKey(oldEmail);
  const newKey = getSettingsStorageKey(newEmail);
  const raw = safeStorageGet(oldKey);
  if (raw) {
    safeStorageSet(newKey, raw);
    safeStorageRemove(oldKey);
  }
}

function bindEnterByIds(ids, handler) {
  ids.forEach((id) => {
    const node = document.getElementById(id);
    if (!node) return;
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handler();
      }
    });
  });
}

function setButtonLoading(button, isLoading, loadingText = "Подождите...") {
  if (!button) return;
  if (isLoading) {
    button.dataset.originalText = button.textContent;
    button.textContent = loadingText;
    button.classList.add("is-loading");
    button.disabled = true;
    return;
  }

  if (button.dataset.originalText) {
    button.textContent = button.dataset.originalText;
  }
  button.classList.remove("is-loading");
  button.disabled = false;
}

function markInvalid(ids, invalidId = null) {
  let invalidNode = null;
  ids.forEach((id) => {
    const node = document.getElementById(id);
    if (!node) return;
    const isInvalid = id === invalidId;
    node.setAttribute("aria-invalid", String(isInvalid));
    if (isInvalid && !invalidNode) {
      invalidNode = node;
    }
  });

  if (invalidNode instanceof HTMLElement) {
    invalidNode.focus({ preventScroll: false });
    invalidNode.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function clearInvalidOnInput(ids) {
  ids.forEach((id) => {
    const node = document.getElementById(id);
    if (!node) return;
    node.addEventListener("input", () => {
      node.removeAttribute("aria-invalid");
    });
  });
}

function ensureToastStack() {
  let stack = document.querySelector(".toast-stack");
  if (stack) return stack;
  stack = document.createElement("div");
  stack.className = "toast-stack";
  document.body.appendChild(stack);
  return stack;
}

function showToast(text, state = "info") {
  if (!text) return;
  const stack = ensureToastStack();
  const toast = document.createElement("div");
  toast.className = `toast toast-${state}`;
  toast.textContent = text;
  stack.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    setTimeout(() => toast.remove(), 180);
  }, 2500);
}

function setMessage(node, text, state = "info", toast = false) {
  if (!node) return;
  node.textContent = text;
  node.dataset.state = state;
  if (toast) {
    showToast(text, state);
  }
}

function getPasswordStrength(password) {
  const value = String(password || "");
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-ZА-Я]/.test(value) && /[a-zа-я]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-zА-Яа-я0-9]/.test(value)) score += 1;

  if (value.length < 6 || score <= 1) return "weak";
  if (score <= 3) return "medium";
  return "strong";
}

function bindPasswordHint(inputId, hintId) {
  const input = document.getElementById(inputId);
  const hint = document.getElementById(hintId);
  if (!input || !hint) return;

  const update = () => {
    const level = getPasswordStrength(input.value);
    hint.dataset.level = level;
    if (!input.value) {
      hint.textContent = "Сильный пароль: 8+ символов, буквы в разных регистрах, цифры и спецсимвол.";
      return;
    }
    if (level === "weak") {
      hint.textContent = "Надежность: низкая. Пароль легко подобрать.";
      return;
    }
    if (level === "medium") {
      hint.textContent = "Надежность: средняя. Добавьте еще сложность для лучшей защиты.";
      return;
    }
    hint.textContent = "Надежность: высокая. Отличный пароль.";
  };

  input.addEventListener("input", update);
  input.addEventListener("blur", update);
  update();
}

function enhancePasswordInputs(ids) {
  ids.forEach((id) => {
    const input = document.getElementById(id);
    if (!input || input.dataset.enhancedPassword === "true") return;

    const wrap = document.createElement("div");
    wrap.className = "pass-wrap";
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "pass-toggle";
    toggleButton.setAttribute("aria-label", "Показать пароль");
    toggleButton.textContent = "Show";

    toggleButton.addEventListener("click", () => {
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      toggleButton.setAttribute("aria-label", show ? "Скрыть пароль" : "Показать пароль");
      toggleButton.textContent = show ? "Hide" : "Show";
    });

    wrap.appendChild(toggleButton);
    input.dataset.enhancedPassword = "true";
  });
}

function escapeCsvValue(value) {
  const v = String(value ?? "");
  return `"${v.replaceAll('"', '""')}"`;
}

function checkPromptSafety(inputText) {
  const text = (inputText || "").toLowerCase();
  const blockedPatterns = [
    /ignore\s+all\s+instructions/,
    /forget\s+all\s+instructions/,
    /system\s+prompt/,
    /show\s+me\s+your\s+code/,
    /покажи\s+код/,
    /раскрой\s+инструкц/,
    /дай\s+схем/,
    /как\s+устроен\s+проект/
  ];

  return !blockedPatterns.some((pattern) => pattern.test(text));
}

const currentUserRaw = safeStorageGet("auraCurrentUser");
if (!currentUserRaw) {
  window.location.href = "auth.html";
}

let currentUser = null;
try {
  currentUser = JSON.parse(currentUserRaw);
} catch {
  window.location.href = "auth.html";
}

const session = parseJson(safeStorageGet("auraSession"));
if (!isSessionValid(session, currentUser)) {
  safeStorageRemove("auraCurrentUser");
  safeStorageRemove("auraSession");
  window.location.href = "auth.html";
}

const userName = document.getElementById("userName");
if (userName && currentUser?.name) {
  userName.textContent = currentUser.name;
}

const guestBanner = document.getElementById("guestBanner");
if (guestBanner && isGuestUser(currentUser)) {
  guestBanner.hidden = false;
}

if (isGuestUser(currentUser)) {
  animateGuestMessages();
}

const convertGuestBtn = document.getElementById("convertGuestBtn");
if (convertGuestBtn && isGuestUser(currentUser)) {
  convertGuestBtn.addEventListener("click", () => {
    const guestDraft = {
      name: (currentUser?.name || "").trim(),
      email: (currentUser?.email || "").trim().toLowerCase()
    };
    safeStorageSet("auraGuestDraft", JSON.stringify(guestDraft));
    safeStorageRemove("auraCurrentUser");
    safeStorageRemove("auraSession");
    window.location.href = "auth.html#upgrade";
  });
}

const sessionStatus = document.getElementById("sessionStatus");
if (sessionStatus && session?.expiresAt) {
  setMessage(sessionStatus, `Сессия активна до: ${new Date(session.expiresAt).toLocaleString()}`, "info");
}

const subscriptionStatus = document.getElementById("subscriptionStatus");
if (subscriptionStatus) {
  const active = isSubscriptionActive(currentUser);
  setMessage(
    subscriptionStatus,
    active
      ? `Подписка активна до: ${new Date(currentUser.subscriptionEndsAt).toLocaleDateString()}`
      : "Подписка неактивна: функции кабинета ограничены до продления.",
    active ? "success" : "error"
  );

  if (!active) {
    lockProtectedFeatures();
  }
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    safeStorageRemove("auraCurrentUser");
    safeStorageRemove("auraSession");
    window.location.href = "auth.html";
  });
}

const themeSelect = document.getElementById("themeSelect");
const themeLabel = document.getElementById("themeLabel");
let currentTheme = applyTheme(safeStorageGet(THEME_KEY) || "midnight");
if (themeLabel) {
  themeLabel.textContent = `Тема: ${getThemeName(currentTheme)}`;
}

if (themeSelect) {
  themeSelect.value = currentTheme;
  themeSelect.addEventListener("change", () => {
    currentTheme = applyTheme(themeSelect.value);
    if (themeLabel) {
      themeLabel.textContent = `Тема: ${getThemeName(currentTheme)}`;
    }
  });
}

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
if (profileName) profileName.value = currentUser?.name || "";
if (profileEmail) profileEmail.value = currentUser?.email || "";

const settingsLanguage = document.getElementById("settingsLanguage");
const settingsTimezone = document.getElementById("settingsTimezone");
const settingsPrivacyMode = document.getElementById("settingsPrivacyMode");
const settingsAutoLogout = document.getElementById("settingsAutoLogout");
const notifyEmail = document.getElementById("notifyEmail");
const notifyTelegram = document.getElementById("notifyTelegram");
const notifyDigest = document.getElementById("notifyDigest");
const settingsStatus = document.getElementById("settingsStatus");

function applySettingsToForm(settings) {
  if (settingsLanguage) settingsLanguage.value = settings.language;
  if (settingsTimezone) settingsTimezone.value = settings.timezone;
  if (settingsPrivacyMode) settingsPrivacyMode.value = settings.privacyMode;
  if (settingsAutoLogout) settingsAutoLogout.value = String(settings.autoLogoutMinutes);
  if (notifyEmail) notifyEmail.checked = Boolean(settings.notifications?.email);
  if (notifyTelegram) notifyTelegram.checked = Boolean(settings.notifications?.telegram);
  if (notifyDigest) notifyDigest.checked = Boolean(settings.notifications?.digest);
}

function readSettingsFromForm() {
  return {
    language: settingsLanguage?.value || DEFAULT_SETTINGS.language,
    timezone: settingsTimezone?.value || DEFAULT_SETTINGS.timezone,
    privacyMode: settingsPrivacyMode?.value || DEFAULT_SETTINGS.privacyMode,
    autoLogoutMinutes: Number(settingsAutoLogout?.value || DEFAULT_SETTINGS.autoLogoutMinutes),
    notifications: {
      email: Boolean(notifyEmail?.checked),
      telegram: Boolean(notifyTelegram?.checked),
      digest: Boolean(notifyDigest?.checked)
    }
  };
}

let userSettings = getUserSettings(currentUser?.email);
applySettingsToForm(userSettings);

const securityNotice = document.getElementById("securityNotice");
const saveProfileBtn = document.getElementById("saveProfileBtn");
if (saveProfileBtn) {
  saveProfileBtn.addEventListener("click", () => {
    setButtonLoading(saveProfileBtn, true, "Сохраняем...");

    const previousEmail = currentUser?.email || "";
    const nextName = (profileName?.value || "").trim();
    const nextEmail = (profileEmail?.value || "").trim().toLowerCase();

    markInvalid(["profileName", "profileEmail"]);

    if (!nextName || !nextEmail) {
      setMessage(securityNotice, "Имя и email обязательны.", "error", true);
      markInvalid(["profileName", "profileEmail"], !nextName ? "profileName" : "profileEmail");
      setButtonLoading(saveProfileBtn, false);
      return;
    }

    currentUser = { ...currentUser, name: nextName, email: nextEmail };
    safeStorageSet("auraCurrentUser", JSON.stringify(currentUser));
    updateLocalUser(currentUser, previousEmail);
    migrateUserSettingsEmail(previousEmail, nextEmail);
    userSettings = getUserSettings(nextEmail);
    applySettingsToForm(userSettings);
    if (userName) userName.textContent = nextName;
    setMessage(securityNotice, "Профиль обновлен.", "success", true);
    setButtonLoading(saveProfileBtn, false);
  });
}

const saveSettingsBtn = document.getElementById("saveSettingsBtn");
if (saveSettingsBtn) {
  saveSettingsBtn.addEventListener("click", () => {
    setButtonLoading(saveSettingsBtn, true, "Сохраняем...");
    userSettings = readSettingsFromForm();
    saveUserSettings(currentUser?.email, userSettings);
    safeStorageSet("auraLang", userSettings.language);
    setMessage(settingsStatus, "Настройки кабинета сохранены.", "success", true);
    setButtonLoading(saveSettingsBtn, false);
  });
}

const resetSettingsBtn = document.getElementById("resetSettingsBtn");
if (resetSettingsBtn) {
  resetSettingsBtn.addEventListener("click", () => {
    userSettings = {
      ...DEFAULT_SETTINGS,
      notifications: { ...DEFAULT_SETTINGS.notifications }
    };
    applySettingsToForm(userSettings);
    saveUserSettings(currentUser?.email, userSettings);
    setMessage(settingsStatus, "Настройки сброшены к значениям по умолчанию.", "info", true);
  });
}

const currentPasswordAccount = document.getElementById("currentPasswordAccount");
const newPasswordAccount = document.getElementById("newPasswordAccount");
const newPasswordRepeatAccount = document.getElementById("newPasswordRepeatAccount");
const securityStatus = document.getElementById("securityStatus");

const changePasswordBtn = document.getElementById("changePasswordBtn");
if (changePasswordBtn) {
  changePasswordBtn.addEventListener("click", () => {
    setButtonLoading(changePasswordBtn, true, "Меняем...");

    const currentValue = (currentPasswordAccount?.value || "").trim();
    const nextValue = (newPasswordAccount?.value || "").trim();
    const repeatValue = (newPasswordRepeatAccount?.value || "").trim();

    markInvalid(["currentPasswordAccount", "newPasswordAccount", "newPasswordRepeatAccount"]);

    if (!currentValue || !nextValue || !repeatValue) {
      setMessage(securityStatus, "Заполните все поля для смены пароля.", "error", true);
      markInvalid(
        ["currentPasswordAccount", "newPasswordAccount", "newPasswordRepeatAccount"],
        !currentValue ? "currentPasswordAccount" : !nextValue ? "newPasswordAccount" : "newPasswordRepeatAccount"
      );
      setButtonLoading(changePasswordBtn, false);
      return;
    }

    if (currentUser?.password && currentUser.password !== currentValue) {
      setMessage(securityStatus, "Текущий пароль введен неверно.", "error", true);
      markInvalid(["currentPasswordAccount", "newPasswordAccount", "newPasswordRepeatAccount"], "currentPasswordAccount");
      setButtonLoading(changePasswordBtn, false);
      return;
    }

    if (nextValue.length < 6) {
      setMessage(securityStatus, "Новый пароль должен быть не менее 6 символов.", "error", true);
      markInvalid(["currentPasswordAccount", "newPasswordAccount", "newPasswordRepeatAccount"], "newPasswordAccount");
      setButtonLoading(changePasswordBtn, false);
      return;
    }

    if (nextValue !== repeatValue) {
      setMessage(securityStatus, "Подтверждение пароля не совпадает.", "error", true);
      markInvalid(["currentPasswordAccount", "newPasswordAccount", "newPasswordRepeatAccount"], "newPasswordRepeatAccount");
      setButtonLoading(changePasswordBtn, false);
      return;
    }

    currentUser = { ...currentUser, password: nextValue };
    safeStorageSet("auraCurrentUser", JSON.stringify(currentUser));
    updateLocalUser(currentUser);

    if (currentPasswordAccount) currentPasswordAccount.value = "";
    if (newPasswordAccount) newPasswordAccount.value = "";
    if (newPasswordRepeatAccount) newPasswordRepeatAccount.value = "";
    setMessage(securityStatus, "Пароль успешно обновлен.", "success", true);
    setButtonLoading(changePasswordBtn, false);
  });
}

const extendSessionBtn = document.getElementById("extendSessionBtn");
if (extendSessionBtn) {
  extendSessionBtn.addEventListener("click", () => {
    const currentSession = parseJson(safeStorageGet("auraSession"));
    if (!currentSession || currentSession.userEmail !== currentUser?.email) {
      setMessage(securityStatus, "Сессия не найдена, выполните вход заново.", "error", true);
      return;
    }

    const ttlMinutes = Number(userSettings?.autoLogoutMinutes || DEFAULT_SETTINGS.autoLogoutMinutes);
    const updatedSession = {
      ...currentSession,
      expiresAt: addHours(new Date(), Math.max(1, ttlMinutes / 60)).toISOString()
    };
    safeStorageSet("auraSession", JSON.stringify(updatedSession));

    if (sessionStatus) {
      setMessage(sessionStatus, `Сессия активна до: ${new Date(updatedSession.expiresAt).toLocaleString()}`, "info");
    }
    setMessage(securityStatus, "Сессия продлена.", "success", true);
  });
}

const exportDataBtn = document.getElementById("exportDataBtn");
if (exportDataBtn) {
  exportDataBtn.addEventListener("click", () => {
    const rows = [
      ["name", currentUser?.name || ""],
      ["email", currentUser?.email || ""],
      ["subscriptionPlan", currentUser?.subscriptionPlan || ""],
      ["subscriptionEndsAt", currentUser?.subscriptionEndsAt || ""],
      ["sessionExpiresAt", session?.expiresAt || ""]
    ];
    const csv = rows.map(([key, value]) => `${escapeCsvValue(key)},${escapeCsvValue(value)}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "lidcraft-user-data.csv";
    link.click();
    URL.revokeObjectURL(link.href);
    setMessage(securityNotice, "Экспорт данных выполнен.", "success", true);
  });
}

const clearDataBtn = document.getElementById("clearDataBtn");
if (clearDataBtn) {
  clearDataBtn.addEventListener("click", () => {
    const keysToKeep = ["auraLang", "auraTheme"];
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (!keysToKeep.includes(key)) {
        safeStorageRemove(key);
      }
    });
    setMessage(securityNotice, "Локальные данные очищены. Выполните вход заново.", "info", true);
    setTimeout(() => {
      window.location.href = "auth.html";
    }, 900);
  });
}

const deleteAccountBtn = document.getElementById("deleteAccountBtn");
if (deleteAccountBtn) {
  deleteAccountBtn.addEventListener("click", () => {
    const users = getLocalUsers().filter((user) => user.email !== currentUser?.email);
    safeStorageSet("auraUsers", JSON.stringify(users));
    safeStorageRemove("auraCurrentUser");
    safeStorageRemove("auraSession");
    setMessage(securityNotice, "Аккаунт удален локально.", "success", true);
    setTimeout(() => {
      window.location.href = "auth.html";
    }, 900);
  });
}

const aiPromptInput = document.getElementById("aiPromptInput");
const aiPromptCheckBtn = document.getElementById("aiPromptCheckBtn");
const aiPromptResult = document.getElementById("aiPromptResult");

if (aiPromptCheckBtn && aiPromptInput && aiPromptResult) {
  aiPromptCheckBtn.addEventListener("click", () => {
    setButtonLoading(aiPromptCheckBtn, true, "Проверяем...");
    const safe = checkPromptSafety(aiPromptInput.value || "");
    if (safe) {
      setMessage(aiPromptResult, "Запрос безопасен: можно отправлять в ИИ-модуль.", "success");
    } else {
      setMessage(aiPromptResult, "Запрос заблокирован защитой: обнаружена попытка получить инструкции/код проекта.", "error", true);
    }
    setButtonLoading(aiPromptCheckBtn, false);
  });
}

clearInvalidOnInput([
  "profileName",
  "profileEmail",
  "currentPasswordAccount",
  "newPasswordAccount",
  "newPasswordRepeatAccount"
]);

bindPasswordHint("newPasswordAccount", "newPasswordAccountHint");
enhancePasswordInputs(["currentPasswordAccount", "newPasswordAccount", "newPasswordRepeatAccount"]);

if (saveProfileBtn) {
  bindEnterByIds(["profileName", "profileEmail"], () => saveProfileBtn.click());
}

if (saveSettingsBtn) {
  bindEnterByIds(["settingsLanguage", "settingsTimezone", "settingsPrivacyMode", "settingsAutoLogout"], () => saveSettingsBtn.click());
}

if (changePasswordBtn) {
  bindEnterByIds(["currentPasswordAccount", "newPasswordAccount", "newPasswordRepeatAccount"], () => changePasswordBtn.click());
}

if (aiPromptCheckBtn) {
  bindEnterByIds(["aiPromptInput"], () => aiPromptCheckBtn.click());
}

const questions = [
  "1) Есть ли у вас единый стандарт ответа клиенту?",
  "2) Используете ли вы CRM или таблицу для контроля лидов?",
  "3) Видит ли руководитель в реальном времени новые обращения?",
  "4) Есть ли четкий процесс доведения клиента до оплаты?"
];

let index = 0;
let score = 0;

const q = document.getElementById("cabQuizQuestion");
const p = document.getElementById("cabQuizProgress");
const r = document.getElementById("cabQuizResult");
const buttons = document.querySelectorAll("[data-cab-quiz]");

function isTypingContext() {
  const active = document.activeElement;
  if (!active) return false;
  const tag = (active.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return true;
  return active.isContentEditable === true;
}

function redraw() {
  if (!q || !p) return;
  if (index < questions.length) {
    q.textContent = questions[index];
    p.textContent = `Вопрос ${index + 1} из ${questions.length}`;
  }
}

function finish() {
  if (!q || !p || !r) return;
  q.textContent = "Тест завершен";
  p.textContent = "Готово";

  if (score >= 3) {
    r.textContent = "У вас хорошая база: можно быстро масштабировать автоматизацию и усилить конверсию.";
  } else {
    r.textContent = "Есть зоны роста: начните с автоматизации обработки лидов и контроля этапов продаж.";
  }
}

if (buttons.length) {
  const answerByValue = (value) => {
    if (index >= questions.length) return;
    if (value === "yes") {
      score += 1;
    }
    index += 1;
    if (index >= questions.length) {
      finish();
    } else {
      redraw();
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      answerByValue(button.getAttribute("data-cab-quiz"));
    });
  });

  document.addEventListener("keydown", (event) => {
    if (isTypingContext()) return;
    if (index >= questions.length) return;

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

  redraw();
}
