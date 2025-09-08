"use client"

import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import generateUserFallback from "@/lib/generate-user-fallback";

const FamilyProfileCard = ({name, lastName}: { name: string, lastName: string, isUser: boolean }) => {
    const formatName = (name: string) => {
        return name[0].toUpperCase() + name.slice(1).toLowerCase()
    }
    const avatarFallback = generateUserFallback(`${name} ${lastName}`).toUpperCase();

    return (
        <Card className="w-full h-[200px]">
            <CardHeader className={"flex justify-around border-black border-solid flex-row"}>
                <CardTitle className={"my-auto text-xl"}>{formatName(name)} {formatName(lastName)}</CardTitle>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={""} alt="Avatar"/>
                    <AvatarFallback className="bg-transparent">{avatarFallback}</AvatarFallback>
                </Avatar>
            </CardHeader>
        </Card>
    )
}

export default FamilyProfileCard