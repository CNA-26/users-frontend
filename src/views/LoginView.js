import { login } from "../services/authService.js";

export async function handleLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await login(email, password);
    console.log("Login successful");
  } catch (error) {
    alert("Fel email eller lösenord");
  }
}
