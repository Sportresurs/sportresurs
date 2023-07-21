import { useCallback, useEffect, useRef, useState } from "react";

const mergeDefaultOptions = (options) => {
  const defaultOptions = {
    runOnMount: true,
  };
  return {
    ...defaultOptions,
    ...(options || {}),
  };
};
export default function useAsyncData(method, options) {
  const optionsRef = useRef(mergeDefaultOptions(options));
  const [isLoading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const previousRequestRef = useRef(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const requestData = useCallback(
    async (...args) => {
      if (previousRequestRef.current?.isLoading) {
        return null;
      }
      setLoading(true);
      previousRequestRef.current = {
        isLoading: true,
      };
      if (!previousRequestRef.current) {
        setIsInitialLoading(true);
      }
      try {
        const result = await method(...args);
        setData(result);
        return result;
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
        setIsInitialLoading(false);
        previousRequestRef.current = {
          isLoading: false,
        };
      }
      return null;
    },
    [method]
  );

  useEffect(() => {
    if (optionsRef.runOnMount) {
      requestData();
    }
  }, [requestData]);
  return { data, isLoading, isInitialLoading, error, requestData };
}
