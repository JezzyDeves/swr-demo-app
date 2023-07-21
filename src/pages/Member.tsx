import { useState } from "react";
import { Button, Card, Col, Form, Spinner, Stack } from "react-bootstrap";
import useCreateMember from "../hooks/useCreateMember";

type Props = {};

export default function Member({}: Props) {
  const { fetch: createMember, isLoading } = useCreateMember();
  const [name, setName] = useState({ name: "" });

  return (
    <div>
      <Col className="d-flex bg-primary-subtle vh-100 justify-content-center align-items-center">
        <Card>
          <Card.Body className="d-flex text-center justify-content-center align-items-center">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <Stack>
                  <Form.Group className="mb-3">
                    <Form.Label>Member Name</Form.Label>
                    <Form.Control
                      placeholder="Enter A Name"
                      onChange={(e) => setName({ name: e.target.value })}
                    />
                  </Form.Group>
                  <Button onClick={() => createMember(name)}>
                    Create New Member
                  </Button>
                </Stack>
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}
