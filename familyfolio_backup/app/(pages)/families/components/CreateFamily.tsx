"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {PlusIcon} from "lucide-react";
import {usePopup} from "@/app/(pages)/dashboard/family/context/PopupContext";
import {PopupType} from "@/app/(pages)/dashboard/family/context/types";

const CreateFamily = () => {
    const {openPopup} = usePopup();
    return (
        <Card className={"w-full h-[200px]"}>
            <CardHeader>
                <CardTitle>New Family</CardTitle>
                <CardDescription>Add a new family</CardDescription>
            </CardHeader>
            <CardContent onClick={() => {
                openPopup(PopupType.CREATE_NEW_FAMILY)
            }} className={"cursor-pointer flex justify-center "}>
                <PlusIcon size={30}/>
            </CardContent>
            <CardFooter>
                <p>currently selected</p>
            </CardFooter>
        </Card>
    )
}

export default CreateFamily
