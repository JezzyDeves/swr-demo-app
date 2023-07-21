import useSWR from "swr";
import { useEffect, useState } from "react";
import { getToken } from "../services/getToken";
import getProducts from "../services/getProducts";
import useProductsStore from "../stores/useProductsStore";

const useGetTokenAndProducts = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    shouldFetch ? "/api/products" : null,
    getTokenAndProducts,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const setProducts = useProductsStore((state) => state.setProducts);

  async function getTokenAndProducts() {
    const token = await getToken();

    const products = await getProducts(token);

    setProducts(products.products);

    return products;
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

export default useGetTokenAndProducts;
