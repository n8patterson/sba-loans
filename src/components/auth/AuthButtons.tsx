"use client";

import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles, ChevronsUpDown, Calendar, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useSidebar, SidebarMenuButton } from "@/components/ui/sidebar";
import { useState } from "react";
import { InviteMemberDialog } from "@components/global/InviteMemberDialog";

export function AuthButtons() {
  const { user, isAuthenticated } = useAuth();
  const { isMobile } = useSidebar();
  const [notifications, setNotifications] = useState({
    alerts: 3,
    messages: 5,
    calendar: 2,
  });

  const totalNotifications = notifications.alerts + notifications.messages + notifications.calendar;

  // if (!isAuthenticated) {
  //   return (
  //     <a href="/api/auth/login">
  //       <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">Login</button>
  //     </a>
  //   );
  // }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src="/profile.png" alt={user?.name} />
            {/* <AvatarImage src={user?.picture} alt={user?.name} /> */}
            {/* <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback> */}
            {/* Make avatar fallback an url to an image */}
            <AvatarFallback>
              <img src="/profile.png" alt="Omniclan" />
            </AvatarFallback>
          </Avatar>
          <div className="text-left text-sm leading-tight md:block max-w-xs truncate">
            <span className="font-semibold truncate" title={user?.name}>
              {user?.name}
            </span>
            <span className="text-xs text-gray-500 block truncate" title={user?.email}>
              {user?.email}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal truncate" title={user?.name}>
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src="/profile.png" alt={user?.name} />
              {/* <AvatarImage src={user?.picture} alt={user?.name} /> */}
              {/* <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback> */}
              {/* Make avatar fallback an url to an image */}
              <AvatarFallback>
                <img src="/profile.png" alt="Omniclan" />
              </AvatarFallback>
            </Avatar>
            <div className="text-left text-sm leading-tight md:block max-w-xs truncate">
              <span className="font-semibold truncate" title={user?.name}>
                {user?.name}
              </span>
              <span className="text-xs text-gray-500 block truncate" title={user?.email}>
                {user?.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/pricing">
              <div className="flex items-center">
                <Sparkles className="mr-2" />
                Upgrade to Pro
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/account">
              <div className="flex items-center">
                <BadgeCheck className="mr-2" />
                Account
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2" />
            Billing
          </DropdownMenuItem>
          {/* Mobile-only Icons */}
          {isMobile && (
            <>
              <DropdownMenuItem>
                <Calendar className="mr-2" />
                Calendar
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center space-x-2">
                <MessageCircle className="relative">
                  {notifications.messages > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                      {notifications.messages}
                    </span>
                  )}
                </MessageCircle>
                <span className="flex items-center">
                  Messages
                  {notifications.messages > 0 && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                      {notifications.messages}
                    </span>
                  )}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2" />
                Notifications
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="/api/auth/logout" className="w-full flex items-center">
            <LogOut className="mr-2" />
            Log out
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
