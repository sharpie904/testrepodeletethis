"use client"

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useActiveFamily} from "@/app/state/useActiveFamily";
import {Users, Settings} from "lucide-react";

const FamilySettingsButton = () => {
    const router = useRouter();
    const {family} = useActiveFamily();

    return (
        <div className={"h-fit justify-center flex-col items-center "}>
            <Button
                onClick={() => {
                    router.push(`/dashboard/family/${family?.id}/overview`)
                }}
                variant="ghost"
                size="icon"
                className={"my-auto"}
                title="Settings"
            >
                <Settings className="h-5 w-5"/>
            </Button>
        </div>
    )
}

export default FamilySettingsButton