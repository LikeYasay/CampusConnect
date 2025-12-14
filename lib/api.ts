

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface FetchOptions extends RequestInit { headers?: Record<string, string>; skipAuth?: boolean; }


function debugToken(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.warn("⚠️ Token format invalid (not 3 parts)");
      return;
    }
    const payload = JSON.parse(atob(parts[1]));
    console.log("🔓 DECODED TOKEN PAYLOAD:", payload);
    
    
    if (payload.role) {
      console.log(`👤 User Role in Token: "${payload.role}"`);
    } else {
      console.warn("⚠️ No 'role' field found in token payload!");
    }
  } catch (e) {
    console.error("❌ Failed to decode token for debugging", e);
  }
}


async function apiCall(endpoint: string, options: FetchOptions = {}) {
  
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers, 
  };

  
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  if (token && !options.skipAuth) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  
  try {
    const response = await fetch(url, {
      ...options,
      headers, 
    });

    const text = await response.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text; 
    }

    if (!response.ok) {
      
      const errorMsg = typeof data === 'object' && data?.error ? data.error : (typeof data === 'string' ? data : response.statusText);
      console.error(`API Error ${response.status}:`, errorMsg);
      throw new Error(`HTTP ${response.status} - ${errorMsg}`);
    }

    return data;
  } catch (error: any) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}

export const adminAPI = {
  getStatistics: () => apiCall("/admin/statistics"),
  
  getUsers: () => apiCall("/admin/users"),
  deleteUser: (id: number | string) => apiCall(`/admin/users/${id}`, { method: "DELETE" }),
  updateUser: (id: number | string, data: any) => apiCall(`/admin/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  getForums: () => apiCall("/admin/forums"),
  deleteForum: (id: number | string) => apiCall(`/admin/forums/${id}`, { method: "DELETE" }),
  updateForum: (id: number | string, data: any) => apiCall(`/admin/forums/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  getForumReplies: (id: number | string) => apiCall(`/admin/forums/${id}/replies`),

  getDiscussions: () => apiCall("/admin/discussions"),
  deleteDiscussion: (id: number | string) => apiCall(`/admin/discussions/${id}`, { method: "DELETE" }),
  updateDiscussion: (id: number | string, data: any) => apiCall(`/admin/discussions/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  getLostFound: () => apiCall("/admin/lost-found"),
  deleteLostFound: (id: number | string) => apiCall(`/admin/lost-found/${id}`, { method: "DELETE" }),
  updateLostFound: (id: number | string, data: any) => apiCall(`/admin/lost-found/${id}`, { method: "PUT", body: JSON.stringify(data) }),
};


export const userAPI = {
  login: (email: string, password: string) =>
    apiCall("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (name: string, email: string, password: string) =>
    apiCall("/users/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),
  getProfile: (userId: number) => apiCall(`/users/${userId}`),
  getAllUsers: () => apiCall("/users"),
  getActiveUsers: () => apiCall("/users/active/list"),
  getUserByEmail: (email: string) => apiCall(`/users/email/${email}`),
  updateUser: (userId: number, data: any) => apiCall(`/users/${userId}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteUser: (userId: number) => apiCall(`/users/${userId}`, { method: "DELETE" }),
};


export const forumAPI = {
  getAll: () => apiCall("/forum"),
  getById: (id: number) => apiCall(`/forum/${id}`),
  getByCategory: (category: string) => apiCall(`/forum/category/${category}`),
  getByUserId: (userId: number) => apiCall(`/forum/user/${userId}`),
  search: (q: string) => apiCall(`/forum/search/${q}`),

  create: (data: any) => {
    const payload: any = { ...data };
    if (payload.description && !payload.content) {
      payload.content = payload.description;
      delete payload.description;
    }
    if (payload.userId && !payload.user) {
      payload.user = { userId: payload.userId };
      delete payload.userId;
    }
    return apiCall("/forum", { method: "POST", body: JSON.stringify(payload) });
  },

  update: (id: number, data: any) => apiCall(`/forum/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => apiCall(`/forum/${id}`, { method: "DELETE" }),

  like: (id: number, userId: number) => apiCall(`/forum/${id}/like?userId=${userId}`, { method: "POST", skipAuth: true }),
  getLikeStatus: (id: number, userId?: number) =>
    apiCall(`/forum/${id}/like-status${userId ? `?userId=${userId}` : ""}`, { skipAuth: true }),
};


export const discussionAPI = {
  getAll: () => apiCall("/discussion"),
  getById: (id: number) => apiCall(`/discussion/${id}`),
  getByForumId: (forumId: number) => apiCall(`/discussion/forum/${forumId}`),
  getByUserId: (userId: number) => apiCall(`/discussion/user/${userId}`),

  create: (data: any) => apiCall("/discussion", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: any) => apiCall(`/discussion/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => apiCall(`/discussion/${id}`, { method: "DELETE" }),

  like: (id: number, userId: number) =>
    apiCall(`/discussion/${id}/like?userId=${userId}`, { method: "POST", skipAuth: true }),
  getLikeStatus: (id: number, userId?: number) =>
    apiCall(`/discussion/${id}/like-status${userId ? `?userId=${userId}` : ""}`, { skipAuth: true }),
};


export const lostFoundAPI = {
  getAll: () => apiCall("/lost-found"),
  getById: (id: number) => apiCall(`/lost-found/${id}`),
  getByStatus: (status: string) => apiCall(`/lost-found/status/${status}`),
  getByCategory: (category: string) => apiCall(`/lost-found/category/${category}`),
  getByUserId: (userId: number) => apiCall(`/lost-found/user/${userId}`),

  search: (title: string) => apiCall(`/lost-found/search/${title}`),

  create: (data: any) => apiCall("/lost-found", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: any) => apiCall(`/lost-found/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => apiCall(`/lost-found/${id}`, { method: "DELETE" }),
};



export const messageAPI = {
  
  getConversations: () => apiCall("/messages/conversations"),

  
  getMessages: (userId: string | number) => apiCall(`/messages/${userId}`),

  
  send: (recipientId: string | number, content: string) => 
    apiCall("/messages/send", { 
      method: "POST", 
      body: JSON.stringify({ recipientId, content }) 
    }),

  
  delete: (id: number | string) => apiCall(`/messages/${id}`, { method: "DELETE" }),

  
  getUnreadCount: async () => {
    
    const response = await apiCall("/messages/unread-count");
    
    return response?.count || 0;
  },
};


export const notificationAPI = {
  getAll: () => apiCall("/notifications"),
  getById: (id: number) => apiCall(`/notifications/${id}`),
  getByUserId: (userId: number) => apiCall(`/notifications/user/${userId}`),
  getUnread: (userId: number) => apiCall(`/notifications/user/${userId}/unread`),

  create: (data: any) => apiCall("/notifications", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: any) => apiCall(`/notifications/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  markAsRead: (id: number) => apiCall(`/notifications/${id}/read`, { method: "PUT" }),
  delete: (id: number) => apiCall(`/notifications/${id}`, { method: "DELETE" }),
};

export const api = {
  user: userAPI,
  admin: adminAPI,
  forum: forumAPI,
  discussion: discussionAPI,
  lostFound: lostFoundAPI,
  message: messageAPI,
  notification: notificationAPI,
};

export default api;