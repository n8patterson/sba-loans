"use client";

import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { slugify } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code } from "@/components/code";
import { Button } from "@/components/ui/button";

import { createOrganization } from "./actions";

export function CreateOrganizationForm() {
  const { toast } = useToast();
  const { user } = useUser();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); // Track submission state

  return (
    <form
      action={async (formData: FormData) => {
        setLoading(true); // Start loading state
        const { error } = await createOrganization(formData);
        setLoading(false); // Stop loading state

        if (error) {
          toast({ variant: "destructive", description: error });
        } else {
          toast({ className: "bg-green", description: "Organization has been created successfully." });
        }
      }}
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input value={user?.email || ""} id="email" placeholder="name@example.com" type="email" disabled readOnly />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="organization_name">Organization Name</Label>
          <Input
            id="organization_name"
            name="organization_name"
            placeholder="Acme Corp"
            type="text"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Slug: <Code>{slugify(name || "Acme Corp")}</Code>
          </p>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Organization"}
        </Button>{" "}
      </div>
    </form>
  );
}
