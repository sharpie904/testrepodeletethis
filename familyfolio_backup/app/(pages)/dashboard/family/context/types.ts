export enum PopupType {
    INVITE_FAMILY_MEMBER = 'INVITE_FAMILY_MEMBER',
    CREATE_NEW_FAMILY = 'CREATE_NEW_FAMILY',
    NO_FAMILY_FOR_USER = 'NO_FAMILY_FOR_USER',
    CREATE_NEW_FAMILY_MEMBER = 'CREATE_NEW_FAMILY_MEMBER',
    REMOVE_COLLABORATOR_FROM_FAMILY_CONFIRMATION = "REMOVE_COLLABORATOR_FROM_FAMILY_CONFIRMATION",
}

export interface PopupState {
    isOpen: boolean;
    type: PopupType | null;
}

export interface PopupContextType {
    popupState: PopupState;
    openPopup: (type: PopupType) => void;
    closePopup: () => void;
}