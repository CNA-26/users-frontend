/**
 * Store frontend base URL
 */
export const STORE_FRONTEND_URL = "https://store-frontend-git-store-frontend.2.rahtiapp.fi";

/**
 * Builds a URL to the store frontend with authentication tokens
 * @param path - The path in the store frontend (e.g., "/", "/profile")
 * @param returnTo - Optional return URL for the store frontend to redirect back
 * @returns Full URL with tokens as query parameters
 */
export function buildAuthenticatedStoreUrl(path: string = "/", returnTo?: string): string {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const url = new URL(path, STORE_FRONTEND_URL);

    if (accessToken) {
        url.searchParams.set("accessToken", accessToken);
    }
    if (refreshToken) {
        url.searchParams.set("refreshToken", refreshToken);
    }
    if (returnTo) {
        url.searchParams.set("returnTo", returnTo);
    }

    return url.toString();
}
