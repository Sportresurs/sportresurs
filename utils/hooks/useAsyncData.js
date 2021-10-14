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
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    requestData();
  }, []);
  return { data, isLoading, error };
}
