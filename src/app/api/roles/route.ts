import { NextResponse } from "next/server";
import { getAllRoles } from "@/lib/auth0/roles";

export async function GET() {
  try {
    const roles = await getAllRoles();
    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return NextResponse.json({ error: "Failed to fetch roles." }, { status: 500 });
  }
}
