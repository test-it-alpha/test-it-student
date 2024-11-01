"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import items from "./menu-items";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 mb-2 px-1">
          <Image
            src="/testit-dark.svg"
            alt="Test.it dark"
            width={40}
            height={40}
            className="h-8 w-8 rounded-lg shadow-lg"
          />
          <span className="text-lg font-bold">Test.it</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    variant={item.url === pathname ? "active" : "default"}
                    asChild
                  >
                    <a href={item.url} className="w-full flex relative">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.badge !== undefined && (
                    <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
