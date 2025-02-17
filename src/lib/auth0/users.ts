import { managementClient } from "@/lib/auth0/managementClient";

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppMetadata = Record<string, any>;

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getUser(userId: string): Promise<any> {
  const params = { id: userId };
  return await managementClient.users.get(params);
}

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateAppMetadata(userId: string, appMetadata: AppMetadata): Promise<any> {
  console.log("Updating app metadata for user: ", userId);
  return await managementClient.users.update({ id: userId }, { app_metadata: appMetadata });
}
