"use client";

import Link from "next/link";
import { useEffect } from "react";
import { UserCard } from "@/components/user-card";
import { useSearchParams } from "next/navigation";
import { SignInButton } from "@/components/sign-in-button";
import { Web3Login } from "@/components/web3-login";
import { useAccount } from "wagmi";
import { useSession } from "next-auth/react";
import Image from "next/image";

const SUBMIT_ENDPOINT = "https://gerald.celium.network/user-address";

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

export default function UserCardWithParams() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
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
          <span className="font-bold">{session?.user?.name ?? "..."}</span>
          {status === "unauthenticated" && (
            <p className="mt-3 mb-5 text-xl">
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
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user?.name ?? ""}
              width={128}
              height={128}
              className="mx-auto rounded-full"
            />
          )}
          <Web3Login isDisabled={status === "unauthenticated"} />
        </div>
      }
    />
  );
}
