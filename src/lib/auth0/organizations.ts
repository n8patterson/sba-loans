import { managementClient } from "@/lib/auth0/managementClient";

type OrganizationParams = { id: string };
type ConnectionData = {
  connection_id: string;
  assign_membership_on_login: boolean;
};

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

export async function removeMembers(orgId: string, userIds: string[]): Promise<void> {
  const params: OrganizationParams = { id: orgId };
  const data = { members: userIds };
  await managementClient.organizations.deleteMembers(params, data);
}
