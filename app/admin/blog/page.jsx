"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "", content: "", author: "",
  });

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  const handleCreate = async () => {
    await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    setForm({ title: "", content: "", author: "" });
    fetchBlogs();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="space-y-10">
      <Card>
        <CardHeader>
          <CardTitle>Create Blog Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input placeholder="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <Textarea placeholder="Content" rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <Button onClick={handleCreate}>Publish</Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <Card key={blog._id}>
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">By: {blog.author}</p>
              <p className="text-sm line-clamp-3">{blog.content}</p>
              <Button variant="destructive" onClick={() => handleDelete(blog._id)} className="mt-4">
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;