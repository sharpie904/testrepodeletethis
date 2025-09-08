"use client"

import {useActiveFamily} from "@/app/state/useActiveFamily";
import {useEffect, useState} from "react";
import {getFullOrganization} from "@/app/actions/organizations";
import {Member} from "@prisma/client";
import CollaboratorCard from "@/app/(pages)/dashboard/family/[familyId]/overview/components/CollaboratorCard";
import {toast} from "sonner";

const CollaboratorsList = () => {
    const {family} = useActiveFamily();
    const [collaborators, setCollaborators] = useState<Member[] | undefined>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getActiveFamilyCollaborators() {
            setIsLoading(true);
            if (family?.id) {
                try {
                    const response = await getFullOrganization(family.id);
                    setCollaborators(response?.Member);
                    setIsLoading(true);
                } catch (error) {
                    toast("error")
                    setIsLoading(true);
                } finally {
                    setIsLoading(false);
                }
            }
        }

        getActiveFamilyCollaborators();
    }, [family]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 lg:p-0 md:gap-0 lg:gap-4">
            {isLoading && <div>Loading..</div>}
            {collaborators?.map((collaborator, index) => (
                <div key={index} className={"w-full my-4"}>
                    <CollaboratorCard email={collaborator.email} role={collaborator.role} id={collaborator.id}/>
                </div>
            ))}
        </div>
    )
}

export default CollaboratorsList;