import NextAuth from "next-auth/next";
import Discord from "next-auth/providers/discord";

const handler = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_APPLICATION_ID!,
      clientSecret: process.env.DISCORD_API_TOKEN!,
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXTAUTH_URL}/user`
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signIn"
  },
  debug: true,
  logger: {
    error(code, ...message) {
      console.error('[next-auth][error]', { code, message });
    },
    warn(code, ...message) {
      console.warn('[next-auth][warn]', { code, message });
    },
    debug(code, ...message) {
      console.log('[next-auth][debug]', { code, message });
    },
  }
});

export { handler as GET, handler as POST };
