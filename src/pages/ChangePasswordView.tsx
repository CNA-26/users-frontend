import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // your AuthContext
import { updatePassword } from "../api/auth"; 

export default function ChangePasswordView() {
  const { user } = useAuth(); // ensure user has 'id' property
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  // handle missing user
  if (!user?.id) {
    return (
      <div className="max-w-md mx-auto mt-10 p-8 text-center text-red-600">
        Ingen inloggad användare. Logga in först för att byta lösenord.
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
      await updatePassword(user.id, currentPassword, newPassword); // updated function name
      setStatus("done");
    } catch (err: any) {
      setError(err.message || "Något gick fel. Försök igen.");
      setStatus("idle");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/40">
      <h2 className="text-3xl font-branding text-monstera-dark mb-6 text-center">
        Byt lösenord
      </h2>

      {status === "done" ? (
        <div className="text-center text-monstera-green font-bold">
          Lösenordet är uppdaterat! 🎉
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword">Nuvarande lösenord</label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-monstera-green/20 focus:outline-none focus:ring-2 focus:ring-monstera-medium transition-all"
            />
          </div>

          <div>
            <label htmlFor="newPassword">Nytt lösenord</label>
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
            <label htmlFor="repeatPassword">Upprepa nytt lösenord</label>
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
            {status === "loading" ? "Sparar..." : "Byt lösenord"}
          </button>

          {error && (
            <p className="p-3 bg-red-100/80 text-red-700 rounded-lg text-sm text-center border border-red-200">{error}</p>
          )}
        </form>
      )}
    </div>
  );
}
