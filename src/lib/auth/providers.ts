import CredentialsProvider from "next-auth/providers/credentials";
import { AuthError } from "./errors";
import { supabase } from "@/lib/supabase";

export const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  authorize: async (credentials): Promise<any> => {
    if (!credentials?.email || !credentials?.password) {
      throw new AuthError("Missing email or password");
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email as string,
        password: credentials.password as string,
      });

      if (error) throw new AuthError(error.message);

      if (data.user) {
        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.full_name,
          image: data.user.user_metadata.avatar_url,
        };
      }
      throw new AuthError("Authentication failed");
    } catch (error) {
      console.error("Error during authentication:", error);
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError("An unexpected error occurred");
    }
  },
});
