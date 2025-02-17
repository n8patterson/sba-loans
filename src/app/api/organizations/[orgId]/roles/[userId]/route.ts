import { NextRequest, NextResponse } from "next/server";
import { getMemberRoles } from "@/lib/auth0/roles";

export async function GET(req: NextRequest, { params }: { params: { orgId: string; userId: string } }) {
  // Extract the `orgId` and `userId` from the url path

  if (!params.orgId || !params.userId) {
    return NextResponse.json({ error: "orgId and userId are required." }, { status: 400 });
  }

  try {
    const roles = await getMemberRoles(params.orgId, params.userId);
    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return NextResponse.json({ error: "Failed to fetch roles." }, { status: 500 });
  }
}
