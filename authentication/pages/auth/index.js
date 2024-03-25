import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import AuthForm from "../../components/auth/auth-form";

function AuthPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    router.replace("/").catch((error) => {
      console.error("An error occurred while redirecting:", error);
    });
  }

  if (status === "loading") {
    return <p className="center">Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
