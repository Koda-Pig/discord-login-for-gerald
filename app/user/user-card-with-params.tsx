"use client";

import { UserCard } from "@/components/user-card";
import { useSearchParams } from "next/navigation";

export default function UserCardWithParams() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  return (
    <UserCard
      title={
        code ? (
          <>
            Hello{" "}
            <span className="break-words bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {code}
            </span>{" "}
          </>
        ) : (
          <>I&apos; afraid I have no idea who you are</>
        )
      }
      description="Put something here probably"
    />
  );
}
