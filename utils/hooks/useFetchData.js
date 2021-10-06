import { useState, useEffect } from "react";
import { captureException } from "@sentry/nextjs";

export default function useFetchData(url) {
  const [data, setData] = useState([], null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (!url) return;
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const resData = await response.json();
        setData(resData);
        setIsLoading(false);
      } catch (err) {
        captureException(err);
        setErrorMsg(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, isLoading, errorMsg];
}
