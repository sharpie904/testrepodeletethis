"use client";

import Link from "next/link";
import {LogOut, User} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import generateUserFallback from "@/lib/generate-user-fallback";
import {useMemo} from "react";
import {useActiveFamily} from "@/app/state/useActiveFamily";

const UserNavbar = () => {
    const router = useRouter();
    const handleSignOut = async () => {
        await authClient.signOut();
        toast("You have been logged out successfully!");
        useActiveFamily.persist.clearStorage();

        router.push("/login");
    }

    const {data} = authClient.useSession();

    const userAvatarFallback = useMemo(() => {
        if (!data?.user?.name) return data?.user?.email.charAt(0).toUpperCase();
        return generateUserFallback(data.user.name).toUpperCase();
    }, [data?.user?.name, data?.user?.email])

    return (
        <DropdownMenu>
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={data?.user?.image} alt="Avatar"/>
                                    <AvatarFallback className="bg-transparent">{userAvatarFallback}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Profile</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{data?.user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {data?.user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <Link href="/account" className="flex items-center">
                            <User className="w-4 h-4 mr-3 text-muted-foreground"/>
                            Account
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="hover:cursor-pointer" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-3 text-muted-foreground"/>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserNavbar