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

export function LoginForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<"div">>) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
            onClick={() => (signIn ? signIn() : undefined)}
          >
            Login with Discord
            <Image
              src="/icons/discord.svg"
              alt="discord logo"
              width={24}
              height={24}
            />
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#signup" className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
