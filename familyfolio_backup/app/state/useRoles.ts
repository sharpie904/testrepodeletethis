import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type UserRole = 'admin' | 'owner' | 'member' | null;

interface RolesState {
    userRole: UserRole;
    setUserRole: (role: UserRole) => void;
    isAuthorized: boolean;
}

export const useRoles = create<RolesState>()(
    persist(
        (set) => ({
            userRole: null,
            isAuthorized: false,
            setUserRole: (role) =>
                set(() => ({
                    userRole: role,
                    isAuthorized: role !== null
                })),
        }),
        {
            name: 'auth-storage',
        }
    )
);