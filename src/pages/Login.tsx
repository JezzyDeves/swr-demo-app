import { Button, Card, Col, Spinner } from "react-bootstrap";
import { useLogin } from "../hooks/useLogin";

type Props = {};

export default function Login({}: Props) {
  let { isLoading, fetch } = useLogin();

  return (
    <Col className="d-flex bg-primary-subtle vh-100 justify-content-center align-items-center">
      <Col xs={2}>
        <Card>
          <Card.Header className="text-center">SWR Demo App</Card.Header>
          <Card.Body className="d-flex justify-content-center">
            {isLoading ? (
              <Spinner />
            ) : (
              <Button onClick={() => fetch()}>Login</Button>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Col>
  );
}
