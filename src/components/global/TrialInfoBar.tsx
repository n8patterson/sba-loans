"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

interface TrialInfoBarProps {
  daysLeft: number;
}

export function TrialInfoBar({ daysLeft }: TrialInfoBarProps) {
  const { user } = useUser();

  let subscription_plan;
  let end_date;
  if (user?.subscription) {
    // TODO fix user type later
    const sub = (user.subscription as string).split("|");
    subscription_plan = sub[0];
    // TODO
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    end_date = new Date(sub[1]);
  }

  if (subscription_plan?.toLowerCase() !== "trial") {
    return <></>;
  }

  return (
    <div className="flex items-center gap-4">
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
