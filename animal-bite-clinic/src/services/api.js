
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "abc_token";
const USER_KEY = "abc_user";

export const auth = {
  getToken: () => sessionStorage.getItem(TOKEN_KEY),
  getUser: () => {
    try {
      return JSON.parse(sessionStorage.getItem(USER_KEY));
    } catch {
      return null;
    }
  },
  setSession: (token, user) => {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear: () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },
};

let onUnauthorized = () => {};
export const setUnauthorizedHandler = (fn) => {
  onUnauthorized = fn;
};

async function request(path, options = {}) {
  const token = auth.getToken();
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });

  if (!res.ok) {
    if (res.status === 401 && token) {
      auth.clear();
      onUnauthorized();
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed (${res.status})`);
  }
  return res.status === 204 ? null : res.json();
}

export const api = {
  getPatients: () => request("/patients"),
  addPatient: (data) =>
    request("/patients", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  deletePatient: (id) =>
    request(`/patients/${id}`, {
      method: "DELETE",
    }),

  getAppointments: () => request("/appointments"),
  addAppointment: (data) =>
    request("/appointments", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateAppointment: (id, data) =>
    request(`/appointments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteAppointment: (id) =>
    request(`/appointments/${id}`, { method: "DELETE" }),

  getBills: () => request("/bills"),
  addBill: (data) =>
    request("/bills", { method: "POST", body: JSON.stringify(data) }),
  deleteBill: (id) => request(`/bills/${id}`, { method: "DELETE" }),

  getUsers: () => request("/users"),
  addUser: (data) =>
    request("/users", { method: "POST", body: JSON.stringify(data) }),
  deleteUser: (id) => request(`/users/${id}`, { method: "DELETE"}),

  login: (username, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    }),
};
