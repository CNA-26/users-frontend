import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { login as apiLogin } from "../api/auth";
import { useAuth, User } from "../context/AuthContext";
import { buildAuthenticatedStoreUrl } from "../utils/storeFrontendUtils";

function parseJwt(token: string): any {
  try {
    const base64 = token.split(".")[1];
    const jsonPayload = decodeURIComponent(
      atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
    );
    return JSON.parse(jsonPayload);
  } catch { return null; }
}

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => { document.title = "Monstera - Login"; }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await apiLogin(email, password);
      const payload = parseJwt(response.accessToken);
      // Fall back to form email if JWT payload doesn't have expected fields
      const user: User = {
        id: payload?.sub ?? payload?.id ?? email,
        email: payload?.email ?? email,
      };
      login(response.accessToken, user);

      // Check if we have a returnTo parameter
      const returnTo = searchParams.get("returnTo");
      if (returnTo) {
        // Redirect to the returnTo URL with auth tokens
        window.location.href = buildAuthenticatedStoreUrl(returnTo);
      } else {
        // Default behavior: redirect to store-frontend profile
        window.location.href = buildAuthenticatedStoreUrl("/");
      }
    } catch (err: any) {
      setError("Fel email eller lösenord");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/40">
      <h2 className="text-3xl font-branding text-monstera-dark mb-6 text-center">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-monstera-green mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-monstera-green/20 focus:outline-none focus:ring-2 focus:ring-monstera-medium transition-all"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-monstera-green text-white font-bold rounded-xl hover:bg-monstera-dark hover:scale-[1.02] shadow-lg shadow-monstera-green/20 transition-all duration-200"
        >
          Logga in
        </button>

        {error && <p className="p-3 bg-red-100/80 text-red-700 rounded-lg text-sm text-center border border-red-200">{error}</p>}

        <p className="text-center text-sm pt-2">
          <Link to="/forgot-password" className="text-monstera-medium hover:text-monstera-dark font-semibold underline decoration-2 underline-offset-2">Glömt lösenord?</Link>
        </p>
        <p className="text-center text-sm pt-1">
          <a
            href="https://admin-frontend-nico-branch-cna26-admin-frontend.2.rahtiapp.fi/"
            className="text-monstera-medium hover:text-monstera-dark font-semibold underline decoration-2 underline-offset-2"
          >
            Är du admin?
          </a>
        </p>
      </form>
    </div>
  );
}
