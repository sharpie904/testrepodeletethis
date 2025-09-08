import React from "react";
import Wrapper from "@/app/shared/wrapper";
import DashboardLayout from "@/app/shared/components/sidebar/SidebarLayout";
import {FamilyNavbarItems} from "@/lib/navbar-items";

export default function FamilyLayout({
                                         children
                                     }: {
    children: React.ReactNode;
}) {
    return (
        <Wrapper>
            <DashboardLayout items={FamilyNavbarItems}>{children}</DashboardLayout>
        </Wrapper>
    );
}
