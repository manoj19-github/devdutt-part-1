import { convexAuth } from "@convex-dev/auth/server";
import GithubProvider from "@auth/core/providers/github";
import GoogleProvider from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
export const { auth, signIn, signOut, store } = convexAuth({
  providers: [GithubProvider, GoogleProvider, Password],
});
