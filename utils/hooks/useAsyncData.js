import { useEffect, useState } from "react";

export default function useAsyncData(method) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function requestData() {
      setLoading(true);
      try {
        const resData = await method();
        setData(resData);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    }
    requestData();
  }, []);
  return { data, isLoading, error };
}
