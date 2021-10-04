import { useState, useEffect } from "react";

const cache = {};

export default function useFetchData(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      if (cache[url]) {
        setData(cache[url]);
      } else {
        const response = await fetch(url);
        const resData = await response.json();
        cache[url] = resData;
        setData(resData);
      }
    };

    fetchData();
  }, [url]);

  return data;
}
