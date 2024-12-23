"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { UserCard } from "@/components/user-card";
import { Web3Login } from "@/components/web3-login";
import { useAccount } from "wagmi";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/components/loading-spinner";

const SUBMIT_ENDPOINT = "https://gerald.celium.network/user-address";

const sendUserData = async ({
  username,
  walletAddress
}: {
  username: string;
  walletAddress: string;
}) => {
  try {
    const response = await fetch(SUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: username,
        address: walletAddress
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.info(`Successfully sent user data: ${data}`);

    return data;
  } catch (error) {
    console.error("Error sending user data:", error);
    throw error;
  }
};

export default function UserCardWithParams() {
  const { data: session, status } = useSession();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const sendData = async () => {
      if (!isConnected || !address || !session?.user?.name) {
        return;
      }

      try {
        await sendUserData({
          username: session.user.name,
          walletAddress: address
        });
      } catch (error) {
        console.error("Failed to send user data:", error);
      }
    };

    sendData();
  }, [isConnected]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "unauthenticated") {
    return (
      <UserCard
        showSignout={false}
        title="I think something went wrong. Try"
        description={
          <>
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
          <span className="font-bold">{session?.user?.name ?? "..."}</span>
        </>
      }
      description={
        <div className="mt-4">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user?.name ?? ""}
              width={128}
              height={128}
              className="mx-auto rounded-full"
            />
          )}
          <Web3Login isDisabled={status !== "authenticated"} />
        </div>
      }
    />
  );
}
