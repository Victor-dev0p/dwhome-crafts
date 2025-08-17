// app/api/blogs/[id]/route.js
import { connectToDB } from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// GET a single blog post by ID
export async function GET(req, { params }) {
  try {
    await connectToDB();

    // Validate the ID to prevent a Mongoose CastError on invalid format.
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const blog = await Blog.findById(params.id).lean();

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // The .lean() method returns a plain JS object, so no need for manual serialization.
    // NextResponse will handle serializing the object to JSON.
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// PUT (Update) a single blog post by ID
export async function PUT(req, { params }) {
  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const excerpt = formData.get("excerpt");
    const content = formData.get("content");
    const imageFile = formData.get("image");

    let updateData = { title, excerpt, content };

    // ✅ Robust check for image file before processing
    if (imageFile && imageFile instanceof File) {
      // Ensure the file is not empty
      if (imageFile.size > 0) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        updateData.image = {
          data: buffer,
          contentType: imageFile.type,
        };
      } else {
        // If an empty file is sent, explicitly remove the image field
        updateData.image = null;
      }
    } else if (imageFile === 'null' || imageFile === 'undefined') {
      // This is a common way for frontends to signal image removal
      updateData.image = null;
    }

    await connectToDB();
    const updatedBlog = await Blog.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true } // Return the updated document and run schema validators
    ).lean();

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE a single blog post by ID
export async function DELETE(req, { params }) {
  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    await connectToDB();
    const result = await Blog.findByIdAndDelete(params.id);

    if (!result) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
