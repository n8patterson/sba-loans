"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export function useUserRole() {
  const { user } = useUser();
  const [role, setRole] = useState<string | null>(null);
  const [organization, setOrganization] = useState<string | null>(null);
  const isAuthenticated = user && user.sub;

  useEffect(() => {
    const fetchRoles = async () => {
      console.log("Inside Fetch Roles");
      console.log("User", user);
      console.log("Is Authenticated", isAuthenticated);
      console.log("User Sub", user?.sub);
      console.log("User Org Id", user?.org_id);

      if (user && isAuthenticated && user?.sub && user?.org_id) {
        console.log("User", user);
        // Fetch roles from user metadata
        console.log("User", user);
        console.log("User Sub", user.sub);
        console.log("User Org Id", user.org_id);
        const userRole = await fetch(`/api/organizations/${user.org_id}/roles/${user.sub}`);
        const org = user["https://your-app.com/organization"] || "default";

        console.log("User Role", userRole);
        // TODO: Remove unknown
        setRole((userRole as unknown) as string);
        setOrganization(org as string);
      }
    };

    console.log("Before Fetch Roles");
    fetchRoles();

    return () => {
      setRole(null);
      setOrganization(null);
    };
  }, [user, isAuthenticated]);

  return { role, organization, isAuthenticated };
}
