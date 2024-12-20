"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserCard } from "@/components/user-card";
import { useSearchParams } from "next/navigation";
import { SignInButton } from "@/components/sign-in-button";
import { Web3Login } from "@/components/web3-login";
import { useAccount } from "wagmi";

const SUBMIT_ENDPOINT = "https://gerald.celium.network/user-address";

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
      mode: "no-cors",
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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!code || userData) return;

    const fetchData = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        await handleOAuthCallback({
          code,
          setUserData: (data) => {
            setUserData(data);
            if (!data) setHasError(true);
          }
        });
        // eslint-disable-next-line
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
          <span className="font-bold">{userData?.user?.username ?? "..."}</span>
          {hasError && !isLoading && userData === null && (
            <p className="mt-3 mb-5">
              I think something went wrong. Try{" "}
              <Link
                href="/signIn"
                className="group text-sky-600 transition duration-300 inline-block"
              >
                sign in
                <span
                  className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"
                  aria-hidden="true"
                />
              </Link>{" "}
              again
            </p>
          )}
        </>
      }
      description={
        <div className="mt-4">
          <Web3Login isDisabled={!userData} />
        </div>
      }
    />
  );
}
