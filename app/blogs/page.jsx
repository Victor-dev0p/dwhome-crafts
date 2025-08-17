// app/blog/page.jsx
import Link from "next/link";

export default async function BlogListPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/blogs`, { cache: "no-store" });
  // const blogs = await res.json();


  if (!res.ok) {
    return <p className="p-6">Failed to load blogs</p>;
  }

  const blogs = await res.json();
  console.log("BLOG FROM DB:", JSON.stringify(blogs || blog, null, 2));


  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blog posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col"
            >
              {/* Blog Image */}
              {blog.image?.data && (
                <img
                  src={`data:${blog.image.contentType};base64,${blog.image.data}`}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-5 flex flex-col flex-1">
                {/* Title */}
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>

                {/* Excerpt */}
                {blog.excerpt && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                )}

                <div className="mt-auto">
                  <Link
                    href={`/blogs/${blog._id}`}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Continue Reading
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
