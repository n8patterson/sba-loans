import { AppSidebar } from "@/components/global/app-sidebar";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarLayout } from "@/components/global/sidebar-layout";
import { Toaster } from "@/components/ui/toaster";
import { appClient, managementClient } from "@/lib/auth0";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await appClient.getSession();

  if (!session) {
    return <>{children}</>;
  }

  const { data: orgs } = await managementClient.users.getUserOrganizations({
    id: session.user.sub,
  });

  // if the user does not belong to any organizations, redirect to onboarding
  if (!orgs.length) {
    redirect("/onboarding/create");
  }

  return (
    <SidebarProvider>
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar
          organizations={orgs.map((o) => ({
            id: o.id,
            slug: o.name,
            displayName: o.display_name!,
            logoUrl: o.branding?.logo_url,
          }))}
          currentOrgId={session.user.org_id}
        />
        <SidebarLayout>{children}</SidebarLayout>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
