import NextAuth from "next-auth/next";
import Discord from "next-auth/providers/discord";

const handler = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_APPLICATION_ID as string,
      clientSecret: process.env.DISCORD_API_TOKEN as string
    })
  ]
});

export { handler as GET, handler as POST };
