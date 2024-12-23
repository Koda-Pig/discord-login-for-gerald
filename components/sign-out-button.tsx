"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface SignOutButtonProps {
  className?: string;
}

export function SignOutButton({
  className = "w-full"
}: Readonly<SignOutButtonProps>) {
  const handleDiscordSignOut = () => signOut({ callbackUrl: "/" });

  return (
    <Button className={className} onClick={handleDiscordSignOut}>
      sign out
    </Button>
  );
}
