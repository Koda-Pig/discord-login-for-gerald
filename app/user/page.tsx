import { Suspense } from "react";
import UserCardWithParams from "./user-card-with-params";
import { UserCard } from "@/components/user-card";

export default function Page() {
  return (
    <Suspense fallback={<UserCard title="loading.." description="loading.." />}>
      <UserCardWithParams />
    </Suspense>
  );
}
