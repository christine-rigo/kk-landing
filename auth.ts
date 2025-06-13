import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (error) throw error;

          const { data: userData, error: userError } = await supabase
            .from("user_information")
            .select("*")
            .eq("id", data.user.id)
            .single();

          if (userError) {
            console.error("Error fetching user data from Supabase:", userError);
            return null;
          }

          return {
            id: data.user.id,
            email: data.user.email,
            name: userData?.username,
            isVerified: userData?.isverified,
            userName: userData?.username,
            avatarUrl: userData?.avatarurl,
            accessToken: data.session?.access_token,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user && user.id) {
        token.id = user.id;
        token.isVerified = user.isVerified;
        token.userName = user.userName;
        token.avatarUrl = user.avatarUrl;
        token.accessToken = user.accessToken;
      }
      if (session && session.user?.id) {
        if (trigger === "update") {
          const { data: userData, error } = await supabase
            .from("user_information")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (error) {
            console.error("Error fetching updated user data from Supabase:", error);
          } else if (userData) {
            token.avatarUrl = userData.avatarurl;
            token.userName = userData.username;
            token.isVerified = userData.isverified;
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.userName = token.userName as string;
        session.user.avatarUrl = token.avatarUrl as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
});
