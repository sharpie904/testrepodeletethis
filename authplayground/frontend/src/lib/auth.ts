import { createAuthClient } from 'better-auth/react';

//TODO: put this backend URL in the env file
export const authClient = createAuthClient({
    baseURL: 'http://localhost:3000',
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
    getSession,
} = authClient;