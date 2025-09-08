"use client"

import React, {createContext, ReactNode, useState} from "react";
import InviteFamilyMemberPopup from "@/app/(pages)/families/components/InviteFamilyMemberPopup";

export interface InviteFamilyMemberContextType {
    inviteFamilyMemberPopupShow: boolean;
    setInviteFamilyMemberPopupShow: (show: boolean) => void;
}

interface InviteFamilyMemberPopupProviderProps {
    children: ReactNode;
}

export const InviteFamilyMemberPopupContext = createContext<InviteFamilyMemberContextType | undefined>(undefined);

export const InviteFamilyMemberPopupProvider: React.FC<InviteFamilyMemberPopupProviderProps> = ({children}) => {
    const [inviteFamilyMemberPopupShow, setInviteFamilyMemberPopupShow] = useState<boolean>(false);

    const value: InviteFamilyMemberContextType = {
        inviteFamilyMemberPopupShow: inviteFamilyMemberPopupShow,
        setInviteFamilyMemberPopupShow: setInviteFamilyMemberPopupShow,
    };

    return (
        <InviteFamilyMemberPopupContext.Provider value={value}>
            {children}
            {inviteFamilyMemberPopupShow && <InviteFamilyMemberPopup/>}
        </InviteFamilyMemberPopupContext.Provider>
    );
};