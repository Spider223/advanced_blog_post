import { Card, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import moment from "moment";
import { Link } from "react-router-dom";

export default function Post({
  author,
  title,
  cover,
  summary,
  createdAt,
  _id,
}) {
  return (
    <Col md="auto">
      <Card style={{ width: "18rem" }} className="mb-3">
        <Card.Img
          variant="top"
          src={"http://localhost:4000/" + cover}
          style={{ width: "287px", height: "350px" }}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{summary}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Author: {author?.username}</ListGroup.Item>
          <ListGroup.Item>
            Created At : {moment(createdAt).format("MMMM D, YYYY")}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Link to={`post/${_id}`}>
            <Card.Link>Click here for detail ...</Card.Link>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
