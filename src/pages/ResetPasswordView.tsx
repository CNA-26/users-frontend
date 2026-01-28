import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";

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
    <div style={{ maxWidth: 420 }}>
      <h2>Välj nytt lösenord</h2>

      {status === "done" ? (
        <>
          <p>Lösenordet är uppdaterat. Du kan nu logga in.</p>
          <Link to="/login">Gå till login</Link>
        </>
      ) : (
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="newPassword">Nytt lösenord</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label htmlFor="repeatPassword">Upprepa lösenord</label>
            <input
              id="repeatPassword"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sparar..." : "Spara nytt lösenord"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <p style={{ marginTop: 12 }}>
            <Link to="/forgot-password">Begär ny återställningslänk</Link>
          </p>
        </form>
      )}
    </div>
  );
}
