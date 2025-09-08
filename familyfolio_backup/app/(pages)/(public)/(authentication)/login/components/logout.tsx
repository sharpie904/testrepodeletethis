"use client"

import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {useActiveFamily} from "@/app/state/useActiveFamily";

export default function Logout() {
    const router = useRouter();
    const logoutHandler = async () => {
        await authClient.signOut();
        useActiveFamily.persist.clearStorage();
        router.push("/login");
    }

    return <div onClick={async () => await logoutHandler()}
                className={"cursor-pointer w-fit border border-black border-solid"}> logout
        please</div>
}