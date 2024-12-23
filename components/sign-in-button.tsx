"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SignInButton() {
  const handleDiscordSignIn = () => {
    signIn("discord", { callbackUrl: "/user" });
  };

  return (
    <Button type="button" onClick={handleDiscordSignIn}>
      sign in with discord
      <Image
        src="/icons/discord.svg"
        alt="discord logo"
        width={24}
        height={24}
      />
    </Button>
  );
}
