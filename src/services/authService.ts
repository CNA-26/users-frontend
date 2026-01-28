import { USERS_API_URL } from "../config/api";

export type AuthResponse = {
  token: string;
};

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { message?: string };
    if (data?.message) return data.message;
  } catch {
  }

  try {
    const text = await response.text();
    if (text) return text;
  } catch {
  }

  return `${response.status} ${response.statusText}`;
}

/**
 * Expected backend:
 * POST {USERS_API_URL}/login
 * body: { email, password }
 * response: { token }
 */
export async function login(email: string, password: string): Promise<string> {
  const response = await fetch(`${USERS_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const data = (await response.json()) as AuthResponse;

  if (!data?.token) {
    throw new Error("Login response missing token");
  }

  localStorage.setItem("jwt", data.token);
  return data.token;
}

export async function register(email: string, password: string): Promise<string> {
  const response = await fetch(`${USERS_API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const data = (await response.json()) as AuthResponse;

  if (!data?.token) {

    throw new Error("Register response missing token");
  }

  localStorage.setItem("jwt", data.token);
  return data.token;
}

export function logout() {
  localStorage.removeItem("jwt");
}
