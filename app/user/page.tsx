"use client";

// import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function Page() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          {code ? (
            <>
              Hello{" "}
              <span className="break-words bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {code}
              </span>
            </>
          ) : (
            <>I&apos; afraid I have no idea who you are</>
          )}
        </CardTitle>

        <CardDescription>Put something here probably</CardDescription>
      </CardHeader>
      <CardContent>{/* <Image src='/' alt="" /> */}</CardContent>
    </Card>
  );
}
