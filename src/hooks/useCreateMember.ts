import { useState } from "react";
import useSWR from "swr";
import createMember from "../services/createMember";

const useCreateMember = () => {
  const [name, setName] = useState({ name: "Test Name" });
  const { data, isLoading, isValidating, mutate } = useSWR(
    ["/api/member", name],
    ([key, name]) => createMember(name),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  function call(name: { name: string }) {
    mutate();
    setName(name);
  }

  return { isLoading: isLoading || isValidating, fetch: call, data };
};

export default useCreateMember;
