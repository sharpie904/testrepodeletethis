import { 
  type ApiResponse, 
  type ApiErrorResponse, 
  ErrorCodes,
} from 'shared';
import type {
  Organization,
  OrganizationWithMembers,
  FamilyMember,
  CreateOrganizationInput,
  UpdateOrganizationInput,
  CreateFamilyMemberInput,
  UpdateFamilyMemberInput,
  MemberRole
} from 'shared';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromResponse(response: ApiErrorResponse, statusCode: number): ApiError {
    return new ApiError(
      response.error.code,
      response.error.message,
      statusCode,
      response.error.details
    );
  }

  get isAuthError(): boolean {
    return [ErrorCodes.UNAUTHORIZED, ErrorCodes.FORBIDDEN, ErrorCodes.TOKEN_EXPIRED].includes(this.code as any);
  }

  get isValidationError(): boolean {
    return this.code === ErrorCodes.VALIDATION_ERROR;
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

  const data: ApiResponse<T> = await response.json();

  if (!data.success) {
    throw ApiError.fromResponse(data, response.status);
  }

  return data.data;
}

// Organizations API
export const organizationsApi = {
  list: (): Promise<Organization[]> => 
    apiRequest('/organizations'),

  get: (id: string): Promise<OrganizationWithMembers> => 
    apiRequest(`/organizations/${id}`),

  create: (data: CreateOrganizationInput): Promise<OrganizationWithMembers> => 
    apiRequest('/organizations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateOrganizationInput): Promise<OrganizationWithMembers> => 
    apiRequest(`/organizations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> => 
    apiRequest(`/organizations/${id}`, {
      method: 'DELETE',
    }),
};

// Family Members API
export const familyMembersApi = {
  list: (organizationId: string): Promise<FamilyMember[]> => 
    apiRequest(`/family-members/${organizationId}`),

  get: (organizationId: string, memberId: string): Promise<FamilyMember> => 
    apiRequest(`/family-members/${organizationId}/${memberId}`),

  create: (organizationId: string, data: CreateFamilyMemberInput): Promise<FamilyMember> => 
    apiRequest(`/family-members/${organizationId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (organizationId: string, memberId: string, data: UpdateFamilyMemberInput): Promise<FamilyMember> => 
    apiRequest(`/family-members/${organizationId}/${memberId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (organizationId: string, memberId: string): Promise<void> => 
    apiRequest(`/family-members/${organizationId}/${memberId}`, {
      method: 'DELETE',
    }),

  getRole: (organizationId: string): Promise<{ role: MemberRole | null }> => 
    apiRequest(`/family-members/${organizationId}/role`),
};

// Auth API
export const authApi = {
  getSession: (): Promise<{ user: any; session: any }> => 
    apiRequest('/me'),
};

// Combined API object
export const api = {
  organizations: organizationsApi,
  familyMembers: familyMembersApi,
  auth: authApi,
};

export { ApiError };