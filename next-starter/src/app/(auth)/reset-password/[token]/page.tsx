// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";

// import { CardWrapper } from "@/components/auth/card-wrapper";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Toast } from "@/components/ui/toast";

// export default function ResetPasswordConfirm({
//   params,
// }: {
//   params: { token: string };
// }) {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const router = useRouter();
//   const { token } = params;

//   const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       Toast({ title: "Passwords do not match", variant: "destructive" });
//       return;
//     }

//     try {
//       const response = await fetch("/api/reset-password-confirm", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token, password }),
//       });

//       if (response.ok) {
//         Toast({ title: "Password reset successfully", variant: "default" });
//         router.push("/signin");
//       } else {
//         throw new Error("Failed to reset password");
//       }
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       Toast({ title: "Error resetting password", variant: "destructive" });
//     }
//   };

//   return (
//     <CardWrapper headerLabel="Reset Password" backButtonLabel="Back to signin" backButtonHref="/signin">
//       <form onSubmit={handleResetPassword}>
//         <Input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="New password"
//         required
//       />
//       <Input
//         type="password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         placeholder="Confirm new password"
//         required
//       />
//       <Button type="submit">Reset Password</Button>
//     </form>
//     </CardWrapper>
//   );
// }

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ResetConfirmSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function ResetPasswordConfirm({
  params,
}: {
  params: { token: string };
}) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { token } = params;

  const form = useForm<z.infer<typeof ResetConfirmSchema>>({
    resolver: zodResolver(ResetConfirmSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetConfirmSchema>) => {
    setError("");
    setSuccess("");
    setIsPending(true);

    console.log(values);
    console.log(token);

    try {
      const response = await fetch("/api/reset-password-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken: token, password: values.password }),
      });

      if (response.ok) {
        setSuccess("Password reset successfully");

        setTimeout(() => router.push("/signin"), 2000);
      } else {
        throw new Error("Failed to reset password");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Error resetting password");

    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <CardWrapper
        headerLabel="Reset Password"
      backButtonLabel="Back to signin"
      backButtonHref="/signin"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="••••••••"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="••••••••"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || ""} />
          <FormSuccess message={success || ""} />
          <Button
            variant="outline"
            disabled={isPending}
            type="submit"
            className="w-full"
          >
            Reset Password
          </Button>
        </form>
      </Form>
      </CardWrapper>
    </div>
  );
}