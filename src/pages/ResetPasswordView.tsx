/*import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function ResetPasswordView() {
  const query = useQuery();
  const navigate = useNavigate();

  const token = query.get("token") ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Token saknas i länken.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Lösenordet måste vara minst 8 tecken.");
      return;
    }
    if (newPassword !== repeatPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }

    setStatus("loading");
    try {
      await resetPassword(token, newPassword);
      setStatus("done");
      setTimeout(() => navigate("/login"), 1200);
    } catch {
      setError("Ogiltig eller utgången länk. Begär en ny återställning.");
      setStatus("idle");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/40">
      <h2 className="text-3xl font-branding text-monstera-dark mb-6 text-center">Välj nytt lösenord</h2>

      {status === "done" ? (
        <div className="text-center">
          <p className="text-monstera-green font-bold text-lg mb-4">Lösenordet är uppdaterat! 🎉</p>
          <Link to="/login" className="inline-block px-6 py-2 bg-monstera-green text-white rounded-xl hover:bg-monstera-dark transition-colors">Gå till login</Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-bold text-monstera-green mb-1">Nytt lösenord</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-monstera-green/20 focus:outline-none focus:ring-2 focus:ring-monstera-medium transition-all"
            />
          </div>

          <div>
            <label htmlFor="repeatPassword" className="block text-sm font-bold text-monstera-green mb-1">Upprepa lösenord</label>
            <input
              id="repeatPassword"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-monstera-green/20 focus:outline-none focus:ring-2 focus:ring-monstera-medium transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3.5 bg-monstera-green text-white font-bold rounded-xl hover:bg-monstera-dark hover:scale-[1.02] shadow-lg shadow-monstera-green/20 transition-all duration-200 disabled:opacity-70 disabled:hover:scale-100 mt-2"
          >
            {status === "loading" ? "Sparar..." : "Spara nytt lösenord"}
          </button>

          {error && <p className="p-3 bg-red-100/80 text-red-700 rounded-lg text-sm text-center border border-red-200">{error}</p>}

          <p className="text-center text-sm pt-2">
            <Link to="/forgot-password" className="text-monstera-medium hover:text-monstera-dark font-semibold underline decoration-2 underline-offset-2">Begär ny återställningslänk</Link>
          </p>
        </form>
      )}
    </div>
  );
} */
