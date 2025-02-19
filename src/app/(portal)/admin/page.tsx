"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns, WarrantyClaim } from "@/components/admin/columns";
import { DataTable } from "@/components/admin/data-table";
import { useState } from "react";
import { ClaimsCalendar } from "@/components/admin/calendar";
import { useUser } from "@auth0/nextjs-auth0/client";

// Sample warranty claims (Replace with API data later)
const sampleClaims: WarrantyClaim[] = [
  {
    id: "1",
    title: "Leaky Faucet",
    category: "Plumbing",
    priority: "High",
    message: "Water is leaking under the sink.",
    status: "pending",
  },
  {
    id: "2",
    title: "HVAC Issue",
    category: "HVAC",
    priority: "Medium",
    message: "Air conditioning is not working.",
    status: "approved",
  },
  {
    id: "3",
    title: "Electrical Short",
    category: "Electrical",
    priority: "High",
    message: "Breaker trips frequently.",
    status: "rejected",
  },
];

export default function AdminHome() {
  const { user } = useUser();
  const adminName = user?.name || "Admin";
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [claims, setClaims] = useState(sampleClaims);

  return (
    <div className="p-6 space-y-6">
      {/* 🔹 Admin Welcome Message */}
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Welcome back, <strong>{adminName}</strong> (Admin)
        </h2>
      </div>

      {/* 🔹 Admin Dashboard */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="w-full lg:w-2/3 shadow-lg">
          <CardHeader>
            <CardTitle>Warranty Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={claims} />
          </CardContent>
        </Card>

        {/* Claims Calendar */}
        <Card className="w-full lg:w-1/3 shadow-lg">
          <CardHeader>
            <CardTitle>Work Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <ClaimsCalendar claims={claims} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
