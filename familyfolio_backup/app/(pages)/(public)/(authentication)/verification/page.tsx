"use client"

import Link from 'next/link'
import {CheckCircle} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {useSearchParams} from "next/navigation";

const VerificationSuccess = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Verification Successful</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500"/>
                    <p className="text-gray-600">
                        Your account has been successfully verified. You can now access all features of our
                        platform.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

const VerificationFailure = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Verification Failed</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-gray-600">
                        We could not verify your account. The verification link may have expired or is invalid.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

const Verification = () => {
    const searchParams = useSearchParams();
    const invalidToken = searchParams.get("error");
    console.log(searchParams, invalidToken)

    if (invalidToken === "invalid_token") {
        console.log("verify fail")
        return <VerificationFailure/>
    }

    console.log("verify success")
    return <VerificationSuccess/>
}

export default Verification