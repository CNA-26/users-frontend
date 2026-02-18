/* import React, { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../api/auth";

export default function ForgotPasswordView() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("loading");

    try {
      await requestPasswordReset(email);
      // Visa alltid samma “kolla din mail” för att undvika account enumeration
      setStatus("done");
    } catch {
      setError("Något gick fel. Försök igen.");
      setStatus("idle");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/40">
      <h2 className="text-3xl font-branding text-monstera-dark mb-6 text-center">Glömt lösenord</h2>

      {status === "done" ? (
        <div className="text-center space-y-4">
          <div className="bg-monstera-pale/50 p-4 rounded-xl text-monstera-dark">
            <p className="font-medium">
              Om adressen finns hos oss har vi skickat en återställningslänk.
            </p>
            <p className="text-sm mt-2">Kolla din inkorg (och spam).</p>
          </div>
          <Link to="/login" className="inline-block px-6 py-2 bg-monstera-green text-white rounded-xl hover:bg-monstera-dark transition-colors">Tillbaka till login</Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-monstera-green mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-monstera-green/20 focus:outline-none focus:ring-2 focus:ring-monstera-medium transition-all"
              placeholder="Fyll i din email"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3.5 bg-monstera-green text-white font-bold rounded-xl hover:bg-monstera-dark hover:scale-[1.02] shadow-lg shadow-monstera-green/20 transition-all duration-200 disabled:opacity-70 disabled:hover:scale-100"
          >
            {status === "loading" ? "Skickar..." : "Skicka återställningslänk"}
          </button>

          {error && <p className="p-3 bg-red-100/80 text-red-700 rounded-lg text-sm text-center border border-red-200">{error}</p>}

          <p className="text-center text-sm pt-2">
            <Link to="/login" className="text-monstera-medium hover:text-monstera-dark font-semibold underline decoration-2 underline-offset-2">Tillbaka till login</Link>
          </p>
        </form>
      )}
    </div>
  );
} */
