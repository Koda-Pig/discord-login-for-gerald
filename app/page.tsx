import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="text-center">
      <h1 className="text-2xl mb-4">Welcome to Gerald AI™</h1>
      <Button asChild>
        <Link href="/signIn">Sign in</Link>
      </Button>
    </div>
  );
}
