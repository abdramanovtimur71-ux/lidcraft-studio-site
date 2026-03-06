function safeStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
  }
}

function safeStorageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
  }
}

const API_BASE = safeStorageGet("auraApiBase") || "http://localhost:8002";
const SESSION_TTL_HOURS = 12;
const SUBSCRIPTION_DAYS = 30;

function addHours(date, hours) {
  const next = new Date(date.getTime());
  next.setHours(next.getHours() + hours);
  return next;
}

function addDays(date, days) {
  const next = new Date(date.getTime());
  next.setDate(next.getDate() + days);
  return next;
}

function saveSession(user) {
  const now = new Date();
  const session = {
    userEmail: user?.email || "",
    issuedAt: now.toISOString(),
    expiresAt: addHours(now, SESSION_TTL_HOURS).toISOString()
  };
  safeStorageSet("auraSession", JSON.stringify(session));
}

function getLocalUsers() {
  try {
    const raw = safeStorageGet("auraUsers");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocalUsers(users) {
  safeStorageSet("auraUsers", JSON.stringify(users));
}

function createLocalUser(name, email, password, extras = {}) {
  const now = new Date();
  return {
    id: `usr_${Date.now()}`,
    name,
    email,
    password,
    createdAt: now.toISOString(),
    subscriptionEndsAt: addDays(now, SUBSCRIPTION_DAYS).toISOString(),
    subscriptionPlan: "Start",
    subscriptionActive: true,
    acceptedLegal: extras.acceptedLegal === true,
    marketingOptIn: extras.marketingOptIn === true
  };
}

async function authWithFallback(mode, payload) {
  try {
    const endpoint = mode === "register" ? "/auth/register" : "/auth/login";
    const result = await apiPost(endpoint, payload);
    const normalizedUser = {
      ...result.user,
      subscriptionEndsAt: result.user?.subscriptionEndsAt || addDays(new Date(), SUBSCRIPTION_DAYS).toISOString(),
      subscriptionPlan: result.user?.subscriptionPlan || "Start",
      subscriptionActive: result.user?.subscriptionActive !== false
    };
    return { user: normalizedUser };
  } catch {
    const users = getLocalUsers();

    if (mode === "register") {
      const exists = users.some((user) => user.email === payload.email);
      if (exists) {
        throw new Error("Пользователь с таким email уже зарегистрирован.");
      }

      const localUser = createLocalUser(payload.name, payload.email, payload.password, {
        acceptedLegal: payload.acceptedLegal,
        marketingOptIn: payload.marketingOptIn
      });
      setLocalUsers([...users, localUser]);
      return { user: localUser };
    }

    const found = users.find((user) => user.email === payload.email && user.password === payload.password);
    if (!found) {
      throw new Error("Неверный email или пароль.");
    }

    return {
      user: {
        ...found,
        subscriptionActive: found.subscriptionActive !== false
      }
    };
  }
}

async function apiPost(path, payload) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.detail || "Ошибка запроса");
  }
  return data;
}

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const guestLaunchBtn = document.getElementById("guestLaunchBtn");

function startGuestLaunch() {
  const now = new Date();
  const guestUser = {
    id: `guest_${Date.now()}`,
    name: "Гость",
    email: `guest_${Date.now()}@lidcraft.local`,
    password: "",
    createdAt: now.toISOString(),
    subscriptionEndsAt: addDays(now, 2).toISOString(),
    subscriptionPlan: "Guest Demo",
    subscriptionActive: true,
    role: "guest"
  };

  safeStorageSet("auraCurrentUser", JSON.stringify(guestUser));
  saveSession(guestUser);
  window.location.href = "account.html";
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
      hint.textContent = "Пароль: минимум 6 символов. Лучше использовать буквы, цифры и спецсимволы.";
      return;
    }
    if (level === "weak") {
      hint.textContent = "Надежность: низкая. Добавьте длину, цифры и спецсимволы.";
      return;
    }
    if (level === "medium") {
      hint.textContent = "Надежность: средняя. Почти хорошо, добавьте разнообразие символов.";
      return;
    }
    hint.textContent = "Надежность: высокая. Такой пароль подходит.";
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

if (registerBtn) {
  registerBtn.addEventListener("click", async () => {
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const consent = document.getElementById("regConsent");
    const marketingConsent = document.getElementById("regMarketingConsent");
    const regMessage = document.getElementById("regMessage");

    markInvalid(["regName", "regEmail", "regPassword"]);

    if (!name || !email || !password) {
      setMessage(regMessage, "Заполните все поля для регистрации.", "error", true);
      markInvalid(["regName", "regEmail", "regPassword"], !name ? "regName" : !email ? "regEmail" : "regPassword");
      return;
    }

    if (password.length < 6) {
      setMessage(regMessage, "Пароль должен быть не менее 6 символов.", "error", true);
      markInvalid(["regName", "regEmail", "regPassword"], "regPassword");
      return;
    }

    if (!consent?.checked) {
      setMessage(regMessage, "Подтвердите согласие с условиями и политикой.", "error", true);
      return;
    }

    try {
      setButtonLoading(registerBtn, true, "Создаем...");
      const result = await authWithFallback("register", {
        name,
        email,
        password,
        acceptedLegal: true,
        marketingOptIn: Boolean(marketingConsent?.checked)
      });
      result.user = {
        ...result.user,
        acceptedLegal: true,
        marketingOptIn: Boolean(marketingConsent?.checked)
      };
      safeStorageSet("auraCurrentUser", JSON.stringify(result.user));
      saveSession(result.user);
      setMessage(regMessage, "Регистрация успешна. Переходим в личный кабинет...", "success", true);
      setTimeout(() => {
        window.location.href = "account.html";
      }, 700);
    } catch (error) {
      setMessage(regMessage, error.message, "error", true);
      markInvalid(["regName", "regEmail", "regPassword"], "regEmail");
    } finally {
      setButtonLoading(registerBtn, false);
    }
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const loginMessage = document.getElementById("loginMessage");

    markInvalid(["loginEmail", "loginPassword"]);

    if (!email || !password) {
      setMessage(loginMessage, "Введите email и пароль.", "error", true);
      markInvalid(["loginEmail", "loginPassword"], !email ? "loginEmail" : "loginPassword");
      return;
    }

    try {
      setButtonLoading(loginBtn, true, "Входим...");
      const result = await authWithFallback("login", { email, password });
      safeStorageSet("auraCurrentUser", JSON.stringify(result.user));
      saveSession(result.user);
      setMessage(loginMessage, "Вход выполнен. Переходим в кабинет...", "success", true);
      setTimeout(() => {
        window.location.href = "account.html";
      }, 500);
    } catch (error) {
      setMessage(loginMessage, error.message, "error", true);
      markInvalid(["loginEmail", "loginPassword"], "loginPassword");
    } finally {
      setButtonLoading(loginBtn, false);
    }
  });
}

if (guestLaunchBtn) {
  guestLaunchBtn.addEventListener("click", () => {
    startGuestLaunch();
  });
}

function handleUpgradeHash() {
  if (window.location.hash !== "#upgrade") return;

  const message = document.getElementById("upgradeMessage");
  const registerSection = document.getElementById("registerSection");
  const regName = document.getElementById("regName");
  const regEmail = document.getElementById("regEmail");

  let draft = null;
  try {
    draft = JSON.parse(safeStorageGet("auraGuestDraft") || "null");
  } catch {
    draft = null;
  }

  if (draft?.name && regName) {
    regName.value = draft.name;
  }
  if (draft?.email && regEmail) {
    regEmail.value = draft.email.includes("@lidcraft.local") ? "" : draft.email;
  }
  safeStorageRemove("auraGuestDraft");

  if (message) {
    message.hidden = false;
    message.textContent = "Вы были в гостевом режиме. Данные перенесены в форму регистрации: завершите создание аккаунта для постоянного доступа.";
  }

  if (registerSection) {
    registerSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  setTimeout(() => {
    if (regName) regName.focus();
  }, 250);
}

const showForgotBtn = document.getElementById("showForgotBtn");
const forgotBlock = document.getElementById("forgotBlock");
const sendCodeBtn = document.getElementById("sendCodeBtn");
const resetPasswordBtn = document.getElementById("resetPasswordBtn");

if (showForgotBtn && forgotBlock) {
  showForgotBtn.addEventListener("click", () => {
    forgotBlock.style.display = forgotBlock.style.display === "none" ? "block" : "none";
  });
}

if (sendCodeBtn) {
  sendCodeBtn.addEventListener("click", async () => {
    const channel = document.getElementById("forgotChannel").value;
    const identifier = document.getElementById("forgotIdentifier").value.trim();
    const forgotMessage = document.getElementById("forgotMessage");

    if (!identifier) {
      setMessage(forgotMessage, "Введите email или телефон.", "error", true);
      markInvalid(["forgotIdentifier"], "forgotIdentifier");
      return;
    }

    try {
      setButtonLoading(sendCodeBtn, true, "Отправляем...");
      const result = await apiPost("/auth/forgot/request", { channel, identifier });
      if (result.debugCode) {
        setMessage(forgotMessage, `Код отправлен (dev-режим): ${result.debugCode}. Введите его ниже.`, "info", true);
      } else {
        setMessage(forgotMessage, "Код отправлен. Проверьте выбранный канал и введите код ниже.", "success", true);
      }
    } catch (error) {
      setMessage(forgotMessage, error.message, "error", true);
    } finally {
      setButtonLoading(sendCodeBtn, false);
    }
  });
}

if (resetPasswordBtn) {
  resetPasswordBtn.addEventListener("click", async () => {
    const identifier = document.getElementById("forgotIdentifier").value.trim();
    const code = document.getElementById("forgotCode").value.trim();
    const newPassword = document.getElementById("newPassword").value;
    const forgotMessage = document.getElementById("forgotMessage");

    markInvalid(["forgotIdentifier", "forgotCode", "newPassword"]);

    if (!identifier || !code || !newPassword) {
      setMessage(forgotMessage, "Заполните все поля восстановления.", "error", true);
      markInvalid(
        ["forgotIdentifier", "forgotCode", "newPassword"],
        !identifier ? "forgotIdentifier" : !code ? "forgotCode" : "newPassword"
      );
      return;
    }

    try {
      setButtonLoading(resetPasswordBtn, true, "Обновляем...");
      await apiPost("/auth/forgot/verify", { identifier, code, new_password: newPassword });
      setMessage(forgotMessage, "Пароль обновлен. Теперь выполните вход с новым паролем.", "success", true);
    } catch (error) {
      const users = getLocalUsers();
      const userIndex = users.findIndex((user) => user.email === identifier);
      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        setLocalUsers(users);
        setMessage(forgotMessage, "Пароль обновлен локально. Теперь выполните вход с новым паролем.", "success", true);
      } else {
        setMessage(forgotMessage, error.message, "error", true);
      }
    } finally {
      setButtonLoading(resetPasswordBtn, false);
    }
  });
}

clearInvalidOnInput([
  "regName",
  "regEmail",
  "regPassword",
  "loginEmail",
  "loginPassword",
  "forgotIdentifier",
  "forgotCode",
  "newPassword"
]);

bindPasswordHint("regPassword", "regPasswordHint");
bindPasswordHint("newPassword", "forgotPasswordHint");
enhancePasswordInputs(["regPassword", "loginPassword", "newPassword"]);

if (registerBtn) {
  bindEnterByIds(["regName", "regEmail", "regPassword"], () => registerBtn.click());
}

if (loginBtn) {
  bindEnterByIds(["loginEmail", "loginPassword"], () => loginBtn.click());
}

if (sendCodeBtn && forgotBlock) {
  bindEnterByIds(["forgotIdentifier"], () => {
    if (forgotBlock.style.display !== "none") {
      sendCodeBtn.click();
    }
  });
}

if (resetPasswordBtn && forgotBlock) {
  bindEnterByIds(["forgotCode", "newPassword"], () => {
    if (forgotBlock.style.display !== "none") {
      resetPasswordBtn.click();
    }
  });
}

if (window.location.hash === "#guest") {
  startGuestLaunch();
}

handleUpgradeHash();

window.addEventListener("beforeunload", () => {
  const messageNode = document.getElementById("loginMessage");
  if (messageNode && messageNode.textContent.includes("Ошибка")) {
    safeStorageRemove("auraSession");
  }
});
