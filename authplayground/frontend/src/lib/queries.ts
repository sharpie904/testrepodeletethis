import { useQuery, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface User {
    id: string;
    email: string;
    name?: string;
}

export interface SessionData {
    user: User;
}

// Query key factory
export const authKeys = {
    all: ['auth'] as const,
    session: () => [...authKeys.all, 'session'] as const,
};

// Fetch session from backend
async function fetchSession(): Promise<SessionData | null> {
    const response = await fetch(`${API_BASE_URL}/api/me`, {
        credentials: 'include',
    });

    // const response = await fetch('/api/me', {
    //     credentials: 'include',
    // });

    if (response.status === 401) {
        return null; // Not authenticated
    }

    if (!response.ok) {
        throw new Error('Failed to fetch session');
    }

    return response.json();
}

// Hook to get current session
export function useAuthSession() {
    return useQuery({
        queryKey: authKeys.session(),
        queryFn: fetchSession,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: (failureCount, error: any) => {
            // Don't retry on 401 errors
            if (error?.status === 401) {
                return false;
            }
            return failureCount < 2;
        },
    });
}

// Hook to invalidate session (for logout)
export function useInvalidateSession() {
    const queryClient = useQueryClient();

    return () => {
        queryClient.invalidateQueries({ queryKey: authKeys.session() });
        queryClient.removeQueries({ queryKey: authKeys.session() });
    };
}