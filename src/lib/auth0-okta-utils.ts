import { ManagementClient } from "auth0";

// Load environment variables
const baseUrl = process.env.AUTH0_ISSUER_BASE_URL!;
const domain = new URL(baseUrl).hostname;

const managementClient = new ManagementClient({
  domain,
  clientId: process.env.AUTH0_M2M_CLIENT_ID!,
  clientSecret: process.env.AUTH0_M2M_CLIENT_SECRET!,
});

/** Types **/
type OrganizationParams = { id: string };
type InvitationParams = { id: string; invitation_id: string };
type RoleParams = { id: string; user_id: string };
type AppMetadata = Record<string, any>;
type ConnectionData = {
  connection_id: string;
  assign_membership_on_login: boolean;
};

/** Membership / Invitation **/
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

  const invitation = await managementClient.organizations.createInvitation(params, data);
  return invitation;
}

export async function deleteInvitation(orgId: string, invitationId: string): Promise<void> {
  const params: InvitationParams = { id: orgId, invitation_id: invitationId };
  await managementClient.organizations.deleteInvitation(params);
}

export async function getInvitations(orgId: string): Promise<any> {
  const params: OrganizationParams = { id: orgId };
  return await managementClient.organizations.getInvitations(params);
}

/******* Organizations *********/
export async function createOrganization(organization: any): Promise<any> {
  return await managementClient.organizations.create(organization);
}

export async function getOrganizationByName(orgName: string): Promise<any> {
  const params = { name: orgName };
  return await managementClient.organizations.getByName(params);
}

export async function getEnabledConnections(orgId: string): Promise<any> {
  const params: OrganizationParams = { id: orgId };
  return await managementClient.organizations.getEnabledConnections(params);
}

export async function addEnabledConnectionToOrg(connectionId: string, orgId: string, autoMembership: boolean): Promise<any> {
  const params: OrganizationParams = { id: orgId };
  const data: ConnectionData = {
    connection_id: connectionId,
    assign_membership_on_login: autoMembership,
  };

  return await managementClient.organizations.addEnabledConnection(params, data);
}

export async function getMembers(orgId: string): Promise<any> {
  const params: OrganizationParams = { id: orgId };
  return await managementClient.organizations.getMembers(params);
}

export async function addMembers(orgId: string, userIds: string[]): Promise<void> {
  const params: OrganizationParams = { id: orgId };
  const data = { members: userIds };
  await managementClient.organizations.addMembers(params, data);
}

export async function getMemberRoles(orgId: string, userId: string): Promise<any> {
  const params: RoleParams = { id: orgId, user_id: userId };
  return await managementClient.organizations.getMemberRoles(params);
}

export async function addMemberRoles(orgId: string, userId: string, roleIds: string[]): Promise<any> {
  const params: RoleParams = { id: orgId, user_id: userId };
  const data = { roles: roleIds };
  return await managementClient.organizations.addMemberRoles(params, data);
}

export async function removeMemberRoles(orgId: string, userId: string, roleIds: string[]): Promise<any> {
  const params: RoleParams = { id: orgId, user_id: userId };
  const data = { roles: roleIds };
  return await managementClient.organizations.deleteMemberRoles(params, data);
}

export async function removeMembers(orgId: string, userIds: string[]): Promise<void> {
  const params: OrganizationParams = { id: orgId };
  const data = { members: userIds };
  await managementClient.organizations.deleteMembers(params, data);
}

/******* Roles *********/
export async function getAllRoles(): Promise<any> {
  return await managementClient.roles.getAll();
}

export async function getRole(roleId: string): Promise<any> {
  const params = { id: roleId };
  return await managementClient.roles.get(params);
}

/***** Users *******/
export async function getUser(userId: string): Promise<any> {
  const params = { id: userId };
  return await managementClient.users.get(params);
}

export async function updateAppMetadata(userId: string, appMetadata: AppMetadata): Promise<any> {
  console.log("Updating app metadata for user: ", userId);
  return await managementClient.users.update({ id: userId }, { app_metadata: appMetadata });
}

/***** Connections ********/
export async function createConnection(connectionData: any): Promise<any> {
  return await managementClient.connections.create(connectionData);
}

export async function getAllConnections(connectionMeta: any): Promise<any> {
  return await managementClient.connections.getAll(connectionMeta);
}

export async function deleteConnection(connectionId: string): Promise<any> {
  const params = { id: connectionId };
  return await managementClient.connections.delete(params);
}
