"use client";

import Image from "next/image";
import { Home, Inbox, Users, MapPinHouseIcon } from "lucide-react";
import { SidebarNewsletterForm } from "@/components/global/sidebar-newsletter-form";
import { SidebarReferralForm } from "./sidebar-referral-form";
import { OrganizationSwitcher } from "./organization-switcher";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

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

interface OrganizationSwitcherProps {
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  organizations: any;
  currentOrgId: string;
}

export function AppSidebar({ organizations, currentOrgId }: OrganizationSwitcherProps) {
  // const CUSTOM_CLAIMS_NAMESPACE = process.env.CUSTOM_CLAIMS_NAMESPACE + "/roles" || "https://your-app.com/claims";

  // Get user from useUser hook.
  const { user } = useUser();
  console.log(user);
  // Extract user role safely
  const userRoles: string[] = (user?.["https://buildup.com/claims/roles"] as string[]) || [];
  console.log(userRoles);
  const userRole = userRoles.includes("admin");
  console.log(userRole);

  // Sidebar menu items with dynamic "Home" URL
  const items = [
    {
      title: "Home",
      url: userRole ? "/admin" : "/dashboard",
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
      icon: Users,
    },
  ];
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
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/">
                  {open ? (
                    <Image src="/horizontal-logo-black-and-red.svg" alt="Logo" width={150} height={50} priority />
                  ) : (
                    <Image src="/red-logo-icon.png" alt="Logo" width={25} height={25} priority />
                  )}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <OrganizationSwitcher organizations={organizations} currentOrgId={currentOrgId} />
        </SidebarHeader>

        {/* Organization Switcher */}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
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
      <SidebarFooter>
        <div>
          <SidebarReferralForm />
        </div>
        <div>
          <SidebarNewsletterForm />
        </div>
        <AuthButtons />
      </SidebarFooter>
    </Sidebar>
  );
}
