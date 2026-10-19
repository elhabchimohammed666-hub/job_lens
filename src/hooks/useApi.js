import { useState, useEffect, useCallback } from "react";

const USE_MOCK = !import.meta.env.VITE_API_URL;

export function useApi(apiFn, mockData, { immediate = true, deps = [] } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 300));
        const result = typeof mockData === "function" ? mockData(...args) : mockData;
        setData(result);
        return result;
      }
      const result = await apiFn(...args);
      setData(result);
      return result;
    } catch (err) {
      if (USE_MOCK || err.code === "ERR_NETWORK") {
        const result = typeof mockData === "function" ? mockData(...args) : mockData;
        setData(result);
        return result;
      }
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFn, mockData]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, ...deps]);

  return { data, loading, error, execute, setData };
}

export function useMutation(apiFn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFn(...args);
      return result;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFn]);

  return { mutate, loading, error };
}
