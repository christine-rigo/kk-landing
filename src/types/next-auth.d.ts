import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isVerified: boolean;
      userName: string;
      avatarUrl: string;
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User {
    isVerified: boolean;
    userName: string;
    avatarUrl: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isVerified: boolean;
    userName: string;
    avatarUrl: string;
  }
}
