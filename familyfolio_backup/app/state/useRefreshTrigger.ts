import {create} from "zustand/index";

interface RefreshTriggerFlag {
    flag: boolean,
    refreshTrigger: (flag: boolean) => void,
}

export const useRefreshTrigger = create<RefreshTriggerFlag>()(
    (set) => ({
        flag: true, // set this to true so data is fetched on the first mount
        refreshTrigger: (flag: boolean) => set({
            flag
        })
    }),
);