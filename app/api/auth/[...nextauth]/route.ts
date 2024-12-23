import NextAuth from "next-auth/next";
import Discord from "next-auth/providers/discord";

const handler = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_APPLICATION_ID!,
      clientSecret: process.env.DISCORD_API_TOKEN!,
      profile(profile) {
        let imgUrl = undefined;
        if (profile.id && profile.avatar) {
          imgUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`;
        }
        return {
          ...profile,
          id: profile.id,
          name: profile.global_name ?? profile.username,
          image: imgUrl
        };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signIn"
  }
});

export { handler as GET, handler as POST };
