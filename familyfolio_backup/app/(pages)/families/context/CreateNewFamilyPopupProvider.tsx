"use client"

import React, {createContext, ReactNode, useState} from "react";
import CreateNewFamilyPopup from "@/app/(pages)/families/components/CreateNewFamilyPopup";

export interface CreateNewFamilyContextType {
    createNewFamilyPopupShow: boolean;
    setCreateNewFamilyPopupShow: (show: boolean) => void;
}

interface CreateNewFamilyProviderProps {
    children: ReactNode;
}

export const CreateNewFamilyPopupContext = createContext<CreateNewFamilyContextType | undefined>(undefined);

export const CreateNewFamilyPopupProvider: React.FC<CreateNewFamilyProviderProps> = ({children}) => {
    const [createNewFamilyPopupShow, setCreateNewFamilyPopupShow] = useState<boolean>(false);

    const value: CreateNewFamilyContextType = {
        createNewFamilyPopupShow: createNewFamilyPopupShow,
        setCreateNewFamilyPopupShow: setCreateNewFamilyPopupShow,
    };

    return (
        <CreateNewFamilyPopupContext.Provider value={value}>
            {children}
            {createNewFamilyPopupShow && <CreateNewFamilyPopup/>}
        </CreateNewFamilyPopupContext.Provider>
    );
};