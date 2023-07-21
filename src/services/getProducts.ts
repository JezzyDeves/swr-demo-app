export default async function getProducts(token: string) {
  const products: { products: string[] } = await (
    await fetch("/api/products")
  ).json();

  return products;
}
