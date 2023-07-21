import { useEffect, useState } from "react";
import useSWR from "swr";
import { useTokenStore } from "../stores/useTokenStore";
import { getToken } from "../services/getToken";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  async function login(): Promise<string> {
    let token: string = await getToken();

    setToken(token);

    navigate("/products");

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
