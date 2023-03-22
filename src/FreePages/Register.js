import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert2";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };
    axios
      .post("http://localhost:4000/api/v1/user/register", data)
      .then((result) => {
        console.log(result);
        if (result) {
          swal
            .fire("Awesome", "You have successfully registered.", "success")
            .then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                window.location.href = "/login";
              }
            });
        }
      })
      .catch((error) => {
        if (error) {
          swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        }
      });
  };

  return (
    <Container>
      <h1 className="text-center">Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
