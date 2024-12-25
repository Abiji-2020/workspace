// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    // Add your authentication providers (e.g., Google, GitHub, etc.)
  ],
  pages: {
    signIn: '/auth',  // This will redirect to the /auth page, not the default sign-in page
  },
});
