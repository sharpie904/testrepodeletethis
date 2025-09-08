import {useContext} from "react";
import {
    CreateNewFamilyContextType,
    CreateNewFamilyPopupContext
} from "@/app/(pages)/families/context/CreateNewFamilyPopupProvider";

export const useCreateNewFamilyPopup = (): CreateNewFamilyContextType => {
    const context = useContext(CreateNewFamilyPopupContext);
    if (context === undefined) {
        throw new Error('usePopup must be used within a CreateNewFamilyPopupProvider');
    }
    return context;
};
