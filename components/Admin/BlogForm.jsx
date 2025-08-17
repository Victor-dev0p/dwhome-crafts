'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogForm({ blog }) {
  const router = useRouter();

  const [title, setTitle] = useState(blog?.title || '');
  const [author, setAuthor] = useState(blog?.author || '');
  const [excerpt, setExcerpt] = useState(blog?.excerpt || '');
  const [content, setContent] = useState(blog?.content || '');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || '');
      setAuthor(blog.author || '');
      setExcerpt(blog.excerpt || '');
      setContent(blog.content || '');
    }
  }, [blog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', author);
      formData.append('excerpt', excerpt);
      formData.append('content', content);
      if (image) formData.append('image', image);

      const method = blog?._id ? 'PUT' : 'POST';
      const url = blog?._id ? `/api/blogs/${blog._id}` : '/api/blogs';

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error('Failed to save blog');

      alert(blog?._id ? "Blog updated successfully!" : "Blog created successfully!");
      router.push('/admin/blogs');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Error saving blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input type="text" className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div>
        <label className="block font-semibold mb-1">Author</label>
        <input type="text" className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>

      <div>
        <label className="block font-semibold mb-1">Excerpt</label>
        <textarea className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white" rows="3" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </div>

      <div>
        <label className="block font-semibold mb-1">Content (HTML Allowed)</label>
        <textarea className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white font-mono" rows="10" value={content} onChange={(e) => setContent(e.target.value)} required />
        <p className="text-xs text-gray-500 mt-1">You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, etc.</p>
      </div>

      <div>
        <label className="block font-semibold mb-1">Image</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        {blog?.image?.data && (
          <img
            src={`data:${blog.image.contentType};base64,${btoa(
              new Uint8Array(blog.image.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            )}`}
            alt="Blog"
            className="mt-2 w-32 h-20 object-cover rounded"
          />
        )}
      </div>

      <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
        {loading ? 'Saving...' : blog?._id ? 'Update Blog' : 'Create Blog'}
      </button>
    </form>
  );
}

