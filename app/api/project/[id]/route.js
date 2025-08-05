// app/api/project/[id]/route.js
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse("Invalid project ID", { status: 400 });
    }

    const project = await Project.findById(id);

    if (!project || !project.image) {
      return new NextResponse("Image not found", { status: 404 });
    }

    return new NextResponse(project.image, {
      status: 200,
      headers: {
        "Content-Type": project.contentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("GET image error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
