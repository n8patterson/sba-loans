import { ManagementClient } from "auth0";

// Load environment variables
const baseUrl = process.env.AUTH0_ISSUER_BASE_URL!;
const domain = new URL(baseUrl).hostname;

export const managementClient = new ManagementClient({
  domain,
  clientId: process.env.AUTH0_M2M_CLIENT_ID!,
  clientSecret: process.env.AUTH0_M2M_CLIENT_SECRET!,
});
