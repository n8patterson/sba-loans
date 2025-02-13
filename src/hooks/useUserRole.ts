"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export function useUserRole() {
  const { user, isAuthenticated } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [organization, setOrganization] = useState<string | null>(null);

  useEffect(() => {
    if (user && isAuthenticated) {
      console.log("User", user);
      // Fetch roles from user metadata
      const userRole = user["https://your-app.com/roles"] || "user";
      const org = user["https://your-app.com/organization"] || "default";

      setRole(userRole as string);
      setOrganization(org as string);
    }
  }, [user, isAuthenticated]);

  return { role, organization, isAuthenticated };
}
