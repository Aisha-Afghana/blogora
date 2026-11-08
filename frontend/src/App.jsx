import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import ManageBlogs from "./pages/ManageBlogs";
import EditBlog from "./pages/EditBlog";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F8F7F4]">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/new" element={<CreateBlog />} />
          <Route path="/blogs/manage" element={<ManageBlogs />} />
          <Route path="/blogs/edit/:id" element={<EditBlog />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
