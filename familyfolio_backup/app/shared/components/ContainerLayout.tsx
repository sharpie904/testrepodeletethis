import {Navbar} from "@/app/shared/components/navbar/Navbar";
import React from "react";

interface ContentLayoutProps {
    title: string;
    children: React.ReactNode;
}

export function ContainerLayout({children}: ContentLayoutProps) {
    return (
        <div className={"h-screen"}>
            <Navbar/>
            <div className={"p-6"}>{children}</div>
        </div>
    );
}