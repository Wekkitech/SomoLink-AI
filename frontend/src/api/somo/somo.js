const BASE = import.meta.env.VITE_API_BASE || "";

export async function loginAdmin({ schoolId, password }) {
  const res = await fetch(`${BASE}/somo/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ schoolId, password }),
  });
  const json = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data: json };
}

export async function requestAdminReset({ email }) {
  const res = await fetch(`${BASE}/somo/admin/forgot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const json = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data: json };
}

export async function signupAdmin(payload) {
  const res = await fetch(`${BASE}/somo/admin/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data: json };
}
