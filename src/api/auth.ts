import { USERS_API_URL, USE_MOCK } from "../config/api";

export type AuthResponse = {
    token: string;
};

// Mock Helper
const mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function parseErrorMessage(response: Response): Promise<string> {
    try {
        const data = (await response.json()) as { message?: string };
        if (data?.message) return data.message;
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

/**
 * Expected backend:
 * POST {USERS_API_URL}/login
 * body: { email, password }
 * response: { token }
 */
export async function login(email: string, password: string): Promise<string> {
    if (USE_MOCK) {
        await mockDelay(500);
        // Simple mock logic: accept any login
        const token = "mock-jwt-token-" + Date.now();
        localStorage.setItem("jwt", token); // Keep this for now, but context will handle it primarily
        return token;
    }

    const response = await fetch(`${USERS_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
    }

    const data = (await response.json()) as AuthResponse;

    if (!data?.token) {
        throw new Error("Login response missing token");
    }

    localStorage.setItem("jwt", data.token); // Legacy support until full switch
    return data.token;
}

/**
 * Expected backend:
 * POST {USERS_API_URL}/register
 * body: { email, password }
 * response: { token }
 */
export async function register(email: string, password: string): Promise<string> {
    if (USE_MOCK) {
        await mockDelay(500);
        const token = "mock-jwt-token-register-" + Date.now();
        localStorage.setItem("jwt", token);
        return token;
    }

    const response = await fetch(`${USERS_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
    }

    const data = (await response.json()) as AuthResponse;

    if (!data?.token) {
        throw new Error("Register response missing token");
    }

    localStorage.setItem("jwt", data.token);
    return data.token;
}

/**
 * Password reset step 1: request reset email
 */
export async function requestPasswordReset(email: string): Promise<void> {
    if (USE_MOCK) {
        await mockDelay(500);
        return;
    }

    const response = await fetch(`${USERS_API_URL}/password-reset/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
    }
}

/**
 * Password reset step 2: confirm reset using token + new password
 */
export async function resetPassword(
    token: string,
    newPassword: string
): Promise<void> {
    if (USE_MOCK) {
        await mockDelay(500);
        return;
    }

    const response = await fetch(`${USERS_API_URL}/password-reset/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
    }
}

export function logout() {
    localStorage.removeItem("jwt");
}
