import { NextRequest, NextResponse } from "next/server";
import { getRole } from "@/lib/auth0/roles";

export async function GET(req: NextRequest) {
  // Extract the `roleId` from the query parameters
  const { searchParams } = new URL(req.url);
  const roleId = searchParams.get("roleId");

  if (!roleId) {
    return NextResponse.json({ error: "roleId is required." }, { status: 400 });
  }

  try {
    const role = await getRole(roleId);
    return NextResponse.json(role, { status: 200 });
  } catch (error) {
    console.error("Error fetching role:", error);
    return NextResponse.json({ error: "Failed to fetch role." }, { status: 500 });
  }
}
