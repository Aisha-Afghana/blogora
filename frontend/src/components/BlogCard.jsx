import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/blogs/${blog._id}`} className="block overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-800">
          {blog.topic || "Technology"}
        </p>

        <Link to={`/blogs/${blog._id}`}>
          <h2 className="mb-3 text-xl font-bold leading-snug text-stone-900 transition-colors group-hover:text-emerald-800">
            {blog.title}
          </h2>
        </Link>

        <p className="mb-5 line-clamp-3 text-sm leading-7 text-stone-600">
          {blog.description}
        </p>

        <div className="mt-auto border-t border-stone-100 pt-4">
          <p className="text-sm font-medium text-stone-500">By {blog.author}</p>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
