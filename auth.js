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

function createLocalUser(name, email, password) {
  const now = new Date();
  return {
    id: `usr_${Date.now()}`,
    name,
    email,
    password,
    createdAt: now.toISOString(),
    subscriptionEndsAt: addDays(now, SUBSCRIPTION_DAYS).toISOString(),
    subscriptionPlan: "Start",
    subscriptionActive: true
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

      const localUser = createLocalUser(payload.name, payload.email, payload.password);
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

if (registerBtn) {
  registerBtn.addEventListener("click", async () => {
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const regMessage = document.getElementById("regMessage");

    if (!name || !email || !password) {
      regMessage.textContent = "Заполните все поля для регистрации.";
      return;
    }

    if (password.length < 6) {
      regMessage.textContent = "Пароль должен быть не менее 6 символов.";
      return;
    }

    try {
      const result = await authWithFallback("register", { name, email, password });
      safeStorageSet("auraCurrentUser", JSON.stringify(result.user));
      saveSession(result.user);
      regMessage.textContent = "Регистрация успешна. Переходим в личный кабинет...";
      setTimeout(() => {
        window.location.href = "account.html";
      }, 700);
    } catch (error) {
      regMessage.textContent = error.message;
    }
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const loginMessage = document.getElementById("loginMessage");

    if (!email || !password) {
      loginMessage.textContent = "Введите email и пароль.";
      return;
    }

    try {
      const result = await authWithFallback("login", { email, password });
      safeStorageSet("auraCurrentUser", JSON.stringify(result.user));
      saveSession(result.user);
      loginMessage.textContent = "Вход выполнен. Переходим в кабинет...";
      setTimeout(() => {
        window.location.href = "account.html";
      }, 500);
    } catch (error) {
      loginMessage.textContent = error.message;
    }
  });
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
      forgotMessage.textContent = "Введите email или телефон.";
      return;
    }

    try {
      const result = await apiPost("/auth/forgot/request", { channel, identifier });
      if (result.debugCode) {
        forgotMessage.textContent = `Код отправлен (dev-режим): ${result.debugCode}. Введите его ниже.`;
      } else {
        forgotMessage.textContent = "Код отправлен. Проверьте выбранный канал и введите код ниже.";
      }
    } catch (error) {
      forgotMessage.textContent = error.message;
    }
  });
}

if (resetPasswordBtn) {
  resetPasswordBtn.addEventListener("click", async () => {
    const identifier = document.getElementById("forgotIdentifier").value.trim();
    const code = document.getElementById("forgotCode").value.trim();
    const newPassword = document.getElementById("newPassword").value;
    const forgotMessage = document.getElementById("forgotMessage");

    if (!identifier || !code || !newPassword) {
      forgotMessage.textContent = "Заполните все поля восстановления.";
      return;
    }

    try {
      await apiPost("/auth/forgot/verify", { identifier, code, new_password: newPassword });
      forgotMessage.textContent = "Пароль обновлен. Теперь выполните вход с новым паролем.";
    } catch (error) {
      const users = getLocalUsers();
      const userIndex = users.findIndex((user) => user.email === identifier);
      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        setLocalUsers(users);
        forgotMessage.textContent = "Пароль обновлен локально. Теперь выполните вход с новым паролем.";
      } else {
        forgotMessage.textContent = error.message;
      }
    }
  });
}

window.addEventListener("beforeunload", () => {
  const messageNode = document.getElementById("loginMessage");
  if (messageNode && messageNode.textContent.includes("Ошибка")) {
    safeStorageRemove("auraSession");
  }
});
