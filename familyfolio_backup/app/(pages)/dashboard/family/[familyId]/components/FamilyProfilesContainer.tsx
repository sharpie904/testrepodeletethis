"use client"

import AddFamilyProfileButton from "@/app/(pages)/dashboard/family/[familyId]/components/AddFamilyProfileButton";
import FamilyProfilesList from "@/app/(pages)/dashboard/family/[familyId]/components/FamilyProfilesList";
import CreateFamilyProfile from "@/app/(pages)/dashboard/family/[familyId]/components/CreateFamilyProfile";

const FamilyProfilesContainer = ({familyId}: { familyId: string }) => {
    // const [refreshState, setRefreshState] = useState<boolean>(true);

    return (
        <div className="h-4/5 md:p-4 p-0 overflow-y-scroll">
            <div className="w-full flex justify-center">
                <h1 className="text-4xl text-under">Family Profiles</h1>
                <AddFamilyProfileButton/>
            </div>
            <FamilyProfilesList organizationId={familyId}/>
        </div>
    )
}

export default FamilyProfilesContainer;