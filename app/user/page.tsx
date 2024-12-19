import { Suspense } from "react";
import UserCardWithParams from "./user-card-with-params";
import { UserCard } from "@/components/user-card";
import { SignOutButton } from "@/components/sign-out-button";

export default function Page() {
  return (
    <Suspense fallback={<UserCard title="loading.." description="loading.." />}>
      <UserCardWithParams />
      <div className="w-[350px] text-center mt-4">
        <SignOutButton />
      </div>
    </Suspense>
  );
}
