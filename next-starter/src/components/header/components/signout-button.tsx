"use client";

import { signOut } from "next-auth/react";

export function SignOut() {
  const handleSignOut = async (event: React.FormEvent) => {
    event.preventDefault();
    await signOut({ callbackUrl: "/" });
  };

  return (
    <form onSubmit={handleSignOut}>
      <button type="submit">Sign Out</button>
    </form>
  );
}
