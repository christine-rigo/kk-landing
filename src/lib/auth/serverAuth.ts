import { auth } from "@root/auth";
import { redirect } from "next/navigation";

type GetServerAuthOptions = {
  redirectTo?: string;
  returnNull?: boolean;
};

export const getServerAuth = async (options: GetServerAuthOptions = {}) => {
  const session = await auth();

  if (!session) {
    if (options.redirectTo) {
      redirect(options.redirectTo);
    }
    if (options.returnNull) {
      return null;
    }
    // Default behavior: redirect to sign-in page
    redirect("/login");
  }

  return session;
};
