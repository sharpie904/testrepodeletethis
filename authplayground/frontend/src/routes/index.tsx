import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthSession, useInvalidateSession } from '../lib/queries';
import { authClient, signOut } from '../lib/auth';

// Protected route loader - checks auth and redirects if needed
async function protectedLoader() {
    const response = await authClient.getSession();

    if (!response?.data) {
        throw redirect({
            to: '/login',
            search: {
                redirect: '/',
            },
        });
    }

    if (response.error) {
        throw new Error('Failed to fetch session');
    }
}

export const Route = createFileRoute('/')({
    loader: protectedLoader,
    component: Dashboard,
});

function Dashboard() {
    const { data: session, isLoading } = useAuthSession();
    const invalidateSession = useInvalidateSession();

    const handleLogout = async () => {
        try {
            await signOut();
            invalidateSession();
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Protected Dashboard</h1>
            <p>Welcome, {session?.user?.email}!</p>
            <p>This is a protected route that requires authentication.</p>

            <div style={{ marginTop: '2rem' }}>
                <button onClick={handleLogout} className="btn">
                    Sign Out
                </button>
            </div>
        </div>
    );
}