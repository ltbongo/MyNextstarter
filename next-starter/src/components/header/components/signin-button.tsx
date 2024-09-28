"use client";

// //import { signOut } from "@/auth";
// import { signIn } from "next-auth/react";
// export function SignIn() {
//   const handleSignIn = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const result = await signIn("credentials", { callbackUrl: "/contact" });
//     if (result?.error) {
//       console.error('Login failed:', result.error);
//     } else {
//       // Force a client-side state update by navigating to the same page
//     }
//    // router.push("/contact"); // Redirect to home page after sign out
//   };
//   return (
//     <form onSubmit={handleSignIn}>
//       <button type="submit">Sign In</button>
//     </form>
//   );
// }
import Link from "next/link";

const SignInButton = () => {
  return (
    <Link href="/signin">
      <button>Sign In</button>
    </Link>
  );
};

export default SignInButton;
