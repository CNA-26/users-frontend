import React, { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../services/authService";

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
    <div style={{ maxWidth: 420 }}>
      <h2>Glömt lösenord</h2>

      {status === "done" ? (
        <>
          <p>
            Om adressen finns hos oss har vi skickat en återställningslänk.
            Kolla din inkorg (och spam).
          </p>
          <Link to="/login">Tillbaka till login</Link>
        </>
      ) : (
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Skickar..." : "Skicka återställningslänk"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <p style={{ marginTop: 12 }}>
            <Link to="/login">Tillbaka till login</Link>
          </p>
        </form>
      )}
    </div>
  );
}
