// app/blogs/page.jsx - FIXED VERSION
import Link from "next/link";

export default async function BlogListPage() {
  // Use the same environment variable as your other pages
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  console.log('Blog page - Base URL:', baseUrl);
  console.log('Environment:', process.env.NODE_ENV);

  let blogs = [];
  let error = null;

  try {
    console.log('Fetching blogs from:', `${baseUrl}/api/blogs`);
    
    const res = await fetch(`${baseUrl}/api/blogs`, { 
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('Blog fetch response status:', res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Blog fetch failed:', res.status, errorText);
      error = `Failed to load blogs (${res.status})`;
    } else {
      blogs = await res.json();
      console.log(`Loaded ${blogs.length} blogs successfully`);
    }
  } catch (fetchError) {
    console.error('Blog fetch error:', fetchError);
    error = 'Failed to connect to blog service';
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      </div>
    );
  }

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
                  onError={(e) => {
                    console.error('Blog image failed to load for:', blog.title);
                    e.target.style.display = 'none';
                  }}
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

                {/* Author and Date */}
                <div className="text-sm text-gray-500 mb-4">
                  {blog.author && <span>By {blog.author}</span>}
                  {blog.createdAt && (
                    <span className="ml-2">
                      • {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="mt-auto">
                  <Link
                    href={`/blogs/${blog._id}`}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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