import { NextRequest, NextResponse } from "next/server";
import { getMemberRoles, addMemberRoles, removeMemberRoles } from "@/lib/auth0/roles";

export async function GET(req: NextRequest) {
  // Extract the `orgId` and `userId` from the query parameters
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");
  const userId = searchParams.get("userId");

  if (!orgId || !userId) {
    return NextResponse.json({ error: "orgId and userId are required." }, { status: 400 });
  }

  try {
    const roles = await getMemberRoles(orgId, userId);
    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return NextResponse.json({ error: "Failed to fetch roles." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // Extract the `orgId` and `userId` from the query parameters
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");
  const userId = searchParams.get("userId");

  if (!orgId || !userId) {
    return NextResponse.json({ error: "orgId and userId are required." }, { status: 400 });
  }

  try {
    const { roles } = await req.body.json();
    await addMemberRoles(orgId, userId, roles);
    return NextResponse.json({ message: "Roles added successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error adding roles:", error);
    return NextResponse.json({ error: "Failed to add roles." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  // Extract the `orgId` and `userId` from the query parameters
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");
  const userId = searchParams.get("userId");

  if (!orgId || !userId) {
    return NextResponse.json({ error: "orgId and userId are required." }, { status: 400 });
  }

  try {
    const { roles } = await req.body.json();
    await removeMemberRoles(orgId, userId, roles);
    return NextResponse.json({ message: "Roles removed successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error removing roles:", error);
    return NextResponse.json({ error: "Failed to remove roles." }, { status: 500 });
  }
}
