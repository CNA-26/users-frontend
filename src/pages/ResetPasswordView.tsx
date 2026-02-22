import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { resetPassword } from "../api/auth";

export default function ResetPasswordView() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => { document.title = "Monstera - Password reset"; }, []);

    if (!token) {
        return (
            <div className="max-w-md mx-auto mt-10 bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/40 text-center">
                <h2 className="text-2xl font-branding text-red-600 mb-4">Ogiltig länk</h2>
                <p className="text-monstera-dark/70 mb-6">
                    Återställningslänken saknar en giltig token. Begär en ny länk.
                </p>
                <Link
                    to="/forgot-password"
                    className="inline-block px-6 py-2 bg-monstera-green text-white rounded-xl hover:bg-monstera-dark transition-colors"
                >
                    Begär ny länk
                </Link>
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
            await resetPassword(token, newPassword);
            setStatus("done");
        } catch (err: any) {
            setError(err?.message || "Något gick fel. Försök igen.");
            setStatus("idle");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/40">
            <h2 className="text-3xl font-branding text-monstera-dark mb-6 text-center">
                Nytt lösenord
            </h2>

            {status === "done" ? (
                <div className="text-center space-y-4">
                    <div className="bg-monstera-pale/50 p-4 rounded-xl text-monstera-dark">
                        <p className="font-bold text-lg">Lösenordet är uppdaterat! 🎉</p>
                        <p className="text-sm mt-2">Du kan nu logga in med ditt nya lösenord.</p>
                    </div>
                    <Link
                        to="/login"
                        className="inline-block px-6 py-2 bg-monstera-green text-white rounded-xl hover:bg-monstera-dark transition-colors"
                    >
                        Gå till login
                    </Link>
                </div>
            ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-bold text-monstera-green mb-1">
                            Nytt lösenord
                        </label>
                        <input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={8}
                            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-monstera-green/20 focus:outline-none focus:ring-2 focus:ring-monstera-medium transition-all"
                            placeholder="Minst 8 tecken"
                        />
                    </div>

                    <div>
                        <label htmlFor="repeatPassword" className="block text-sm font-bold text-monstera-green mb-1">
                            Upprepa nytt lösenord
                        </label>
                        <input
                            id="repeatPassword"
                            type="password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            required
                            minLength={8}
                            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-monstera-green/20 focus:outline-none focus:ring-2 focus:ring-monstera-medium transition-all"
                            placeholder="Upprepa lösenordet"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full py-3.5 bg-monstera-green text-white font-bold rounded-xl hover:bg-monstera-dark hover:scale-[1.02] shadow-lg shadow-monstera-green/20 transition-all duration-200 disabled:opacity-70 disabled:hover:scale-100 mt-2"
                    >
                        {status === "loading" ? "Sparar..." : "Spara nytt lösenord"}
                    </button>

                    {error && (
                        <p className="p-3 bg-red-100/80 text-red-700 rounded-lg text-sm text-center border border-red-200">{error}</p>
                    )}

                    <p className="text-center text-sm pt-2">
                        <Link
                            to="/login"
                            className="text-monstera-medium hover:text-monstera-dark font-semibold underline decoration-2 underline-offset-2"
                        >
                            Tillbaka till login
                        </Link>
                    </p>
                </form>
            )}
        </div>
    );
}
