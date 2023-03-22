import { Routes, Route } from "react-router-dom";
import Register from "./FreePages/Register";
import Login from "./FreePages/Login";
import IndexPage from "./FreePages/IndexPage";
import Nav from "./FreePages/Navbar";
import ProtectedRoutes from "./ProtectedPages/ProtectedRoutes";
import Create from "./ProtectedPages/Create";
import SinglePost from "./ProtectedPages/SinglePost";
import EditPost from "./ProtectedPages/EditPost";

export default function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </div>
  );
}
