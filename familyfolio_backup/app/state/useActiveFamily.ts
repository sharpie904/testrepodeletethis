"use client"

import {create} from "zustand";
import {persist} from "zustand/middleware";

interface Family {
    name: string | null,
    id: string | null,
    slug: string | null,
    role: string | null,
}

interface ActiveFamily {
    family: Family,
    setActiveFamily: (orgId: string | null, orgName: string | null, slug: string | null, role: string | null) => void,
}


export const useActiveFamily = create<ActiveFamily>()(
    persist(
        (set) => ({
            family: {
                name: null,
                id: null,
                slug: null,
                role: null
            },
            setActiveFamily(orgId, orgName, slug, role) {
                set({
                    family: {
                        name: orgName,
                        id: orgId,
                        slug: slug,
                        role: role
                    }
                });
            }
        }),
        {
            name: 'active-family',
        }
    )
);

