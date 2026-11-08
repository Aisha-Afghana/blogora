import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await API.get(`/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        setError("Failed to load this blog.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <p className="mx-auto max-w-4xl px-5 py-10">Loading blog...</p>;
  }

  if (error) {
    return <p className="mx-auto max-w-4xl px-5 py-10 text-red-600">{error}</p>;
  }

  if (!blog) {
    return <p className="mx-auto max-w-4xl px-5 py-10">Blog not found.</p>;
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <Link
        to="/"
        className="text-sm font-medium text-emerald-800 hover:text-emerald-900"
      >
        ← Back to Home
      </Link>

      <article className="mt-8">
        <p className="mb-3 text-sm font-medium text-emerald-800">
          {blog.topic}
        </p>

        <h1 className="mb-4 text-3xl font-bold tracking-tight text-stone-900">
          {blog.title}
        </h1>

        <p className="mb-6 text-sm text-stone-500">By {blog.author}</p>

        <img
          src={blog.image}
          alt={blog.title}
          className="mb-8 h-72 w-full rounded-xl object-cover"
        />

        <p className="mb-6 text-lg leading-8 text-stone-600">
          {blog.description}
        </p>

        <div className="whitespace-pre-line leading-8 text-stone-700">
          {blog.content}
        </div>
      </article>
    </main>
  );
}

export default BlogDetails;
