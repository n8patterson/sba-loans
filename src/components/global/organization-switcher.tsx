"use client";

import { useRouter } from "next/navigation";
import { Check, PlusCircle, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarMenuButton } from "@/components/ui/sidebar";
interface Organization {
  id: string;
  slug: string;
  displayName: string;
  logoUrl?: string;
}

interface OrganizationSwitcherProps {
  organizations: Organization[];
  currentOrgId: string;
}
export function OrganizationSwitcher({ organizations, currentOrgId }: OrganizationSwitcherProps) {
  const router = useRouter();

  const currentOrg = organizations.find((org) => org.id === currentOrgId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          {currentOrg ? (
            <>
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={currentOrg.logoUrl} alt={currentOrg.displayName} />
                <AvatarFallback className="rounded-sm">{currentOrg.displayName[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-left text-sm leading-tight md:block max-w-xs truncate">
                <span className="min-w-16 truncate text-left">{currentOrg.displayName}</span>
              </div>
            </>
          ) : (
            <span className="text-muted-foreground">Select an organization</span>
          )}
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[280px] rounded-xl p-0">
        <Command>
          <CommandInput placeholder="Search organizations..." />
          <CommandEmpty>No organizations found.</CommandEmpty>

          <ScrollArea className="max-h-60">
            <CommandList>
              <CommandGroup heading="Organizations">
                {organizations.map((org) => (
                  <CommandItem
                    key={org.id}
                    onSelect={() => {
                      router.push(`/api/auth/login?organization=${org.id}&returnTo=/dashboard`);
                      setOpen(false);
                    }}
                    className="text-sm flex items-center"
                  >
                    <Avatar className="mr-2 size-8 rounded-sm">
                      <AvatarImage src={org.logoUrl} alt={org.displayName} />
                      <AvatarFallback className="rounded-sm">{org.displayName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="truncate">{org.displayName}</span>
                    {currentOrg?.slug === org.slug && <Check className="ml-auto h-4 w-4 text-primary" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </ScrollArea>

          <CommandSeparator />

          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  router.push("/onboarding/create");
                  setOpen(false);
                }}
                className="cursor-pointer flex items-center"
              >
                <PlusCircle className="mr-2 size-4 text-primary" />
                Create Organization
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
