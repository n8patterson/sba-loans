import { managementClient } from "@/lib/auth0/managementClient";

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createConnection(connectionData: any): Promise<any> {
  return await managementClient.connections.create(connectionData);
}

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAllConnections(connectionMeta: any): Promise<any> {
  return await managementClient.connections.getAll(connectionMeta);
}

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function deleteConnection(connectionId: string): Promise<any> {
  const params = { id: connectionId };
  return await managementClient.connections.delete(params);
}
