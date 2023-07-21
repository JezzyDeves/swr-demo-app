import { Button, Card, Col, ListGroup, Spinner } from "react-bootstrap";
import useGetTokenAndProducts from "../hooks/useGetTokenAndProducts";
import useProductsStore from "../stores/useProductsStore";

type Props = {};

export default function Products({}: Props) {
  const { fetch: getProducts, isLoading } = useGetTokenAndProducts();
  const products = useProductsStore((state) => state.products);

  return (
    <div>
      <Col className="d-flex bg-primary-subtle vh-100 justify-content-center align-items-center">
        <Card>
          <Card.Header className="text-center">
            {isLoading ? (
              <Spinner />
            ) : (
              <Button onClick={() => getProducts()}>Get Products</Button>
            )}
          </Card.Header>
          <ListGroup variant="flush">
            {products
              ? products.map((product) => (
                  <ListGroup.Item key={crypto.randomUUID()}>
                    {product}
                  </ListGroup.Item>
                ))
              : null}
          </ListGroup>
        </Card>
      </Col>
    </div>
  );
}
