// import React from 'react'
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <article className="overflow-hidden rounded-xl border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-md">
      <Link to={`/blogs/${blog._id}`}>
        <img src={blog.image} alt={blog.title} />
      </Link>

      <div className="p-5">
        <p className="mb-2 text-sm text-stone-500">by{blog.author}</p>

        <Link to={`blogs/${blog._id}`}>
          <h2 className="mb-2 text-xl font-semibold text-stone-900 hover:text-emerald-800">
            {blog.title}
          </h2>
        </Link>

        <p className="text-sm leading-6 text-stone-600">{blog.description}</p>
      </div>
    </article>
  );
}

export default BlogCard;
