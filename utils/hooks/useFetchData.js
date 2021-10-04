import { useState, useEffect } from "react";
import { captureException } from "@sentry/nextjs";

const cache = {};

export default function useFetchData(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      if (cache[url]) {
        setData(cache[url]);
      } else {
        try {
          const response = await fetch(url);
          const resData = await response.json();
          cache[url] = resData;
          setData(resData);
        } catch (err) {
          captureException(err);
        }
      }
    };

    fetchData();
  }, [url]);

  return data;
}
