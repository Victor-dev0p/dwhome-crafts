// app/api/blogs/route.js
import { connectToDB } from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import { NextResponse } from "next/server";

// POST (Create) a new blog post
export async function POST(req) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const title = formData.get("title");
    const excerpt = formData.get("excerpt");
    const content = formData.get("content");
    const imageFile = formData.get("image");

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
    }

    let imageData = null;
    // ✅ Robust check for image file was provided and is not empty
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      try {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        imageData = {
          data: buffer,
          contentType: imageFile.type,
        };
      } catch (error) {
        console.error("Error processing image file:", error);
        return NextResponse.json({ error: "Failed to process image file." }, { status: 500 });
      }
    }

    const newBlog = await Blog.create({
      title,
      excerpt,
      content,
      image: imageData, // This now correctly saves null if no valid image is provided
    });

    // NextResponse automatically handles JSON serialization
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog." }, { status: 500 });
  }
}

// GET all blog posts
export async function GET() {
  try {
    await connectToDB();
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();

    // Convert _id to string for client components and handle image data safely
    const serializedBlogs = blogs.map(b => {
      const serializedImage = (b.image && b.image.data)
        ? {
            contentType: b.image.contentType,
            data: b.image.data.toString("base64"),
          }
        : null;

      return {
        ...b,
        _id: b._id.toString(),
        image: serializedImage,
      };
    });

    return NextResponse.json(serializedBlogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs." }, { status: 500 });
  }
}
