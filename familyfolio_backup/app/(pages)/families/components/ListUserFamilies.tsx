import {authClient} from "@/lib/auth-client";
import UserFamily from "@/app/(pages)/families/components/UserFamily";
import CreateFamily from "@/app/(pages)/families/components/CreateFamily";
import {useActiveFamily} from "@/app/state/useActiveFamily";
import {useEffect, useState} from "react";
import {getUserRole} from "@/app/actions/members";

const ListUserFamilies = () => {
    const {data: organizations} = authClient.useListOrganizations();
    const {data: userSession} = authClient.useSession()

    const currentActiveFamilyId = useActiveFamily((state) => state.family.id);
    const setActiveFamily = useActiveFamily((state) => state.setActiveFamily);
    const {family} = useActiveFamily();

    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        async function getRole(familyId: string, email: string) {
            const response = await getUserRole(familyId, email);
            setUserRole(response);
        }

        if (family && family?.id) {
            getRole(family?.id, userSession?.user.email)
        }
    }, [family]);

    useEffect(() => {
        if (organizations && organizations.length === 1 && userRole !== null) {
            setActiveFamily(organizations[0]?.id, organizations[0]?.name, organizations[0]?.slug, userRole);
        }
    }, [organizations, userRole]);

    return (
        <div className={"grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 md:gap-4"}>
            {organizations && organizations.map((organization) => (
                <div key={organization.id} className={"w-full h-fit"}>
                    <UserFamily isCurrentSelected={currentActiveFamilyId === organization.id} key={organization.id}
                                organization={organization}/>
                </div>
            ))}
            <CreateFamily/>
        </div>
    )
}

export default ListUserFamilies;