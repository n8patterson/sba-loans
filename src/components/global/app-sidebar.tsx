"use client";

import Image from "next/image";
import { Home, Inbox, Users, MapPinHouseIcon } from "lucide-react";
import { SidebarNewsletterForm } from "@/components/global/sidebar-newsletter-form";
import { SidebarReferralForm } from "./sidebar-referral-form";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import { AuthButtons } from "@/components/auth/AuthButtons";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Jobs",
    url: "/jobs",
    icon: MapPinHouseIcon,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Contacts",
    url: "/contacts",
    icon: Users, // New tab for contacts
  },
];

export function AppSidebar() {
  // Get sidebar context from useSidebar hook.
  const { open } = useSidebar();

  // Mock data for notifications
  const notifications = {
    messages: 3,
    calendar: 2,
    alerts: 5,
  };

  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const totalNotifications = notifications.messages + notifications.calendar + notifications.alerts;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Logo Section */}
        <SidebarHeader className="flex items-center justify-center pt-6">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/">
                  {open ? (
                    <div className="flex items-center">
                      <Image src="/horizontal-logo-black-and-red.svg" alt="Logo" width={150} height={50} priority />
                    </div>
                  ) : (
                    <Image src="/omniclan.png" alt="Logo" width={200} height={200} priority />
                  )}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center space-x-9 text-xl">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer - Login/Logout Buttons */}
      <SidebarFooter className="flex justify-center py-4 border-t">
        <div className="p-1">
          <SidebarReferralForm />
        </div>
        <div className="p-1">
          <SidebarNewsletterForm />
        </div>
        <AuthButtons />
      </SidebarFooter>
    </Sidebar>
  );
}
