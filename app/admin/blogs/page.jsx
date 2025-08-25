'use client';

import { useEffect, useState } from 'react';
import BlogForm from '@/components/admin/BlogForm';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs');
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete blog');
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setShowForm(true);
  };

  const handleNew = () => {
    setSelectedBlog(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          New Blog
        </button>
      </div>

      {showForm ? (
        <BlogForm blog={selectedBlog} />
      ) : loading ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col"
            >
              {blog.image?.data && (
                <img
                  src={`data:${blog.image.contentType};base64,${btoa(
                    new Uint8Array(blog.image.data.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ''
                    )
                  )}`}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h2 className="font-semibold text-lg">{blog.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                {blog.excerpt || blog.content.replace(/<[^>]*>/g, '').slice(0, 120)}...
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleEdit(blog)}
                  className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
