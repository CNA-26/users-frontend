import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as apiRegister } from "../api/auth";
import { useAuth, User } from "../context/AuthContext";

// Helper to decode JWT payload
function parseJwt(token: string): any {
  try {
    const base64 = token.split(".")[1];
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function RegisterView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Lösenordet måste vara minst 6 tecken");
      return;
    }

    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte");
      return;
    }

    setIsSubmitting(true);
    try {
      const accessToken = await apiRegister(email, password); // string token

      // Decode JWT to extract user info
      const payload = parseJwt(accessToken);
      if (!payload || !payload.sub || !payload.email) {
        throw new Error("Kunde inte läsa användarinfo från token");
      }

      const user: User = {
        id: payload.sub,
        email: payload.email,
      };

      login(accessToken, user); // ✅ context expects token + user
      navigate("/");
    } catch (err: any) {
      const message = err instanceof Error ? err.message : "Kunde inte skapa konto";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/40">
      <h2 className="text-3xl font-branding text-monstera-dark mb-6 text-center">Skapa konto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-monstera-green mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-monstera-green/20 focus:outline-none focus:ring-2 focus:ring-monstera-medium transition-all"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-bold text-monstera-green mb-1">Lösenord</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-monstera-green/20 focus:outline-none focus:ring-2 focus:ring-monstera-medium transition-all"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-bold text-monstera-green mb-1">Bekräfta lösenord</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-monstera-green/20 focus:outline-none focus:ring-2 focus:ring-monstera-medium transition-all"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-monstera-green text-white font-bold rounded-xl hover:bg-monstera-dark hover:scale-[1.02] shadow-lg shadow-monstera-green/20 transition-all duration-200 disabled:opacity-70 disabled:hover:scale-100 mt-2"
        >
          {isSubmitting ? "Skapar konto..." : "Registrera"}
        </button>

        {error && <p className="p-3 bg-red-100/80 text-red-700 rounded-lg text-sm text-center border border-red-200">{error}</p>}

        <p className="text-center text-sm pt-2 text-monstera-dark">
          Har du redan ett konto? <Link to="/login" className="text-monstera-medium hover:text-monstera-dark font-semibold underline decoration-2 underline-offset-2">Logga in</Link>
        </p>
      </form>
    </div>
  );
}
