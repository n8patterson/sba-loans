import Link from "next/link";
import Image from "next/image";

import { CreateOrganizationForm } from "./create-organization-form";

export default async function Create() {
  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image src="/build-up-icon.png" alt="BuildUp" width={32} height={32} className="mr-4" />
          <span className="font-mono font-medium">SaaStart</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <div className="space-y-1">
              <p className="text-lg">
                BuildUp is a powerful platform designed to help residential and new home builders enhance customer service and improve communication
                with their clients.
              </p>
              <p className="text-lg">
                It provides real-time updates on home construction progress, streamlines project management, and ensures homeowners stay informed
                every step of the way. BuildUp simplifies client interactions, offering transparency and trust throughout the building process.
              </p>
            </div>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your organization name to create an account.</p>
          </div>
          <CreateOrganizationForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
