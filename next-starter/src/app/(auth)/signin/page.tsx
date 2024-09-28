//import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";
//import { redirect } from "next/navigation";

export default async function SignInPage() {
  // const session = await auth();

  // if (session) {
  //   return redirect("/dashboard");
  // }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <LoginForm />
    </div>
  );
}
