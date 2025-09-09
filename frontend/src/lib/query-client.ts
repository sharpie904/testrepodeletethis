import { QueryClient, type QueryClientConfig } from '@tanstack/react-query';
import { ApiError } from './api';
import { toast } from 'sonner';

// Global error handler for TanStack Query
const handleQueryError = (error: unknown) => {
  console.error('Query Error:', error);

  if (error instanceof ApiError) {
    // Handle auth errors
    if (error.isAuthError) {
      // Clear any cached data
      queryClient.clear();
      
      // Redirect to login if not already there
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
      return;
    }

    // Handle validation errors
    if (error.isValidationError && error.details) {
      const fieldErrors = Object.entries(error.details)
        .map(([field, message]) => `${field}: ${message}`)
        .join(', ');
      toast.error(`Validation Error: ${fieldErrors}`);
      return;
    }

    // Show user-friendly error message
    toast.error(error.message);
  } else {
    // Generic error
    toast.error('An unexpected error occurred');
  }
};

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on auth errors
        if (error instanceof ApiError && error.isAuthError) {
          return false;
        }
        // Don't retry on validation errors
        if (error instanceof ApiError && error.isValidationError) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: handleQueryError,
    },
  },
};

export const queryClient = new QueryClient(queryClientConfig);

// Query key factories for consistent cache management
export const queryKeys = {
  // Auth
  auth: {
    all: ['auth'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },
  
  // Organizations
  organizations: {
    all: ['organizations'] as const,
    lists: () => [...queryKeys.organizations.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.organizations.lists(), filters] as const,
    details: () => [...queryKeys.organizations.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.organizations.details(), id] as const,
  },
  
  // Family Members
  familyMembers: {
    all: ['familyMembers'] as const,
    lists: () => [...queryKeys.familyMembers.all, 'list'] as const,
    list: (organizationId: string) => [...queryKeys.familyMembers.lists(), organizationId] as const,
    details: () => [...queryKeys.familyMembers.all, 'detail'] as const,
    detail: (organizationId: string, memberId: string) => [...queryKeys.familyMembers.details(), organizationId, memberId] as const,
    role: (organizationId: string) => [...queryKeys.familyMembers.all, 'role', organizationId] as const,
  },
} as const;