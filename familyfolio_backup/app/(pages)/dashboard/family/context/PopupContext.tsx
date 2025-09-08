"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PopupContextType, PopupState, PopupType } from './types';
import PopupRenderer from "@/app/(pages)/dashboard/family/[familyId]/components/PopupRenderer";

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopup = () => {
    const context = useContext(PopupContext);
    if (!context) {
        throw new Error('usePopup must be used within a PopupProvider');
    }
    return context;
};

interface PopupProviderProps {
    children: ReactNode;
}

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
    const [popupState, setPopupState] = useState<PopupState>({
        isOpen: false,
        type: null,
    });

    const openPopup = (type: PopupType) => {
        setPopupState({ isOpen: true, type });
    };

    const closePopup = () => {
        setPopupState({ isOpen: false, type: null});
    };

    return (
        <PopupContext.Provider value={{ popupState, openPopup, closePopup }}>
            {children}
            <PopupRenderer />
        </PopupContext.Provider>
    );
};
