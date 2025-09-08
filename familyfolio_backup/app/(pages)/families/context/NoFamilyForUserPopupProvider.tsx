"use client"

import React, {createContext, ReactNode, useState} from "react";
import NoFamilyForUserPopup from "@/app/(pages)/families/components/NoFamilyForUserPopup";

export interface NoFamilyForUserPopupContextType {
    noFamilyForUserPopupShow: boolean;
    setNoFamilyForUserPopupShow: (show: boolean) => void;
}

interface NoFamilyForUserPopupProviderProps {
    children: ReactNode;
}

export const NoFamilyForUserPopupContext = createContext<NoFamilyForUserPopupContextType | undefined>(undefined);

export const NoFamilyForUserPopupProvider: React.FC<NoFamilyForUserPopupProviderProps> = ({children}) => {
    const [noFamilyForUserPopupShow, setNoFamilyForUserPopupShow] = useState<boolean>(false);

    const value: NoFamilyForUserPopupContextType = {
        noFamilyForUserPopupShow: noFamilyForUserPopupShow,
        setNoFamilyForUserPopupShow: setNoFamilyForUserPopupShow,
    };

    return (
        <NoFamilyForUserPopupContext.Provider value={value}>
            {children}
            {noFamilyForUserPopupShow && <NoFamilyForUserPopup/>}
        </NoFamilyForUserPopupContext.Provider>
    );
};