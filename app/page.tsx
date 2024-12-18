"use client";

import { LoginForm } from "@/components/login-form";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  console.info("session", session);
  return <LoginForm />;
}
