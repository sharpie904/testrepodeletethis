import {usePopup} from "@/app/(pages)/dashboard/family/context/PopupContext";
import {PopupType} from "@/app/(pages)/dashboard/family/context/types";
import NoFamilyForUserPopup from "@/components/popup/NoFamilyForUserPopup";
import InviteFamilyMemberPopup from "@/components/popup/InviteFamilyMemberPopup";
import CreateNewFamilyMemberPopup from "@/components/popup/CreateNewFamilyMemberPopup";
import RemoveCollaboratorFromFamilyConfirmationPopup
    from "@/components/popup/RemoveCollaboratorFromFamilyConfirmationPopup";

const PopupRenderer: React.FC = () => {
    const {popupState} = usePopup();

    if (!popupState.isOpen) return null;

    const renderPopup = () => {
        switch (popupState.type) {
            case PopupType.INVITE_FAMILY_MEMBER:
                return <InviteFamilyMemberPopup/>;
            case PopupType.NO_FAMILY_FOR_USER:
                return <NoFamilyForUserPopup title={"No family found"}
                                             description={"You are not a part of any family, please create a family and add members to start using FamilyFolio!"}
                                             showCancelButton={false}/>
            case PopupType.CREATE_NEW_FAMILY:
                return <NoFamilyForUserPopup title={"Family Name"}
                                             description={"Give your family a name"}
                                             showCancelButton={true}/>
            case PopupType.CREATE_NEW_FAMILY_MEMBER:
                return <CreateNewFamilyMemberPopup/>
            case PopupType.REMOVE_COLLABORATOR_FROM_FAMILY_CONFIRMATION:
                return <RemoveCollaboratorFromFamilyConfirmationPopup/>
            default:
                return null;
        }
    };

    return renderPopup();
};

export default PopupRenderer