import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      console.log("Login successful");
      navigate("/"); // or "/dashboard" or whatever route you use
    } catch (err) {
      setError("Fel email eller lösenord");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Lösenord</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Logga in</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
