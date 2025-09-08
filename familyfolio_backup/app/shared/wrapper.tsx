import React from "react";
import {PopupProvider} from "@/app/(pages)/dashboard/family/context/PopupContext";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";

const Wrapper = ({children}: { children: React.ReactNode }) => {
    return (
        // <SidebarProvider>
        //     <AppSidebar/>
        <PopupProvider>
            {/*<SidebarTrigger/>*/}
            {children}
        </PopupProvider>
        // </SidebarProvider>
    )
}

export default Wrapper;