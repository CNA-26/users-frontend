import { login } from "../services/authService";

export async function handleLogin(): Promise<void> {
  const emailInput = document.getElementById("email") as HTMLInputElement | null;
  const passwordInput = document.getElementById("password") as HTMLInputElement | null;

  if (!emailInput || !passwordInput) {
    return;
  }

  const email: string = emailInput.value;
  const password: string = passwordInput.value;

  try {
    await login(email, password);
    console.log("Login successful");
  } catch (error) {
    alert("Fel email eller lösenord");
  }
}