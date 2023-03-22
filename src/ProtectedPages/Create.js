import { useState } from "react";
import ReactQuill from "react-quill";
import { Form, Button, Container } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

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

export default function Create() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("file", file);

    const configuration = {
      method: "post",
      url: "http://localhost:4000/api/v1/post/create",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    };

    axios(configuration)
      .then((result) => {
        console.log(result);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
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

        {/* <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" onChange={(e) => setFile(e.target.files)} />
        </Form.Group> */}

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <ReactQuill
          theme="snow"
          value={content}
          onChange={(newValue) => setContent(newValue)}
          modules={modules}
          formats={formats}
        />
        <br />
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
}
