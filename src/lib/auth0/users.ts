import { managementClient } from "@/lib/auth0/managementClient";

type AppMetadata = Record<string, any>;

export async function getUser(userId: string): Promise<any> {
  const params = { id: userId };
  return await managementClient.users.get(params);
}

export async function updateAppMetadata(userId: string, appMetadata: AppMetadata): Promise<any> {
  console.log("Updating app metadata for user: ", userId);
  return await managementClient.users.update({ id: userId }, { app_metadata: appMetadata });
}
