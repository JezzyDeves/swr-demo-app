import useSWR from "swr";
import createMember from "../services/createMember";
import { useEffect, useState } from "react";

const useCreateMember = () => {
  const [name, setName] = useState({ name: "" });
  const [shouldFetch, setShouldFetch] = useState(false);
  const { isLoading, isValidating, mutate } = useSWR(
    shouldFetch ? ["/api/member", name] : null,
    ([, name]) => createMember(name)
  );

  function call(name: { name: string }) {
    mutate();
    setName(name);
    setShouldFetch(true);
  }

  useEffect(() => {
    if (isLoading === false && !isValidating && shouldFetch) {
      setShouldFetch(false);
    }
  }, [isLoading, isValidating]);

  return { isLoading: isLoading || isValidating, fetch: call };
};

export default useCreateMember;
