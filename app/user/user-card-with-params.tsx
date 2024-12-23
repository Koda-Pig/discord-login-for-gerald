"use client";

import Link from "next/link";
import Image from "next/image";
import { UserCard } from "@/components/user-card";
import { Web3Login } from "@/components/web3-login";
import { useAccountEffect } from "wagmi";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useMutation } from "@tanstack/react-query";

const SUBMIT_ENDPOINT = "https://gerald.celium.network/user-address";

interface UserData {
  username: string;
  walletAddress: string;
}

const sendUserData = async ({ username, walletAddress }: UserData) => {
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

    return response.json();
  } catch (error) {
    console.error("Error in sendUserData: ", error);
  }
};

export default function UserCardWithParams() {
  const { data: session, status } = useSession();

  const mutation = useMutation({
    mutationFn: sendUserData,
    onSuccess: (data) => {
      console.info("Successfully sent user data: ", data);
    },
    onError: (error) => {
      console.error("Failed to send user data: ", error);
    },
    retry: 3,
    retryDelay: 1000
  });

  useAccountEffect({
    onConnect(data) {
      if (!session?.user?.name) {
        console.error("User name not found: ", session?.user);
        return;
      }
      mutation.mutate({
        username: session.user.name,
        walletAddress: data.address
      });
    }
  });

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
