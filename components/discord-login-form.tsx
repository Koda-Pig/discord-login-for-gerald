import { SignInButton } from "./sign-in-button";

export function DiscordLoginForm() {
  return (
    <div className="text-center">
      <h1 className="text-3xl mb-6">Login</h1>
      <p className="mb-14 text-xl">
        Login with Discord using the button below:
      </p>
      <SignInButton />
    </div>
  );
}
