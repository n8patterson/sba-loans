import { managementClient } from "@/lib/auth0/managementClient";

type RoleParams = { id: string; user_id: string };

export async function getAllRoles(): Promise<any> {
  return await managementClient.roles.getAll();
}

export async function getRole(roleId: string): Promise<any> {
  const params = { id: roleId };
  return await managementClient.roles.get(params);
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
