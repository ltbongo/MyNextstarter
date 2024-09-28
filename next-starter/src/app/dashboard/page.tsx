"use client";

import { useSession } from "next-auth/react";
//import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession({
    required: true,    
  });

  // useEffect(() => {
  //   const updateSession = async () => {
  //     await update()
  //   }
  //   updateSession()
  // }, [update])

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not signed in.</p>;
  }

  return (
    <div>
      <h1>Welcome to the dashboard Page</h1>
      <h2>Session Information:</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
