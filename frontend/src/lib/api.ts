const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new ApiError(response.status, errorData.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Auth
  me: () => apiRequest<{ user: any; session: any }>('/me'),

  // Organizations
  organizations: {
    list: () => apiRequest<any[]>('/organizations'),
    get: (id: string) => apiRequest<any>(`/organizations/${id}`),
    update: (id: string, data: { name: string; slug: string }) =>
      apiRequest<any>(`/organizations/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  // Family Members
  familyMembers: {
    list: (organizationId: string) =>
      apiRequest<any[]>(`/family-members/${organizationId}`),
    create: (organizationId: string, data: { firstName: string; lastName: string; email?: string }) =>
      apiRequest<any>(`/family-members/${organizationId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getRole: (organizationId: string) =>
      apiRequest<{ role: string | null }>(`/family-members/${organizationId}/role`),
  },
};

export { ApiError };