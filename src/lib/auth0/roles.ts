import { managementClient } from "@/lib/auth0/managementClient";

type RoleParams = { id: string; user_id: string };

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAllRoles(): Promise<any> {
  return await managementClient.roles.getAll();
}

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getRole(roleId: string): Promise<any> {
  const params = { id: roleId };
  return await managementClient.roles.get(params);
}

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getMemberRoles(orgId: string, userId: string): Promise<any> {
  const params: RoleParams = { id: orgId, user_id: userId };
  return await managementClient.organizations.getMemberRoles(params);
}

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addMemberRoles(orgId: string, userId: string, roleIds: string[]): Promise<any> {
  const params: RoleParams = { id: orgId, user_id: userId };
  const data = { roles: roleIds };
  return await managementClient.organizations.addMemberRoles(params, data);
}

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function removeMemberRoles(orgId: string, userId: string, roleIds: string[]): Promise<any> {
  const params: RoleParams = { id: orgId, user_id: userId };
  const data = { roles: roleIds };
  return await managementClient.organizations.deleteMemberRoles(params, data);
}
