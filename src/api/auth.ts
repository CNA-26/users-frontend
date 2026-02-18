import { USERS_API_URL } from "../config/api";



export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
};

export type CreateUserResponse = {
    id: string;
    email: string;
    createdAt: string;
};


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



/**
 * LOGIN
 * POST /api/auth/login
 */
export async function login(email: string, password: string): Promise<string> {
    const response = await fetch(`${USERS_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
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
 * (Create user → login)
 */
export async function register(email: string, password: string): Promise<string> {
    const response = await fetch(`${USERS_API_URL}/auth/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
    }

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
                accept: "application/json",
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
        throw new Error("No refresh token available");
    }

    const response = await fetch(`${USERS_API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
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

/**
 * REQUEST PASSWORD RESET
 * POST /api/auth/users/resetPassword
 */

/*export async function requestPasswordReset(email: string): Promise<void> {
    const response = await fetch(
        `${USERS_API_URL}/auth/users/resetPassword`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify({ email }),
        }
    );

    if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
    }
}

/**
 * UPDATE PASSWORD
 * PATCH /api/auth/users/updatePassword
 * (Invalidates refresh token)
 */
export async function updatePassword(
    userId: string,
    password: string,
    newPassword: string
): Promise<void> {
    const response = await fetch(
        `${USERS_API_URL}/auth/users/updatePassword`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({
                userId,
                password,
                newPassword,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
    }

    // Refresh token is invalidated → force re-login
    localStorage.clear();
}
