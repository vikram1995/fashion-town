//import the auth client

import { toast } from "sonner";
import { authClient } from "./auth-client";

interface SignUpProps {
  email: string; // User's email address
  password: string; // User's password (min 8 characters)
  name: string; // User's display name
}

export const signUp = async ({ email, password, name }: SignUpProps) => {
  const { data, error } = await authClient.signUp.email(
    {
      email, // user email address
      password, // user password -> min 8 characters by default
      name, // user display name
      callbackURL: "/", // a url to redirect to after the user verifies their email (optional)
    },
    {
      onRequest: (ctx) => {
        //show loading
      },
      onSuccess: (ctx) => {
        toast.success("Sign up successful");
        //redirect to the dashboard or sign in page
      },
      onError: (ctx) => {
        // display the error message
        toast.error(ctx?.error?.message);
      },
    }
  );
  return { data, error };
};
