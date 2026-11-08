import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b border-stone-200 bg-[#F8F7F4]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-stone-900"
        >
          Blogora <span className="text-emerald-800">.</span>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="text-sm font-medium text-stone-700 transition hover:text-emerald-800"
          >
            Home
          </Link>

          <Link
            to="/blogs/manage"
            className="text-sm font-medium text-stone-700 transition hover:text-emerald-800"
          >
            Manage Blogs
          </Link>

          <Link
            to="/blog/new"
            className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-900"
          >
            Write a Blog <span aria-hidden="true">+</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
