import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { SignOutButton } from "@/components/sign-out-button";

interface UserCardProps {
  title: string | React.ReactNode;
  description: string;
}

export function UserCard({ title, description }: Readonly<UserCardProps>) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <SignOutButton />
      </CardContent>
    </Card>
  );
}
