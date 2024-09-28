"use client";

import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

import SignInButton from "./signin-button";
import { SignOut } from "./signout-button";

export default function AuthButton() {
  const { status } = useSession();
  console.log("status in authButton.tsx:", status);

  if (status === "loading") {
    return <Button variant="outline">Loading...</Button>;
  }

  if (status === "authenticated") {
    return <SignOut />;
  }

  return <SignInButton />;
}
