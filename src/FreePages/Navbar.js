import { useEffect, useState } from "react";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

export default function Nav() {
  const [info, setInfo] = useState("");

  useEffect(() => {
    const configuration = {
      method: "get",
      url: "http://localhost:4000/api/v1/user/profile",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configuration)
      .then((result) => {
        console.log(result);
        console.log(result.data.user.username);
        setInfo(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    setInfo("");
  };

  const username = info?.data?.user?.username;
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {username && (
            <>
              <Navbar.Text className="p-3">
                Signed in as: {username}
              </Navbar.Text>
              <NavDropdown
                className="navbar-toggler-icon"
                id="basic-nav-dropdown"
                menuVariant="dark">
                <div className="text-center">
                  <NavDropdown.Item href="/create">Create</NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </div>
              </NavDropdown>
            </>
          )}
          {!username && (
            <>
              <Navbar.Text className="p-3">
                <Link to="/login">Login</Link>
              </Navbar.Text>
              <Navbar.Text>
                <Link to="/register">Register</Link>
              </Navbar.Text>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
