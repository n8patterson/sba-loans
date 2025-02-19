"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/lib/roles";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash } from "lucide-react";

import { removeMember, updateRole } from "@/app/(portal)/account/actions";

interface Props {
  members: {
    id: string;
    name: string;
    email: string;
    picture: string;
    role: Role;
  }[];
}

export function ActiveMembersTable({ members }: Props) {
  const { toast } = useToast();
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Active Members</CardTitle>
      </CardHeader>
      <CardContent>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2 text-left">Name</TableHead>
                  <TableHead className="w-1/2 text-left">Access Level</TableHead>
                  <TableHead className="w-1/2 text-left"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-white">{member.name[0]}</div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={member.role}
                        onValueChange={async (role: Role) => {
                          const { error } = await updateRole(member.id, role);
                          if (error) {
                            return toast({ variant: "destructive", description: error });
                          }
                          toast({ className: "bg-green", description: "The member's role has been updated.s" });
                        }}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue>{member.role}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={async () => {
                              const { error } = await removeMember(member.id);
                              if (error) {
                                return toast({ variant: "destructive", description: error });
                              }
                              toast({ className: "bg-green", description: "The member has been removed." });
                            }}
                            className="text-red-600 cursor-pointer"
                          >
                            <Trash className="w-4 h-4 mr-2" />
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
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
