"use client";

import { DataTable } from "@/components/admin/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define contact columns and data
const contactColumns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "status",
    header: "Status",
    // TODO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: any) => <span className={`${row.original.status === "Active" ? "text-green-600" : "text-gray-500"}`}>{row.original.status}</span>,
  },
];

const contactData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-202-555-0192",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1-202-555-0178",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1-202-555-0145",
    status: "Active",
  },
];

export default function ContactsPage() {
  return (
    <div className="p-6 space-y-6">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle>Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={contactColumns} data={contactData} />
        </CardContent>
      </Card>
    </div>
  );
}
