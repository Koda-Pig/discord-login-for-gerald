import { DiscordLoginForm } from "@/components/discord-login-form";
import { Container } from "@/components/container";

export default function Page() {
  return (
    <Container bg={2}>
      <DiscordLoginForm />
    </Container>
  );
}
