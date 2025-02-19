"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/global/loading-spinner";
import { useUserRole } from "@/hooks/useUserRole";

export default function PortalPage() {
  const router = useRouter();

  const { role, isAuthenticated } = useUserRole();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    console.log("Role Inside of base page", role);
    if (role === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/dashboard");
    }

    setLoading(false);
  }, [router, role, isAuthenticated]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );

  return null; // Redirecting, so nothing is rendered
}
