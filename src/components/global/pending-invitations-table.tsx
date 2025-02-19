"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Role } from "@/lib/roles";

interface Props {
  invitations: {
    id: string;
    inviter: {
      name: string;
    };
    invitee: {
      email: string;
    };
    role: Role;
    url: string;
  }[];
}
export function PendingInvitationsTable({ invitations }: Props) {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Pending Invitations</CardTitle>
      </CardHeader>
      <CardContent>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2 text-left">E-mail</TableHead>
                  <TableHead className="w-1/2 text-left">Access Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations.map((invitation, index) => (
                  <TableRow key={index}>
                    <TableCell>{invitation.invitee.email}</TableCell>
                    <TableCell>{invitation.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
