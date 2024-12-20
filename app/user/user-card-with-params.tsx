"use client";

import { useEffect, useState } from "react";
import { UserCard } from "@/components/user-card";
import { useSearchParams } from "next/navigation";
import { SignInButton } from "@/components/sign-in-button";
import { Web3Login } from "@/components/web3-login";
import { useAccount } from "wagmi";

const SUBMIT_ENDPOINT = "http://34.57.39.86:3000/user-address";

interface DiscordUser {
  user: {
    id: string;
    username: string;
    global_name: string;
    avatar: string;
  };
}

const sendUserData = async ({
  username,
  walletAddress
}: {
  username: string;
  walletAddress: string;
}) => {
  try {
    const body = JSON.stringify({
      user: username,
      address: walletAddress
    });

    const response = await fetch(SUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    alert(`Successfully sent user data: ${data}`);
    return data;
  } catch (error) {
    console.error("Error sending user data:", error);
    throw error;
  }
};

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
  const [dataSent, setDataSent] = useState(false);

  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!code || userData) return;
    handleOAuthCallback({ code, setUserData: (data) => setUserData(data) });
  }, [code]);

  useEffect(() => {
    const sendData = async () => {
      if (
        !isConnected ||
        !address ||
        !userData?.user?.global_name ||
        dataSent
      ) {
        return;
      }

      try {
        await sendUserData({
          username: userData.user.global_name,
          walletAddress: address
        });
        setDataSent(true);
      } catch (error) {
        console.error("Failed to send user data:", error);
      }
    };

    sendData();
  }, [isConnected]);

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
            <strong>your username</strong>:{" "}
            {userData?.user?.username ?? "loading..."}
          </p>
          <p>
            <strong>your global_name</strong>:{" "}
            {userData?.user?.global_name ?? "loading..."}
          </p>

          <Web3Login isDisabled={false} />
        </div>
      }
    />
  );
}
