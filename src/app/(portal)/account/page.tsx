import { Role } from "@/lib/roles";
import { appClient, managementClient } from "@/lib/auth0";
import { PendingInvitationsTable } from "@/components/global/pending-invitations-table";
import { ActiveMembersTable } from "@/components/global/active-members-table";
import { InviteTeamMembers } from "@/components/global/invite-team-members";

export default async function AccountPage() {
  const session = await appClient.getSession();
  const { data: members } = await managementClient.organizations.getMembers({
    id: session!.user.org_id,
    fields: ["user_id", "name", "email", "picture", "roles"].join(","),
    include_fields: true,
  });
  const { data: invitations } = await managementClient.organizations.getInvitations({
    id: session!.user.org_id,
  });
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Members</h1>
          <p className="text-muted-foreground">Manage the members of the organization.</p>
        </div>
      </div>

      <ActiveMembersTable
        members={members.map((m) => ({
          id: m.user_id,
          name: m.name,
          email: m.email,
          picture: m.picture,
          role: ((m.roles && m.roles[0]?.name) || "member") as Role,
        }))}
      />

      <InviteTeamMembers />

      <PendingInvitationsTable
        invitations={invitations.map((i) => ({
          id: i.id,
          inviter: {
            name: i.inviter.name,
          },
          invitee: {
            email: i.invitee.email,
          },
          role: i.roles && i.roles[0] && i.roles[0] === process.env.AUTH0_ADMIN_ROLE_ID ? "admin" : "member",
          url: i.invitation_url,
        }))}
      />
    </div>
  );
}
