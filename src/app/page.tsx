import { appClient } from "@/lib/auth0";
// import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { Auth0Logo } from "@/components/auth0-logo";
import { SignUpForm } from "@/components/global/signup-form";
import { WelcomeBackCard } from "@/components/global/welcome-back-card";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await appClient.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Auth Buttons */}
      <div className="absolute right-4 top-4 md:right-8 md:top-8 flex items-center gap-2">
        {session ? (
          <Button asChild variant="ghost">
            <a href="/api/auth/logout">Logout</a>
          </Button>
        ) : (
          <>
            <span className="text-sm">Already joined?</span>
            <Button asChild>
              <a href="/api/auth/login">Log in</a>
            </Button>
          </>
        )}
      </div>

      {/* Left Panel - SaaS Info */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-black" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image src="/build-up-icon.png" alt="BuildUp Logo" width={32} height={32} className="mr-4" />
          <span className="font-semibold">BuildUp</span>
        </div>
        <div className="relative z-20 m-auto max-w-md text-center">
          <Card className="bg-transparent border-none shadow-none text-white">
            <CardHeader>
              <CardTitle>BuildUp</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">
                BuildUp is a powerful platform designed to help residential home builders enhance customer service and streamline communication with
                their clients.
              </p>
              <Separator className="my-4" />
              <p className="text-lg">
                With BuildUp, builders can provide real-time updates on home construction progress, improve transparency, and ensure homeowners stay
                informed throughout the entire building process.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Panel - Sign Up / Welcome */}
      <div className="flex h-screen items-center justify-center lg:p-8">{session ? <WelcomeBackCard /> : <SignUpForm />}</div>
    </div>
  );
}
