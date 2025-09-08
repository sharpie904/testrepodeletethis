"use client"

import {ContainerLayout} from "@/app/shared/components/ContainerLayout";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {useRefreshTrigger} from "@/app/state/useRefreshTrigger";
import CollaboratorsContainer
    from "@/app/(pages)/dashboard/family/[familyId]/overview/components/CollaboratorsContainer";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import RoleGuard from "@/components/RoleGuard";
import {useActiveFamily} from "@/app/state/useActiveFamily";
import Settings from "@/app/(pages)/dashboard/family/[familyId]/overview/components/Settings";
import DangerZone from "@/app/(pages)/dashboard/family/[familyId]/overview/components/DangerZone";

const CollaboratorsContainerPage = ({params}: { params: { familyId: string } }) => {
    const router = useRouter();
    const {family} = useActiveFamily();
    const {refreshTrigger} = useRefreshTrigger();

    return (
        <ContainerLayout title={"Collaborators"}>
            <div className={"flex mb-4 mt-0 border-red-300 border-solid border-3 w-full"}>
                <Button className={"w-[10%]"} size={"icon"} onClick={() => {
                    refreshTrigger(true); // this should trigger a refresh of "that" page
                    router.push(`/dashboard/family/${params.familyId}`)
                }}>
                    <div><ArrowLeft/></div>
                </Button>
                <div
                    className={"text-4xl font-extrabold w-[90%] flex justify-start pl-12 md:justify-center"}>
                    {family.name}
                </div>
            </div>
            <Tabs className={"w-full h-full border-red-300 border-solid border-3"} defaultValue={"collaborators"}>
                <RoleGuard memberClassName={"hidden"} role={family?.role}>
                    <div className={"flex justify-center md:justify-start"}>
                        <TabsList className={"w-fit mx-auto md:mx-0"}>
                            <TabsTrigger value={"collaborators"}>Collaborators</TabsTrigger>
                            <TabsTrigger value={"settings"}>Settings</TabsTrigger>
                            <RoleGuard adminClassName={"hidden"} memberClassName={"hidden"} role={family?.role}>
                                <TabsTrigger value={"dangerzone"}>Danger zone</TabsTrigger>
                            </RoleGuard>
                        </TabsList>
                    </div>
                </RoleGuard>
                <TabsContent value={"collaborators"}>
                    <CollaboratorsContainer role={family?.role}/>
                </TabsContent>
                <TabsContent value={"settings"}>
                    <Settings familyId={family?.id} familyName={family?.name}/>
                </TabsContent>
                <TabsContent value={"dangerzone"}>
                    <DangerZone familyId={family?.id}/>
                </TabsContent>
            </Tabs>
        </ContainerLayout>
    )
}

export default CollaboratorsContainerPage