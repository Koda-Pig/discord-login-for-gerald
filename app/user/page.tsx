import { Suspense } from "react";
import UserCardWithParams from "./user-card-with-params";
import { UserCard } from "@/components/user-card";
import { Container } from "@/components/container";
import { AuthButton } from "@/components/auth-button";

export default function Page() {
  return (
    <Container bg={2}>
      <Suspense
        fallback={<UserCard title="loading.." description="loading.." />}
      >
        <UserCardWithParams />
      </Suspense>
      <AuthButton />
    </Container>
  );
}
