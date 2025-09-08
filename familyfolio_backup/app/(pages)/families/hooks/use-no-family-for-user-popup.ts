import {useContext} from "react";
import {NoFamilyForUserPopupContext, NoFamilyForUserPopupContextType} from "@/app/(pages)/families/context/NoFamilyForUserPopupProvider";

export const useNoFamilyForUserPopup = (): NoFamilyForUserPopupContextType => {
    const context = useContext(NoFamilyForUserPopupContext);
    if (context === undefined) {
        throw new Error('usePopup must be used within a NoFamilyForUserPopupProvider');
    }
    return context;
};
