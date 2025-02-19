import { getAllConnections } from "@/lib/auth0/connections";
import { getAllRoles, addMemberRoles } from "@/lib/auth0/roles";
import { addMembers, createOrganization } from "@/lib/auth0/organizations";
import { updateAppMetadata } from "@/lib/auth0/users";
import { NextRequest, NextResponse } from "next/server";
import { appClient } from "@/lib/auth0";

type ConnectionMeta = {
  name: string;
  strategy: string;
  per_page: number;
  page: number;
};

type Organization = {
  name: string;
  metadata: {
    subscription: string;
  };
  enabled_connections: {
    connection_id: string;
    assign_membership_on_login: boolean;
  }[];
};

export const GET = appClient.withApiAuthRequired(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const org_name = searchParams.get("org_name");

  console.log("Organization name:", org_name);

  if (!org_name) {
    return NextResponse.json({ msg: "Organization name identifier is required." }, { status: 400 });
  }

  const dbConnectionMeta: ConnectionMeta = {
    name: "Username-Password-Authentication",
    strategy: "auth0",
    per_page: 1,
    page: 0,
  };

  const socialConnectionMeta: ConnectionMeta = {
    name: "google-oauth2",
    strategy: "google-oauth2",
    per_page: 1,
    page: 0,
  };

  try {
    // Retrieve connections
    const dbConnection = await getAllConnections(dbConnectionMeta);
    const socialConnection = await getAllConnections(socialConnectionMeta);

    console.log("DB connection:", dbConnection);
    console.log("Social connection:", socialConnection);

    // Retrieve all roles
    const allRoles = await getAllRoles();
    console.log("All roles:", allRoles);

    // Get the admin role
    const adminRole = allRoles.data.find((role: { name: string }) => role.name === "admin");

    console.log("Admin role:", adminRole);

    if (!adminRole) {
      return NextResponse.json({ msg: "Administrator role not found." }, { status: 404 });
    }

    const res = new NextResponse();
    const session = await appClient.getSession(req, res);
    const user_id = session?.user.sub;

    if (!user_id) {
      return NextResponse.json({ msg: "User session not found. Unauthorized access." }, { status: 401 });
    }

    if (!session.user.subscription) {
      return NextResponse.json({ msg: "Cannot find a valid subscription plan for this user." }, { status: 400 });
    }

    // Update subscription status
    const subscriptionParts = session.user.subscription.split(";");
    const plan_name = subscriptionParts[0];
    const end_date = new Date(subscriptionParts[1]).toISOString();

    const subscription = `${plan_name};${end_date};active`;

    console.log("Subscription:", subscription);
    // Create organization
    const organization: Organization = {
      name: org_name,
      metadata: {
        subscription,
      },
      enabled_connections: [
        {
          connection_id: dbConnection.data[0].id,
          assign_membership_on_login: false,
        },
        {
          connection_id: socialConnection.data[0].id,
          assign_membership_on_login: false,
        },
      ],
    };

    console.log("Organization:", organization);

    const newOrg = await createOrganization(organization);

    console.log("New organization:", newOrg);

    const org_id = newOrg.data.id;

    console.log("Organization ID:", org_id);

    // Add user to the organization
    await addMembers(org_id, [user_id]);

    // Assign the user the admin role
    await addMemberRoles(org_id, user_id, [adminRole.id]);

    // Update user metadata
    const app_metadata = { subscription };
    // TODO
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updatedUser = await updateAppMetadata(user_id, app_metadata);

    return NextResponse.json(newOrg, { status: 200 });
  } catch (error) {
    console.error("Failed to create organization:", error);

    if (error instanceof Error) {
      // TODO
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ("statusCode" in error && (error as any).statusCode === 400) {
        return NextResponse.json(
          {
            msg:
              "Invalid organization name. It may contain lowercase alphabetical characters, numbers, underscores (_), and dashes (-). Can start with a number. Must be between 3 and 50 characters.",
          },
          { status: 400 }
        );
      }

      // TODO
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ("statusCode" in error && (error as any).statusCode === 404) {
        return NextResponse.json({ msg: "Failed to create organization." }, { status: 404 });
      }

      // TODO
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ("statusCode" in error && (error as any).statusCode === 409) {
        // TODO
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return NextResponse.json({ msg: (error as any).message }, { status: 409 });
      }

      return NextResponse.json({ msg: `Internal error: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ msg: "Internal error. Please try again later." }, { status: 500 });
  }
});
