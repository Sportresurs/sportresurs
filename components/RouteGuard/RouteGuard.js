import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

function RouteGuard({ children }) {
  const router = useRouter();
  const [session] = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, []);

  return children;
}

export default RouteGuard;
