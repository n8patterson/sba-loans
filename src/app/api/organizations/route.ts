import { NextRequest, NextResponse } from "next/server";
import { createOrganization, getOrganizationByName } from "@/lib/auth0/organizations";

export async function POST(req: NextRequest) {
  const { orgName, subscription } = await req.json();

  if (!orgName || !subscription) {
    return NextResponse.json({ error: "orgName and subscription are required." }, { status: 400 });
  }

  try {
    const org = await createOrganization({
      name: orgName,
      metadata: { subscription },
    });
    return NextResponse.json(org, { status: 201 });
  } catch (error) {
    console.error("Error creating organization:", error);
    return NextResponse.json({ error: "Failed to create organization." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgName = searchParams.get("orgName");

  if (!orgName) {
    return NextResponse.json({ error: "orgName is required." }, { status: 400 });
  }

  try {
    const org = await getOrganizationByName(orgName);
    return NextResponse.json(org, { status: 200 });
  } catch (error) {
    console.error("Error fetching organization:", error);
    return NextResponse.json({ error: "Failed to fetch organization." }, { status: 500 });
  }
}
