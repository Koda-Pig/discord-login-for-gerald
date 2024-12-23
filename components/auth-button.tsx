"use client";

import { SignOutButton } from "./sign-out-button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

const SignIn = () => (
  <Button asChild>
    <Link href="/signIn">sign in</Link>
  </Button>
);

const SignOut = () => <SignOutButton className="" />;

export function AuthButton() {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <div className="fixed top-2 right-2 z-10">
      {isLoggedIn ? <SignOut /> : <SignIn />}
    </div>
  );
}
