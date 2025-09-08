import { createAuthClient } from 'better-auth/react';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const authClient = createAuthClient({
  baseURL: backendUrl,
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;