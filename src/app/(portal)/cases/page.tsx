"use client";

import { DataTable } from "@/components/admin/data-table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Case = {
  id: string;
  businessName: string;
  createdAt: string;
  assignedTo: string | null;
};

// Example date format: "2023-10-01T12:00:00Z"

export const columns: ColumnDef<Case>[] = [
  {
    accessorKey: "businessName",
    header: "Business Name",
    cell: ({ row }) => <div className="font-medium">{row.original.businessName}</div>,
  },
  {
    accessorKey: "daysOpen",
    header: "Days Open",
    cell: ({ row }) => {
      const daysOpen = Math.floor((new Date().getTime() - new Date(row.original.createdAt).getTime()) / (1000 * 3600 * 24));
      return <div>{daysOpen} days</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.assignedTo ? "Assigned" : "Unassigned";
      return <div className={`font-medium ${status === "Assigned" ? "text-green-500" : "text-red-500"}`}>{status}</div>;
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Assign To",
    cell: ({ row }) => (
      <Select
        value={row.original.assignedTo || ""}
        onValueChange={(value) => {
          row.original.assignedTo = value;
          // TODO: trigger update (ideally using useState or react-table meta update)
        }}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Assign to..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tech1">Technician 1</SelectItem>
          <SelectItem value="tech2">Technician 2</SelectItem>
          <SelectItem value="unassigned">Unassigned</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
];

const caseData: Case[] = [
  { id: "1", createdAt: "2025-01-01T12:00:00Z", businessName: "Acme Plumbing", assignedTo: "tech1" },
  { id: "2", createdAt: "2025-02-01T12:00:00Z", businessName: "Bright Electric", assignedTo: "tech2" },
  { id: "3", createdAt: "2025-03-01T12:00:00Z", businessName: "CoolAir HVAC", assignedTo: null },
];

export default function CasesPage() {
  return (
    <div className="p-6 space-y-6">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle>Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={caseData} />
        </CardContent>
      </Card>
    </div>
  );
}
