import NextAuth from "next-auth/next";
import Discord from "next-auth/providers/discord";

const handler = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_APPLICATION_ID,
      clientSecret: process.env.DISCORD_API_TOKEN
    })
  ]
});

export { handler as GET, handler as POST };
