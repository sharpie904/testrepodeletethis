import {getFullOrganization} from "@/app/actions/organizations";
import {checkFamilyMemberAlsoUser} from "@/app/actions/family-member";
import FamilySettingsButton from "@/app/(pages)/dashboard/family/[familyId]/overview/components/FamilySettingsButton";
import {Separator} from "@/components/ui/separator";
import FamilyProfilesContainer from "@/app/(pages)/dashboard/family/[familyId]/components/FamilyProfilesContainer";

const Family = async ({familyId}: { familyId: string }) => {
    const organization = await getFullOrganization(familyId);
    await checkFamilyMemberAlsoUser({organizationId: familyId});

    return (
        <div className={"h-screen flex flex-col"}>
            <div className="h-1/5 flex flex-col md:flex-row justify-start gap-2 p-4">
                <div className="w-full flex justify-center">
                    <h1 className="text-5xl text-under">{organization?.name}</h1>
                    <FamilySettingsButton/>
                </div>
            </div>
            <Separator/>
            <FamilyProfilesContainer familyId={familyId}/>
        </div>
    )
};

export default Family;
