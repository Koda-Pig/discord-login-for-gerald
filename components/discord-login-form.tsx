import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { SignInButton } from "./sign-in-button";

export function DiscordLoginForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Login with Discord using the button below:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInButton />
      </CardContent>
    </Card>
  );
}
