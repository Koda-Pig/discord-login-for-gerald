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
    <div className="text-center">
      <h1 className="text-3xl mb-6">{title}</h1>
      <div className="mb-14 text-xl">{description}</div>
      {showSignout ?? <SignOutButton />}
    </div>
  );
}
