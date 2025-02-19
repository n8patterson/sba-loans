"use client";

import { Mail } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { resendVerificationEmail } from "./actions";

export default function Verify() {
  const { toast } = useToast();

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="size-5" />
          <span>Verify your e-mail</span>
        </CardTitle>
        <CardDescription>Please check your inbox for a verification link to continue creating your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={async () => {
            const { error } = await resendVerificationEmail();

            if (error) {
              toast({ variant: "destructive", description: error });
              return;
            }

            toast({ className: "bg-green", description: "The verification e-mail has successfully been sent. Please check your inbox." });
          }}
        >
          <Button type="submit" className="w-full">
            Resend Verification
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
