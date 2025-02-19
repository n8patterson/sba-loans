"use client";

import { SidebarInset, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Bell, Calendar, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

import { TrialInfoBar } from "@/components/global/trial-info-bar";
import { useUser } from "@auth0/nextjs-auth0/client";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  console.log("User:", user);
  // Extract subscription from user object
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const subscription = user?.subscription || "trial";

  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setOpen } = useSidebar(); // Hook to control sidebar state
  const [daysLeft, setDaysLeft] = useState(30); // Default trial period
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notifications, setNotifications] = useState({
    alerts: 3,
    messages: 5,
    calendar: 2,
  }); // Example notification counts
  // Get subscription status from user object

  useEffect(() => {
    // Simulated trial check (replace with API call later)
    const storedDays = localStorage.getItem("trialDaysLeft");
    if (storedDays) {
      setDaysLeft(parseInt(storedDays, 30));
    }
  }, []);

  return (
    <SidebarInset className="flex flex-col flex-1 overflow-auto">
      <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b bg-white shadow-md px-4">
        <SidebarTrigger />
        <div className="flex items-center">
          <TrialInfoBar daysLeft={daysLeft} />
        </div>

        {/* Right: Icons (Calendar, Messages, Alerts, Profile) */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="relative">
            <Calendar className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-900 transition" />
            {notifications.calendar > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                {notifications.calendar}
              </span>
            )}
          </div>
          <div className="relative">
            <MessageCircle className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-900 transition" />
            {notifications.messages > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                {notifications.messages}
              </span>
            )}
          </div>
          <div className="relative">
            <Bell className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-900 transition" />
            {notifications.alerts > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                {notifications.alerts}
              </span>
            )}{" "}
          </div>
        </div>
      </header>

      {/* 🔹 Main Content Scrollable */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </SidebarInset>
  );
}
