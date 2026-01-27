import { USERS_API_URL } from "../config/api";

export async function login(email, password) {
  const response = await fetch(`${USERS_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  localStorage.setItem("jwt", data.token);

  return data.token;
}
