import Image from "next/image";
import { SignInButton } from "@/components/sign-in-button";

export default function Page() {
  return (
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
      <SignInButton />
    </div>
  );
}
