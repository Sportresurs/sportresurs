import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";

export default function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [session] = useSession();

  useEffect(() => {
    if (session) {
      setIsAdmin(true);
    }
  }, [session]);

  return { isAdmin };
}
