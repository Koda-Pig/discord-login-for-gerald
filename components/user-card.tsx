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
  description: string | React.ReactNode;
  showSignout?: boolean;
}

export function UserCard({
  title,
  description,
  showSignout = true
}: Readonly<UserCardProps>) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {showSignout ?? (
        <CardContent>
          <SignOutButton />
        </CardContent>
      )}
    </Card>
  );
}
