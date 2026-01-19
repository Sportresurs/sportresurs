import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

function RouteGuard({ children }) {
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (loading) return;
    
    if (!session) {
      router.push("/login");
    }
  }, [session, loading, router]);

  if (loading) {
    return null;
  }

  return children;
}

export default RouteGuard;
