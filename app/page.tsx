import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";

export default function Page() {
  return (
    <Container bg={1}>
      <div className="text-center">
        <h1 className="sr-only">Welcome to Gerald AI™</h1>
        <Image
          src="/images/logo.svg"
          alt="Gerald AI logo"
          width={372}
          height={111}
          priority
          className="mb-16"
        />
        <Button asChild>
          <Link href="/signIn">Sign in</Link>
        </Button>
      </div>
    </Container>
  );
}
