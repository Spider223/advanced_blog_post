import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Form, Button, Container } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/post/create/${id}`)
      .then((result) => {
        console.log(result);
        setTitle(result.data.singlePost[0].title);
        setSummary(result.data.singlePost[0].summary);
        setContent(result.data.singlePost[0].content);
      });
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("file", file);

    const configuration = {
      method: "patch",
      url: `http://localhost:4000/api/v1/post/create/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    };

    axios(configuration)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        }
      });

    axios
      .delete(`http://localhost:4000/api/v1/post/create/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        window.location.href = "/";
      });
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="title"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSummary">
          <Form.Label>Summary</Form.Label>
          <Form.Control
            type="summary"
            placeholder="Summary"
            name="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Form.Group>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <ReactQuill
          theme="snow"
          value={content}
          onChange={(newValue) => setContent(newValue)}
          modules={modules}
          formats={formats}
        />
        <br />
        <div>
          <Button variant="primary" type="submit" className="m-3">
            Update
          </Button>
          <Button variant="primary" type="sumbit">
            Delete
          </Button>
        </div>
      </Form>
    </Container>
  );
}
