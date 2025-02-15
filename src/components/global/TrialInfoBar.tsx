"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TrialInfoBarProps {
  daysLeft: number;
}

export function TrialInfoBar({ daysLeft }: TrialInfoBarProps) {
  return (
    <div className="flex items-center gap-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />

      {/* 🔹 Days Left in Trial */}
      <div className="text-sm text-gray-600">
        <span className="font-semibold">{daysLeft} days left</span> in your trial
      </div>

      {/* 🔹 Upgrade Button */}
      <Link href="/pricing">
        <Button variant="outline" size="sm" className="ml-2">
          Upgrade Now
        </Button>
      </Link>
    </div>
  );
}
