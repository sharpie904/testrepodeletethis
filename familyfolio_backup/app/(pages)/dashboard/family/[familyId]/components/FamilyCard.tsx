"use client"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import AddFamilyProfile from "./AddFamilyProfile";
import {useState} from "react";

const FamilyCard = ({email, organizationId}: { email: string, organizationId: string }) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{email}</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input onChange={e => setName(e.target.value)} id="name" placeholder="enter name"/>
                            <Label htmlFor="lastName">LastName</Label>
                            <Input onChange={e => setLastName(e.target.value)} id="lastName"
                                   placeholder="enter last name"/>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <AddFamilyProfile firstName={name} lastName={lastName} organizationId={organizationId}/>
            </CardFooter>
        </Card>
    )
}

export default FamilyCard;
