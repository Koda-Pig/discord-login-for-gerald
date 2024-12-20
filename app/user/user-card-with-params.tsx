"use client";

import { useEffect, useState } from "react";
import { UserCard } from "@/components/user-card";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const handleOAuthCallback = async ({
  code,
  setUserData
}: {
  code: string;
  setUserData: (x: unknown) => void;
}) => {
  try {
    const response = await fetch("/api/auth/discord/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    });

    if (!response.ok) {
      // console.error("Login failed. Response: ", response);
      // setUserData(response);
      return undefined;
    }

    const data = await response.json();
    // console.log("Logged in user: ", data.user);
    setUserData(data);
    return data;
  } catch (error) {
    // console.error(error);
    setUserData(error);
  }
};

export default function UserCardWithParams() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { data: session, status } = useSession();

  // console.log("session: ", session);
  // console.log("status: ", status);

  const [userData, setUserData] = useState<unknown>(null);

  useEffect(() => {
    if (!code) return;
    handleOAuthCallback({ code, setUserData: (data) => setUserData(data) });
  }, [code]);

  if (!code) {
    return (
      <UserCard
        title={"I'm afraid I have no idea who you are"}
        description="Try login again maybe?"
      />
    );
  }

  return (
    <UserCard
      title={
        <>
          Hello{" "}
          <span className="break-words bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent">
            {code}
          </span>
        </>
      }
      description={JSON.stringify(userData)}
    />
  );
}
