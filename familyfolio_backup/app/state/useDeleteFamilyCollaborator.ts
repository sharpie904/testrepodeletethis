import {create} from 'zustand';

interface FamilyCollaborator {
    id: string;
    // email: string;
    // role: string | null;
}

interface DeleteFamilyCollaboratorStore {
    markedCollaborator: FamilyCollaborator | null;
    markForDeletion: (collaborator: FamilyCollaborator) => void;
    clearMarkedCollaborator: () => void;
}

const useDeleteFamilyCollaborator = create<DeleteFamilyCollaboratorStore>((set) => ({
    markedCollaborator: null,
    markForDeletion: (collaborator) => set({markedCollaborator: collaborator}),
    clearMarkedCollaborator: () => set({markedCollaborator: null}),
}));

export default useDeleteFamilyCollaborator;