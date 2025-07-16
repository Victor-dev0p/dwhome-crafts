import { connectToDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET() {
  await connectToDB();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return Response.json(blogs);
}

export async function POST(req) {
  await connectToDB();
  const body = await req.json();
  const newBlog = new Blog(body);
  await newBlog.save();
  return Response.json({ success: true });
}