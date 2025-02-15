import { managementClient } from "@/lib/auth0/managementClient";

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
