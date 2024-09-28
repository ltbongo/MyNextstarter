"use client";

import { Login } from "@/app/actions/user.actions";
import { LoginSchema } from "@/app/schemas/login-schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CardWrapper } from "./card-wrapper";


export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use" : "";
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
  
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
        Login(values).then((data) => {
            if (data?.success) {
            setSuccess(data.success);
            } else {
            setError(data?.error || "Something went wrong");
            }
        });
        });
    };
    
    return (
        <CardWrapper
            headerLabel="Login"
            backButtonLabel="Don't have an account?"
            backButtonHref="/signup"
            showSocial={false} //TODO: Add social login change to true when implemented
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="space-y-4">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending} 
                                        {...field} 
                                        placeholder="JohnDoe@example.com"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending} 
                                        {...field} 
                                        placeholder="********"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success || ""} />
                    <Button
                        variant="outline"
                        disabled={isPending} 
                        type="submit" 
                        className="w-full"
                    >
                        Login
                    </Button>
                </form>
            </Form>
            <div className="mt-4 flex justify-center">
              <Link
                href="/reset-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
        </CardWrapper>
    );
};

