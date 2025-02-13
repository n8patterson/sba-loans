"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Define status colors
const statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  approved: "bg-green-500",
  rejected: "bg-red-500",
};

export type WarrantyClaim = {
  id: string;
  title: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  message: string;
  status: "pending" | "approved" | "rejected";
};

export const columns: ColumnDef<WarrantyClaim>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={`text-white ${statusColors[row.original.status]}`}>
        {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
      </Badge>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger className="cursor-pointer">{row.original.priority}</TooltipTrigger>
        <TooltipContent>Priority: {row.original.priority}</TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => (
      <p className="truncate max-w-xs" title={row.original.message}>
        {row.original.message}
      </p>
    ),
  },
];
