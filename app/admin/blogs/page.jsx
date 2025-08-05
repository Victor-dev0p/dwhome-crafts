import BlogForm from '@/components/Admin/BlogForm';
import { connectToDatabase } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

export default async function BlogsPage() {
  await connectToDatabase();
  const blogs = await Blog.find().lean();

  return (
    
      <div className="min-h-screen"> 
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>
          <BlogForm />
          <div className="mt-6">
            {blogs.map((blog) => (
              <div key={blog._id} className="p-4 bg-white rounded-lg shadow mb-4 flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{blog.title}</h2>
                  <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
                </div>
                <div>
                  <button className="text-blue-500 mr-4">Edit</button>
                  <button className="text-red-500">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}