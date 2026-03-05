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
    const keepEnabled = node.id === "logoutBtn" || node.id === "saveProfileBtn" || node.id === "renewAccessBtn";
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

function updateLocalUser(user) {
  const users = getLocalUsers();
  const index = users.findIndex((item) => item.email === user.email);
  if (index !== -1) {
    users[index] = { ...users[index], ...user };
    safeStorageSet("auraUsers", JSON.stringify(users));
  }
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

const securityNotice = document.getElementById("securityNotice");
const saveProfileBtn = document.getElementById("saveProfileBtn");
if (saveProfileBtn) {
  saveProfileBtn.addEventListener("click", () => {
    const nextName = (profileName?.value || "").trim();
    const nextEmail = (profileEmail?.value || "").trim().toLowerCase();

    if (!nextName || !nextEmail) {
      if (securityNotice) securityNotice.textContent = "Имя и email обязательны.";
      return;
    }

    currentUser = { ...currentUser, name: nextName, email: nextEmail };
    safeStorageSet("auraCurrentUser", JSON.stringify(currentUser));
    updateLocalUser(currentUser);
    if (userName) userName.textContent = nextName;
    if (securityNotice) securityNotice.textContent = "Профиль обновлен.";
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
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (index >= questions.length) return;
      if (button.getAttribute("data-cab-quiz") === "yes") {
        score += 1;
      }
      index += 1;
      if (index >= questions.length) {
        finish();
      } else {
        redraw();
      }
    });
  });
  redraw();
}
