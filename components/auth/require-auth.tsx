"use client";

import { useEffect, useState, PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "@/lib/auth";

type Props = PropsWithChildren<{
  requireRole?: string; 
  redirectIfUnauthorized?: string; 
}>;

export default function RequireAuth({ children, requireRole, redirectIfUnauthorized = "/" }: Props) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const u = getUserFromToken();
    if (!u) {
      
      router.replace("/login");
      setAllowed(false);
      return;
    }
    if (requireRole && u.role !== requireRole) {
      
      router.replace(redirectIfUnauthorized || "/");
      setAllowed(false);
      return;
    }
    setAllowed(true);
  }, [router, requireRole, redirectIfUnauthorized]);

  if (allowed === null) {
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#8A252C]" />
      </div>
    );
  }

  if (!allowed) return null; 

  return <>{children}</>;
}
