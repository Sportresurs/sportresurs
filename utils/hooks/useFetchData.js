import { useState, useEffect } from "react";
import { captureException } from "@sentry/nextjs";

export default function useFetchData(url, defaultValue) {
  const [data, setData] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (!url) return;
    let isMounted = true;
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const resData = await response.json();
        if (isMounted) {
          setData(resData);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          captureException(err);
          setErrorMsg(err.message);
          setIsLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [url]);

  return [data, isLoading, errorMsg];
}
