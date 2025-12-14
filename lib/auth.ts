/**
 * Centralized auth helpers.
 * - Token stored under localStorage key "authToken"
 * - subscribeToAuth allows components to react to login/logout across tabs
 * - getAuthHeader returns { Authorization } header or null
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
const TOKEN_KEY = "authToken";

type AuthCallback = () => void;
let authSubscribers: AuthCallback[] = [];



export function subscribeToAuth(callback: AuthCallback) {
  authSubscribers.push(callback);
  
  return () => {
    authSubscribers = authSubscribers.filter((cb) => cb !== callback);
  };
}


function notifyAuthSubscribers() {
  authSubscribers.forEach((callback) => {
    try { callback(); } catch (e) { /* ignore */ }
  });
}


export function triggerAuthUpdate() {
  notifyAuthSubscribers();
}



export function saveToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
    
    
    notifyAuthSubscribers();
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    try { localStorage.setItem(`${TOKEN_KEY}:lastUpdate`, String(Date.now())); } catch {}
    notifyAuthSubscribers();
  }
}


export function getAuthHeader(): Record<string,string> | null {
  const token = getToken();
  if (!token) return null;
  return { Authorization: `Bearer ${token}` };
}



export function saveUserData(userData: { userId: number; name: string; email: string }) {
  if (typeof window !== "undefined") {
    localStorage.setItem("userData", JSON.stringify(userData));
    notifyAuthSubscribers();
  }
}

export function getUserData() {
  if (typeof window !== "undefined") {
    const d = localStorage.getItem("userData");
    return d ? JSON.parse(d) : null;
  }
  return null;
}

export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    return payload;
  } catch (e) {
    console.error("Failed to parse token payload", e);
    return null;
  }
}


export function getTokenStatus() {
  const token = getToken();
  if (!token) return { valid: false };
  const payload = getUserFromToken();
  if (!payload) return { valid: false };
  const exp = payload.exp ? Number(payload.exp) * 1000 : null;
  return { valid: true, expiresAt: exp, payload };
}


if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === `${TOKEN_KEY}:lastUpdate`) {
      notifyAuthSubscribers();
    }
  });
}



export async function fetchUserData(userId: number) {
  try {
    const token = getToken()
    if (!token) return null

    const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      console.error("Failed to fetch user data", res.status)
      return null
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error("fetchUserData error:", error)
    return null
  }
}



export function startHeartbeat(interval = 5 * 60 * 1000) {
  
  if (typeof window === "undefined") return;
  
}