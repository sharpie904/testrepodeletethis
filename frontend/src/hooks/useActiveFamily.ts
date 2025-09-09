import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type MemberRole } from "shared";

interface ActiveFamily {
  name: string | null;
  id: string | null;
  slug: string | null;
  role: MemberRole | null;
}

interface ActiveFamilyStore {
  family: ActiveFamily;
  setActiveFamily: (orgId: string | null, orgName: string | null, slug: string | null, role: MemberRole | null) => void;
  clearActiveFamily: () => void;
}

export const useActiveFamily = create<ActiveFamilyStore>()(
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
      },
      clearActiveFamily() {
        set({
          family: {
            name: null,
            id: null,
            slug: null,
            role: null
          }
        });
      }
    }),
    {
      name: 'active-family',
    }
  )
);