"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { signIn } from "next-auth/react";

export function DiscordLoginForm({
  className
}: Readonly<React.ComponentPropsWithoutRef<"div">>) {
  const handleDiscordSignIn = () => {
    signIn("discord", { callbackUrl: "/user" });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Login with Discord using the button below:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            type="button"
            onClick={handleDiscordSignIn}
          >
            Login with Discord
            <Image
              src="/icons/discord.svg"
              alt="discord logo"
              width={24}
              height={24}
            />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
