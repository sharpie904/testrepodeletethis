"use client"

import {useEffect, useRef, useState} from "react";
import {listFamilyMembers} from "@/app/actions/family-member"
import FamilyProfileCard from "@/app/(pages)/dashboard/family/[familyId]/components/FamilyProfileCard";

import {useRefreshTrigger} from "@/app/state/useRefreshTrigger";
import CreateFamilyProfile from "@/app/(pages)/dashboard/family/[familyId]/components/CreateFamilyProfile";

interface FamilyMember {
    firstName: string;
    lastName: string;
    isUser: boolean;
}

const FamilyProfilesList = ({organizationId}: { organizationId: string }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
    const {flag, refreshTrigger} = useRefreshTrigger();
    const isFirstMount = useRef(true);

    useEffect(() => {
        const fetchFamilyMembers = async () => {
            try {
                setIsLoading(true);
                const res = await listFamilyMembers({organizationId});
                const transformedData: FamilyMember[] = res.map(member => ({
                    firstName: member.firstName || '',
                    lastName: member.lastName || '',
                    isUser: false,
                }));
                setFamilyMembers(transformedData);
            } catch {
            } finally {
                setIsLoading(false);
            }
        }
        isFirstMount.current = false;

        // this condition works ONLY if you add a new "profile" and "save" it
        if (flag || isFirstMount.current) {
            fetchFamilyMembers();
            refreshTrigger(false);
        }
    }, [organizationId, flag]);

    return (
        // <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 lg:p-2 md:gap-9">
        <div className={"grid grid-cols-1 gap-3 md:grid-cols-2 mt-6 lg:grid-cols-3 md:gap-4"}>
            {familyMembers.map((member, index) => (
                <div key={index} className={"w-full"}>
                    <FamilyProfileCard
                        name={member.firstName}
                        lastName={member.lastName}
                        isUser={member.isUser}
                    />
                </div>
            ))}
            <CreateFamilyProfile/>
        </div>
    );
}

export default FamilyProfilesList;
