import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";

export default function SinglePost() {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/post/create/${id}`)
      .then((result) => {
        console.log(result);
        setSinglePost(result.data.singlePost[0]);
      });
  }, [id]);

  return (
    <Container>
      <h3 className="text-center ">{singlePost.title}</h3>
      <img
        src={`http://localhost:4000/${singlePost?.cover}`}
        className="img-thumbnail rounded mx-auto d-block mt-3"
        alt="..."
        style={{ width: "35rem", height: "35rem" }}
      />
      <h4 className="text-center mt-3">
        <b>Created by :</b> {singlePost?.author?.username}
      </h4>
      <div className="text-center mb-3">
        <Link
          to={`/edit/${singlePost?._id}`}
          className="text-decoration-none fs-3 ">
          <BiEdit />
          Edit this post
        </Link>
      </div>
      <div className="p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end shadow p-3 mb-5 bg-body-tertiary rounded">
        <div dangerouslySetInnerHTML={{ __html: singlePost.content }} />
      </div>
    </Container>
  );
}
