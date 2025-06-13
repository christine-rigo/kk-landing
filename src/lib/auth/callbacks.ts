import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"

export const jwtCallback = async ({ token, user }: { token: JWT, user: any }) => {
  if (user) {
    token.id = user.id;
    token.email = user.email;
  }
  return token;
};

export const sessionCallback = async ({ session, token }: { session: Session, token: JWT }) => {
  if (session?.user) {
    session.user.id = token.id as string;
    session.user.email = token.email as string;
  }
  return session;
};