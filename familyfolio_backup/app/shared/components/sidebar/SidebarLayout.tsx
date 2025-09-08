"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { NavbarItems } from "@/lib/navbar-items";

type SidebarLayoutProps = {
  children: React.ReactNode;
  items: NavbarItems
};

export default function SidebarLayout({ children, items }: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar items={items} />
      <main className={"w-full"}>
        {children}
      </main>
    </SidebarProvider>
  );
}
