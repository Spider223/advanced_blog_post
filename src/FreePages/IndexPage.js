import Post from "./Post";
import { CardGroup, Row, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/post/create")
      .then((result) => {
        console.log(result.data.getpost);
        setPosts(result.data.getpost);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container className="mt-5">
      <CardGroup>
        <Row>
          {posts.length > 0 &&
            posts.map((item) => <Post {...item} key={item._id} />)}
        </Row>
      </CardGroup>
    </Container>
  );
}
