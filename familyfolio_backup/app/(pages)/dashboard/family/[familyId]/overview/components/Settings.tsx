import SettingsForm from "@/app/(pages)/dashboard/family/[familyId]/overview/components/SettingsForm";

const Settings = ({familyId, familyName}: { familyId: string | null, familyName: string | null }) => {
    if (familyName !== null && familyId !== null) {
        return <SettingsForm name={familyName} id={familyId}/>;
    }
    return <></>
}

export default Settings;