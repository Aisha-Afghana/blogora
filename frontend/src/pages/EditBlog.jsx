import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    topic: "",
    description: "",
    content: "",
    image: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await API.get(`/blogs/${id}`);
        setFormData(response.data);
      } catch (error) {
        setError("Failed to load blog.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      await API.put(`/blogs/${id}`, formData);
      navigate("/blogs/manage");
    } catch (error) {
      setError("Failed to update blog.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="mx-auto max-w-3xl px-5 py-10">Loading blog...</p>;
  }

  if (error && !formData.title) {
    return (
      <p className="mx-auto max-w-3xl px-5 py-10 text-red-600"> {error} </p>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <Link to="/blogs/manage" className="text-sm font-medium text-emerald-800">
        ← Back to Manage Blogs
      </Link>

      <h1 className="mb-2 mt-8 text-3xl font-bold text-stone-900">Edit Blog</h1>

      <p className="mb-8 text-stone-600">Update your article information</p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-stone-200 bg-white p-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium"> Title </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-stone-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium"> Author </label>

          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-stone-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium"> Topic</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full rounded-lg border border-stone-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-stone-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="6"
            className="w-full rounded-lg border border-stone-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-stone-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email (optional)
          </label>

          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-stone-300 p-3"
          />
        </div>

        {error && <p className="text-sm text-red-600"> {error} </p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-emerald-800 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-900 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <Link
            to="/blogs/manage"
            className="rounded-lg border border-stone-300 px-5 py-3 text-sm font-medium text-stone-700"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}

export default EditBlog;
