import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function CreateBlog() {
  // Store all form information
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Update form data whenever the user types
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Send form data to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      await API.post("/blogs", formData);

      setMessage("Your blog was published successfully!");

      // Clear the form after successful submission
      setFormData({
        title: "",
        author: "",
        description: "",
        image: "",
        content: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to publish your blog.");

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Reset all form fields
  const handleReset = () => {
    setFormData({
      title: "",
      author: "",
      description: "",
      image: "",
      content: "",
    });

    setMessage("");
    setError("");
  };

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <Link
        to="/"
        className="text-sm font-medium text-emerald-800 hover:text-emerald-900"
      >
        ← Back to Home
      </Link>

      <section className="mt-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-800">
          Share your ideas
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-stone-900">
          Create a new blog
        </h1>

        <p className="mt-2 leading-7 text-stone-600">
          Write and share your thoughts with your readers.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-xl border border-stone-200 bg-white p-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700">
            Blog title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your blog title"
            required
            className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-800"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700">
            Author
          </label>

          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter the author's name"
            required
            className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-800"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700">
            Short description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            placeholder="Write a short summary"
            required
            className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-800"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700">
            Image URL
          </label>

          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
            className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-800"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700">
            Full content
          </label>

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            placeholder="Write your complete blog here..."
            required
            className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-800"
          />
        </div>

        {message && <p className="text-sm text-emerald-700">{message}</p>}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-emerald-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-900 disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-stone-300 px-5 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
          >
            Reset
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateBlog;
