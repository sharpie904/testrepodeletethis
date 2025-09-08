"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {PlusIcon} from "lucide-react";
import {usePopup} from "@/app/(pages)/dashboard/family/context/PopupContext";
import {PopupType} from "@/app/(pages)/dashboard/family/context/types";

const CreateFamilyProfile = () => {
    const {openPopup} = usePopup();
    return (
        <Card className={"w-full h-[200px]"}>
            <CardHeader>
                <CardTitle>New Member Profile</CardTitle>
                <CardDescription>Add a new member to your family</CardDescription>
            </CardHeader>
            <CardContent onClick={() => {
                openPopup(PopupType.CREATE_NEW_FAMILY_MEMBER)
            }} className={"cursor-pointer flex justify-center "}>
                <PlusIcon size={30}/>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}

export default CreateFamilyProfile
