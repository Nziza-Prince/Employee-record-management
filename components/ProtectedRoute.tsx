"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if explicitly unauthenticated
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Show loading state while checking
  if (status === "loading") {
    return <div className="flex h-screen items-center justify-center">
      <div className="text-lg">Loading...</div>
    </div>;
  }

  // Only render children if authenticated
  return status === "authenticated" ? <>{children}</> : null;
};

export default ProtectedRoute;