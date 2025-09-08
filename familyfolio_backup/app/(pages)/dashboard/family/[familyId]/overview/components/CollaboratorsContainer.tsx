import CollaboratorsList from "@/app/(pages)/dashboard/family/[familyId]/overview/components/CollaboratorsList";
import AddCollaboratorButton
    from "@/app/(pages)/dashboard/family/[familyId]/overview/components/AddCollaboratorButton";
import RoleGuard from "@/components/RoleGuard";

const CollaboratorsContainer = ({role}: { role: string | null }) => {
    return (
        <div className={"h-4/5 lg:p-4 p-0 overflow-y-scroll border-black border-solid border-3"}>
            <div className={"w-full justify-start flex border-black border-solid border-3"}>
                <h1 className="text-4xl text-under">Collaborators</h1>
                <RoleGuard role={role} memberClassName={"hidden"}>
                    <AddCollaboratorButton/>
                </RoleGuard>
            </div>
            <div className={""}>
                <CollaboratorsList/>
            </div>
        </div>
    )
}

export default CollaboratorsContainer