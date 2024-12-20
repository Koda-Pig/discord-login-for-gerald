import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import Image from "next/image";

export default function Page() {
  return (
    <Container bgImgClass="bg-screen-1">
      <div className="text-center">
        <h1 className="sr-only">Welcome to Gerald AI™</h1>
        <Image
          src="/images/logo.svg"
          alt="Gerald AI logo"
          width={372}
          height={111}
          className="mb-16"
        />
        <Button asChild>
          <Link href="/signIn">Sign in</Link>
        </Button>
      </div>
    </Container>
  );
}
