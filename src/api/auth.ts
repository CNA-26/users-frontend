import { USERS_API_URL } from "../config/api";

/* =========================
   Types
========================= */

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
};

/* =========================
   Helpers
========================= */

async function parseErrorMessage(response: Response): Promise<string> {
    try {
        const data = (await response.json()) as { message?: string; error?: string };
        if (data?.message) return data.message;
        if (data?.error) return data.error;
    } catch {
        // ignore
    }

    try {
        const text = await response.text();
        if (text) return text;
    } catch {
        // ignore
    }

    return `${response.status} ${response.statusText}`;
}

/* =========================
   Auth API
========================= */

/**
 * LOGIN
 * POST /api/auth/login
 */
export async function login(email: string, password: string): Promise<string> {
    const response = await fetch(`${USERS_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
    }

    const data = (await response.json()) as LoginResponse;

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return data.accessToken;
}

/**
 * REGISTER
 * POST /api/auth/users
 */
export async function register(email: string, password: string): Promise<string> {
    const response = await fetch(`${USERS_API_URL}/auth/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
    }

    // Login immediately after successful user creation
    return await login(email, password);
}

/**
 * LOGOUT
 * POST /api/auth/logout
 */
export async function logout(): Promise<void> {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
        await fetch(`${USERS_API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
        });
    }

    localStorage.clear();
}

/**
 * REFRESH ACCESS TOKEN
 * POST /api/auth/refresh
 */
export async function refreshAccessToken(): Promise<string> {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        throw new Error("No refresh token");
    }

    const response = await fetch(`${USERS_API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        localStorage.clear();
        throw new Error(await parseErrorMessage(response));
    }

    const data = (await response.json()) as LoginResponse;

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return data.accessToken;
}
