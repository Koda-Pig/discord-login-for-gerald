import * as React from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page({ params }) {
  const { id } = params;

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Hello {id}</CardTitle>

        <CardDescription>Put something here probably</CardDescription>
      </CardHeader>
      <CardContent>{/* <Image src='/' alt="" /> */}</CardContent>
    </Card>
  );
}
