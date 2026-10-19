import api from "./axios";

export async function login(email, password) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

export async function registerCandidate({ full_name, email, password }) {
  const { data } = await api.post("/auth/register", {
    full_name,
    email,
    password,
    role: "candidate",
  });
  return data;
}

export async function registerManager({ full_name, email, password }) {
  const { data } = await api.post("/auth/register", {
    full_name,
    email,
    password,
    role: "manager",
  });
  return data;
}

export async function getMe() {
  const { data } = await api.get("/auth/me");
  return data;
}

export async function logout() {
  await api.post("/auth/logout");
}

export async function changePassword(currentPassword, newPassword) {
  const { data } = await api.put("/auth/password", {
    current_password: currentPassword,
    new_password: newPassword,
  });
  return data;
}
