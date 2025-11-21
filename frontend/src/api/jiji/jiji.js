const BASE = import.meta.env.VITE_API_BASE || "";

export async function loginWithPassword({ phone, password }) {
  const res = await fetch(`${BASE}/jiji/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password }),
  });
  const json = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data: json };
}

export async function requestOtp({ phone }) {
  const res = await fetch(`${BASE}/jiji/auth/request-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });
  const json = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data: json };
}

export async function loginWithOtp({ phone, code }) {
  const res = await fetch(`${BASE}/jiji/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, code }),
  });
  const json = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data: json };
}

export async function signup(payload) {
  const res = await fetch(`${BASE}/jiji/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data: json };
}
