import { useEffect, useState } from "react";
import useSWR from "swr";
import { useTokenStore } from "../stores/useTokenStore";
import { getToken } from "../services/getToken";

export const useLogin = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    shouldFetch ? "token" : null,
    login,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const setToken = useTokenStore((state) => state.setToken);
  async function login(): Promise<string> {
    let token: string = await getToken();

    setToken(token);

    return token;
  }

  function call() {
    mutate();
    setShouldFetch(true);
  }

  useEffect(() => {
    if (isLoading === false && !isValidating && shouldFetch) {
      setShouldFetch(false);
    }
  }, [isLoading, isValidating]);

  return { data, error, isLoading: isLoading || isValidating, fetch: call };
};
