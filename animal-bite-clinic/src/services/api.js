const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed (${res.status})`);
  }
  return res.status === 204 ? null : res.json();
}

export const api = {
  getPatients: () => request("/patients"),
  addPatient: (data) => request("/patients", {
    method: "POST",
    body: JSON.stringify(data),
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
};
