"use client"

import ListUserFamilies from "@/app/(pages)/families/components/ListUserFamilies";
import {authClient} from "@/lib/auth-client";
import React, {useEffect} from "react";
import {useActiveFamily} from "@/app/state/useActiveFamily";
import {usePopup} from "@/app/(pages)/dashboard/family/context/PopupContext";
import {PopupType} from "@/app/(pages)/dashboard/family/context/types";

const FamilyContainer = () => {
    const {data: userOrganizations} = authClient.useListOrganizations();
    const {closePopup, openPopup} = usePopup();
    const activeFamilyId = useActiveFamily((state) => state.family.id);

    useEffect(() => {
        if (userOrganizations && userOrganizations.length > 0) {
            closePopup();
        } else {
            openPopup(PopupType.NO_FAMILY_FOR_USER);
        }
    }, [userOrganizations]);

    useEffect(() => {
        if (activeFamilyId) {
            authClient.organization.setActive({
                orgId: activeFamilyId
            });
        }
    }, [activeFamilyId]);

    return (
        <div className={"flex-col justify-between"}>
            <h1>Families</h1>
            {/*{activeFamilyId !== null &&*/}
            {/*    <div> current active family is {activeFamilyId} and name is {activeFamilyName}</div>}*/}
            <ListUserFamilies/>
        </div>
    )
}

export default FamilyContainer