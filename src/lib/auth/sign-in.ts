import { authClient } from "./auth-client";

interface SignInProps {
  email: string; // User's email address
  password: string; // User's password (min 8 characters)
}

export const signIn = async ({ email, password }: SignInProps) => {
  const { data, error } = await authClient.signIn.email(
    {
      email, // user email address
      password, // user password -> min 8 characters by default
      //callbackURL: "/dashboard", // a url to redirect to after the user verifies their email (optional)
    },
    {
      onRequest: (ctx) => {
        //show loading
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    }
  );
  return { data, error };
};
