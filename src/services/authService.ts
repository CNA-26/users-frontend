import { USERS_API_URL } from "../config/api";

export type AuthResponse = {
  token: string;
};

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { message?: string };
    if (data?.message) return data.message;
  } catch {
    // ignore
  }

  try {
    const text = await response.text();
    if (text) return text;
  } catch {
    // ignore
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

/**
 * Expected backend:
 * POST {USERS_API_URL}/register
 * body: { email, password }
 * response: { token }
 */
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

/**
 * Password reset step 1: request reset email
 * Expected backend:
 * POST {USERS_API_URL}/password-reset/request
 * body: { email }
 * response: (usually 200 OK, optionally with message)
 *
 * NOTE: Many backends always return 200 to avoid account enumeration.
 */
export async function requestPasswordReset(email: string): Promise<void> {
  const response = await fetch(`${USERS_API_URL}/password-reset/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
}

/**
 * Password reset step 2: confirm reset using token + new password
 * Expected backend:
 * POST {USERS_API_URL}/password-reset/confirm
 * body: { token, newPassword }
 * response: 200 OK
 */
export async function resetPassword(
  token: string,
  newPassword: string
): Promise<void> {
  const response = await fetch(`${USERS_API_URL}/password-reset/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
}

export function logout() {
  localStorage.removeItem("jwt");
}
