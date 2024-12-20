"use client";

import { useEffect, useState } from "react";
import { UserCard } from "@/components/user-card";
import { useSearchParams } from "next/navigation";
import { SignInButton } from "@/components/sign-in-button";

interface DiscordUser {
  user: {
    id: string;
    username: string;
    global_name: string;
    avatar: string;
  };
}

const handleOAuthCallback = async ({
  code,
  setUserData
}: {
  code: string;
  setUserData: (x: null | DiscordUser) => void;
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
      console.error("Login failed. Response: ", response);
      setUserData(null);
      return;
    }

    const data = await response.json();
    setUserData(data);
  } catch (error) {
    console.error(error);
  }
};

export default function UserCardWithParams() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [userData, setUserData] = useState<DiscordUser | null>(null);

  useEffect(() => {
    if (!code) return;
    handleOAuthCallback({ code, setUserData: (data) => setUserData(data) });
  }, [code]);

  if (!code) {
    return (
      <UserCard
        showSignout={false}
        title="I'm afraid I have no idea who you are"
        description={
          <>
            <p className="mb-4">Try login again maybe?</p>
            <SignInButton />
          </>
        }
      />
    );
  }

  return (
    <UserCard
      title={
        <>
          Hello{" "}
          <span className="break-words bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent">
            {userData?.user?.username ?? "loading..."}
          </span>
        </>
      }
      description={
        <div className="mt-4">
          <p>
            <strong>your ID</strong>: {userData?.user?.id ?? "loading..."}
          </p>
          <p>
            <strong>your username</strong>:{" "}
            {userData?.user?.username ?? "loading..."}
          </p>
          <p>
            <strong>your global_name</strong>:{" "}
            {userData?.user?.global_name ?? "loading..."}
          </p>
          <p>
            <strong>your avatar</strong>:{" "}
            {userData?.user?.avatar ?? "loading..."}
          </p>
        </div>
      }
    />
  );
}
