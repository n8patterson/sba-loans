import { NextRequest, NextResponse } from "next/server";
import { getUser, updateAppMetadata } from "@/lib/auth0/auth0-okta-utils";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const userId = params.userId;
  const user = await getUser(userId);
  return user ? NextResponse.json(user) : NextResponse.json({ error: "User not found" }, { status: 404 });
}

export async function PATCH(req: NextRequest, { params }: { params: { userId: string } }) {
  const userId = params.userId;
  const updates = await req.json();
  const updatedUser = await updateAppMetadata(userId, updates);
  return NextResponse.json(updatedUser);
}

// export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
//   const userId = params.userId;
//   await deleteUserFromDatabase(userId); // Replace with actual logic
//   return NextResponse.json({ success: true });
// }
