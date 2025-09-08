"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AcceptInvite = ({ params }: { params: { inviteId: string } }) => {
  const router = useRouter();
  const acceptInvite = async () => {
    const response  = await authClient.organization.acceptInvitation({
      invitationId: params.inviteId,
    });

    if (response.error){
      toast(response.error.message)
    }else{
      toast("Accepted invitation")
      router.push("/home");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Invite Accepted
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <p className="text-gray-600 mb-4">
            You have successfully accepted the invitation.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => acceptInvite()}>Accept it!</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const Page = ({ params }: { params: { inviteId: string } }) => {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    // TODO: check issue - https://github.com/better-auth/better-auth/issues/308
    const timer = setTimeout(() => {
      if (!session) {
        router.push("/login?callback=/accept-invitation/" + params.inviteId);
      }
      setIsChecking(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [session]);

  if (isChecking) {
    return <div>Verifying access...</div>;
  }

  return (
    <div>
      <AcceptInvite params={params} />
    </div>
  );
};

export default Page;
