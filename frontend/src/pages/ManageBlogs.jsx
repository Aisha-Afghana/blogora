import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await API.get("/blogs");
        setBlogs(response.data);
      } catch (error) {
        setError("Failed to load blogs.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/blogs/${id}`);

      setBlogs((previousBlogs) =>
        previousBlogs.filter((blog) => blog._id !== id),
      );
    } catch (error) {
      setError("Failed to delete blog.");
      console.error(error);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <Link
        to="/"
        className="text-sm font-medium text-emerald-800 hover:text-emerald-900"
      >
        ← Back to Home
      </Link>

      <section className="mb-8 mt-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-800">
          Your workspace
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-stone-900">
          Manage Blogs
        </h1>

        <p className="mt-2 leading-7 text-stone-600">
          View, edit, and organize your published articles.
        </p>
      </section>

      <section className="overflow-hidden rounded-xl border border-stone-200 bg-white">
        <div className="flex items-center justify-between border-b border-stone-200 p-5">
          <h2 className="font-semibold text-stone-900">
            Your articles ({blogs.length})
          </h2>

          <Link
            to="/blogs/new"
            className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-900"
          >
            + New Blog
          </Link>
        </div>

        <div className="divide-y divide-stone-200">
          {loading ? (
            <p className="p-5 text-stone-600">Loading blogs...</p>
          ) : error ? (
            <p className="p-5 text-red-600"> {error} </p>
          ) : blogs.length === 0 ? (
            <p className="p-5 text-stone-500"> No blogs available. </p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="font-semibold text-stone-900">{blog.title}</h3>

                  <p>
                    {" "}
                    By {blog.author} .{""}{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-3">
                  {" "}
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100"
                  ></Link>
                  <Link
                    to={`/blogs/edit/${blog._id}`}
                    className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(blog._id)}
                    className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default ManageBlogs;
