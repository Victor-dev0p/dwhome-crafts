import { connectToDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function DELETE(req, { params }) {
  await connectToDB();
  await Blog.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}