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

const sessionStatus = document.getElementById("sessionStatus");
if (sessionStatus && session?.expiresAt) {
  sessionStatus.textContent = `Сессия активна до: ${new Date(session.expiresAt).toLocaleString()}`;
}

const subscriptionStatus = document.getElementById("subscriptionStatus");
if (subscriptionStatus) {
  const active = isSubscriptionActive(currentUser);
  subscriptionStatus.textContent = active
    ? `Подписка активна до: ${new Date(currentUser.subscriptionEndsAt).toLocaleDateString()}`
    : "Подписка неактивна: функции кабинета ограничены до продления.";

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
    const previousEmail = currentUser?.email || "";
    const nextName = (profileName?.value || "").trim();
    const nextEmail = (profileEmail?.value || "").trim().toLowerCase();

    if (!nextName || !nextEmail) {
      if (securityNotice) securityNotice.textContent = "Имя и email обязательны.";
      return;
    }

    currentUser = { ...currentUser, name: nextName, email: nextEmail };
    safeStorageSet("auraCurrentUser", JSON.stringify(currentUser));
    updateLocalUser(currentUser, previousEmail);
    migrateUserSettingsEmail(previousEmail, nextEmail);
    userSettings = getUserSettings(nextEmail);
    applySettingsToForm(userSettings);
    if (userName) userName.textContent = nextName;
    if (securityNotice) securityNotice.textContent = "Профиль обновлен.";
  });
}

const saveSettingsBtn = document.getElementById("saveSettingsBtn");
if (saveSettingsBtn) {
  saveSettingsBtn.addEventListener("click", () => {
    userSettings = readSettingsFromForm();
    saveUserSettings(currentUser?.email, userSettings);
    safeStorageSet("auraLang", userSettings.language);
    if (settingsStatus) settingsStatus.textContent = "Настройки кабинета сохранены.";
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
    if (settingsStatus) settingsStatus.textContent = "Настройки сброшены к значениям по умолчанию.";
  });
}

const currentPasswordAccount = document.getElementById("currentPasswordAccount");
const newPasswordAccount = document.getElementById("newPasswordAccount");
const newPasswordRepeatAccount = document.getElementById("newPasswordRepeatAccount");
const securityStatus = document.getElementById("securityStatus");

const changePasswordBtn = document.getElementById("changePasswordBtn");
if (changePasswordBtn) {
  changePasswordBtn.addEventListener("click", () => {
    const currentValue = (currentPasswordAccount?.value || "").trim();
    const nextValue = (newPasswordAccount?.value || "").trim();
    const repeatValue = (newPasswordRepeatAccount?.value || "").trim();

    if (!currentValue || !nextValue || !repeatValue) {
      if (securityStatus) securityStatus.textContent = "Заполните все поля для смены пароля.";
      return;
    }

    if (currentUser?.password && currentUser.password !== currentValue) {
      if (securityStatus) securityStatus.textContent = "Текущий пароль введен неверно.";
      return;
    }

    if (nextValue.length < 6) {
      if (securityStatus) securityStatus.textContent = "Новый пароль должен быть не менее 6 символов.";
      return;
    }

    if (nextValue !== repeatValue) {
      if (securityStatus) securityStatus.textContent = "Подтверждение пароля не совпадает.";
      return;
    }

    currentUser = { ...currentUser, password: nextValue };
    safeStorageSet("auraCurrentUser", JSON.stringify(currentUser));
    updateLocalUser(currentUser);

    if (currentPasswordAccount) currentPasswordAccount.value = "";
    if (newPasswordAccount) newPasswordAccount.value = "";
    if (newPasswordRepeatAccount) newPasswordRepeatAccount.value = "";
    if (securityStatus) securityStatus.textContent = "Пароль успешно обновлен.";
  });
}

const extendSessionBtn = document.getElementById("extendSessionBtn");
if (extendSessionBtn) {
  extendSessionBtn.addEventListener("click", () => {
    const currentSession = parseJson(safeStorageGet("auraSession"));
    if (!currentSession || currentSession.userEmail !== currentUser?.email) {
      if (securityStatus) securityStatus.textContent = "Сессия не найдена, выполните вход заново.";
      return;
    }

    const ttlMinutes = Number(userSettings?.autoLogoutMinutes || DEFAULT_SETTINGS.autoLogoutMinutes);
    const updatedSession = {
      ...currentSession,
      expiresAt: addHours(new Date(), Math.max(1, ttlMinutes / 60)).toISOString()
    };
    safeStorageSet("auraSession", JSON.stringify(updatedSession));

    if (sessionStatus) {
      sessionStatus.textContent = `Сессия активна до: ${new Date(updatedSession.expiresAt).toLocaleString()}`;
    }
    if (securityStatus) securityStatus.textContent = "Сессия продлена.";
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
    if (securityNotice) securityNotice.textContent = "Экспорт данных выполнен.";
  });
}

const clearDataBtn = document.getElementById("clearDataBtn");
if (clearDataBtn) {
  clearDataBtn.addEventListener("click", () => {
    const keysToKeep = ["auraLang"];
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (!keysToKeep.includes(key)) {
        safeStorageRemove(key);
      }
    });
    if (securityNotice) securityNotice.textContent = "Локальные данные очищены. Выполните вход заново.";
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
    if (securityNotice) securityNotice.textContent = "Аккаунт удален локально.";
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
    const safe = checkPromptSafety(aiPromptInput.value || "");
    if (safe) {
      aiPromptResult.textContent = "Запрос безопасен: можно отправлять в ИИ-модуль.";
    } else {
      aiPromptResult.textContent = "Запрос заблокирован защитой: обнаружена попытка получить инструкции/код проекта.";
    }
  });
}

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
