import { managementClient } from "./managementClient";

type OrganizationParams = { id: string };
type InvitationParams = { id: string; invitation_id: string };

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function inviteMembers(sender_name: string, orgId: string, email: string, roleList: string[], connectionId: string): Promise<any> {
  const params: OrganizationParams = { id: orgId };
  const data = {
    client_id: process.env.AUTH0_CLIENT_ID!,
    invitee: { email },
    inviter: { name: sender_name },
    roles: roleList,
    connection_id: connectionId,
    send_invitation_email: true,
  };
  return await managementClient.organizations.createInvitation(params, data);
}

export async function deleteInvitation(orgId: string, invitationId: string): Promise<void> {
  const params: InvitationParams = { id: orgId, invitation_id: invitationId };
  await managementClient.organizations.deleteInvitation(params);
}

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getInvitations(orgId: string): Promise<any> {
  const params: OrganizationParams = { id: orgId };
  return await managementClient.organizations.getInvitations(params);
}
