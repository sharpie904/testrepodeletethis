import React from "react";
import Wrapper from "@/app/shared/wrapper";
import SidebarLayout from "../../shared/components/sidebar/SidebarLayout";
import {HomeNavbarItems} from "@/lib/navbar-items";

export default function HomeLayout({children}: { children: React.ReactNode }) {
    return (
        <Wrapper>
            <SidebarLayout items={HomeNavbarItems}>{children}</SidebarLayout>
        </Wrapper>
    );
}
