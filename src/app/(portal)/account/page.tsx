"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InviteMemberDialog } from "@/components/global/InviteMemberDialog";

// Sample Data
const pendingInvitations = [
  {
    email: "pending.email@example.com",
    accessLevel: "viewer",
    createdAt: "2025-02-01",
    expiresAt: "2025-02-10",
  },
];

const activeMembers = [
  {
    name: "Nathan Patterson",
    email: "nathan.e.patterson@gmail.com",
    accessLevel: "admin",
  },
];

export default function AccountPage() {
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = useState(false);
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pending, setPending] = useState(pendingInvitations);
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [members, setMembers] = useState(activeMembers);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Members</h1>
        <InviteMemberDialog />
      </div>

      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle>Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Pending Invitations Table */}
          <div className="mb-6">
            <h2 className="text-xs font-semibold mb-4">Pending Invitations</h2>

            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">E-mail</TableHead>
                      <TableHead className="text-left">Access level</TableHead>
                      <TableHead className="text-left">Created At</TableHead>
                      <TableHead className="text-left">Expires At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pending.length > 0 ? (
                      pending.map((invitation, index) => (
                        <TableRow key={index}>
                          <TableCell>{invitation.email}</TableCell>
                          <TableCell>{invitation.accessLevel}</TableCell>
                          <TableCell>{invitation.createdAt}</TableCell>
                          <TableCell>{invitation.expiresAt}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-500">
                          No pending invitations
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Active Members Table */}
          <div>
            <h2 className="text-xs font-semibold mb-4">Active Members</h2>
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Name</TableHead>
                      <TableHead className="text-left">Access Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.length > 0 ? (
                      members.map((member, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-white">{member.name[0]}</div>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-gray-500">{member.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{member.accessLevel}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center text-gray-500">
                          No active members
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
