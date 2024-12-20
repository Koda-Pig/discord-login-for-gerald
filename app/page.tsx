import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { Web3Login } from "@/components/web3-login";

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
          priority
          className="mb-16"
        />
        <Button asChild>
          <Link href="/signIn">Sign in</Link>
        </Button>

        <Web3Login />
      </div>
    </Container>
  );
}
