"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createInvitation } from "@/app/(portal)/account/actions"; // Replace with actual API call function
import { Role } from "@/lib/roles";

export function InviteTeamMembers() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("member");
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!email) {
      toast({ variant: "destructive", description: "Please enter an email address." });
      return;
    }

    setLoading(true);
    const { error } = await createInvitation(email, role); // Replace with actual API call function

    if (error) {
      toast({ variant: "destructive", description: error });
    } else {
      toast({ description: "Invitation sent successfully!" });
      setEmail(""); // Reset input after successful invite
    }
    setLoading(false);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Invite team members</CardTitle>
        <p className="text-sm text-muted-foreground">Invite team members to join this organization using their email address.</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {/* Role Selection */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(val) => setRole(val as Role)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Send Button */}
        <div className="flex justify-end mt-4">
          <Button onClick={handleInvite} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
