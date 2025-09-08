"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {addFamilyMemberInOrganization} from "@/app/actions/organizations";

const AddFamilyProfile = ({ firstName, lastName, organizationId }: { firstName: string, lastName: string, organizationId: string }) => {
  const router = useRouter();
  const addFamilyMember = async () => {
    await addFamilyMemberInOrganization({ firstName, lastName, organizationId });
    router.refresh();
  }
  return (
    <div>
        <Input placeholder={"enter first name"} />
        <Input placeholder={"enter last name"} />
      <Button onClick={addFamilyMember} variant={"ghost"}>Add family member</Button>
    </div>
  )
}

export default AddFamilyProfile;
