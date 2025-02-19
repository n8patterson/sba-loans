import { NextRequest, NextResponse } from "next/server";
import { updateAppMetadata } from "@/lib/auth0/users";
import { appClient } from "@/lib/auth0";

// Allowed subscription plans
const allowedPlans = ["personal", "team", "enterprise"];

// Wrapper for the GET handler with `withApiAuthRequired`
export const GET = appClient.withApiAuthRequired(async (req: NextRequest) => {
  // Extract query parameters
  const { searchParams } = new URL(req.url);
  const plan = searchParams.get("plan")?.toLowerCase() || "";

  if (!allowedPlans.includes(plan)) {
    return NextResponse.json({ error: "Invalid plan name: " + plan }, { status: 400 });
  }

  try {
    const res = new NextResponse();
    const session = await appClient.getSession(req, res);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = session.user.sub;

    // Generate subscription metadata
    const date = new Date();
    date.setFullYear(new Date().getFullYear() + 1);

    const status = "activation";
    const subscription = `${plan};${date.toISOString()};${status}`;
    const app_metadata = { subscription };

    // Update user metadata in Auth0
    const user = await updateAppMetadata(user_id, app_metadata);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Internal error: ", error);

    // Type guard to check if 'error' has 'statusCode' and 'message' properties
    if (error instanceof Error) {
      if ("statusCode" in error && error.statusCode === 404) {
        return NextResponse.json({ msg: "Error updating subscription. User not found" }, { status: 404 });
      }

      return NextResponse.json({ msg: "Error updating subscription: " + error.message }, { status: 500 });
    }

    return NextResponse.json({ msg: "Error updating subscription" }, { status: 500 });
  }
});
