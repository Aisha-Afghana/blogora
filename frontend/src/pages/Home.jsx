import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import API from "../services/api";

function Home() {
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

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <section className="mb-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-800">
          Ideas worth sharing
        </p>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-stone-900">
          Stories, ideas & perspectives.
        </h1>

        <p className="max-w-6xl leading-7 text-stone-600">
          Explore thoughtful articles about technology, learning, and everyday
          life.
        </p>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-stone-900">
            Latest stories
          </h2>

          <span className="text-sm text-stone-500">
            {blogs.length} articles
          </span>
        </div>

        {loading ? (
          <p className="text-stone-900">Loading blogs...</p>
        ) : error ? (
          <p className="text-red-600"> {error} </p>
        ) : blogs.length === 0 ? (
          <p> No blogs available yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;

// http://localhost:5000/api/blogs/6ae8a2d3e8d69ea4bf0e479d
