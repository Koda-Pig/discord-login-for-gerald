"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  const handleDiscordSignOut = () => signOut({ callbackUrl: "/" });

  return (
    <Button className="w-full" onClick={handleDiscordSignOut}>
      Sign out
    </Button>
  );
}
