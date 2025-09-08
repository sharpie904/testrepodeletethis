"use client"

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {authClient} from "@/lib/auth-client";
import {BetterFetchResponse} from "@better-fetch/fetch";
import {User} from "better-auth";
import {toast} from "sonner";

interface VerificationResponse {
    status: boolean,
    user: User,
}

const VerifyEmail = () => {
    const searchParams = useSearchParams();
    const verificationToken = searchParams.get("token");
    const [verified, setVerified] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async () => {
            if (verificationToken !== null) {
                const response: BetterFetchResponse<VerificationResponse | null> = await authClient.verifyEmail({
                    query: {
                        token: verificationToken,
                    }
                })

                if (response?.error) {
                    toast(response.error.message);
                    setVerified(false);
                    return;
                }

                if (response?.data?.status === true) {
                    toast("Verified successfully!")
                    setVerified(true);
                    return;
                } else {
                    toast("Unable to verify!")
                    setVerified(false);
                    return;
                }
            } else {
                toast("Token null");
                setVerified(false);
                return;
            }
        }

        verifyToken();
    }, [verificationToken]);

    useEffect(() => {
        if (verified) {
            router.push("/login")
        }
    }, [verified]);

    return (
        <div>loading...</div>
    )
}

export default VerifyEmail