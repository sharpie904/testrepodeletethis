"use client"

import {authClient} from "@/lib/auth-client";
import {ThemeSwitcher} from "@/app/shared/components/ThemeSwitcher";
import UserNavbar from "@/app/shared/components/navbar/UserNavbar";
import {SidebarTrigger} from "@/components/ui/sidebar";

export function Navbar() {
    const {data} = authClient.useSession();
    const welcomeString = `Welcome, ${data?.user?.name ? data?.user?.name : data?.user?.email}`;

    return (
        <header
            className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 sm:mx-8 flex h-14 items-center">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <SidebarTrigger/>
                    <h1 className="font-bold">{welcomeString}</h1>
                </div>
                <div className="flex flex-1 items-center justify-end">
                    <ThemeSwitcher/>
                    <UserNavbar/>
                </div>
            </div>
        </header>
    );
}