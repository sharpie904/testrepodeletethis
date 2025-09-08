import {useContext} from "react";
import {
    InviteFamilyMemberContextType,
    InviteFamilyMemberPopupContext
} from "@/app/(pages)/families/context/InviteFamilyMemberPopupProvider";


export const useInviteNewFamilyMemberPopup = (): InviteFamilyMemberContextType => {
    const context = useContext(InviteFamilyMemberPopupContext);
    if (context === undefined) {
        throw new Error('usePopup must be used within a InviteFamilyMemberPopupProvider');
    }
    return context;
};
