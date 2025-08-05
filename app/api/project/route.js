// app/api/project/route.js
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Project from '@/lib/models/Project';

export async function POST(req) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const file = formData.get('image');
    const description = formData.get('description');

    if (!file || !description) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const newProject = await Project.create({
      image: buffer,
      contentType: file.type,
      description,
    });

    return NextResponse.json({ message: 'Project created', projectId: newProject._id });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ✅ Add this:
export async function GET() {
  try {
    await connectToDB();

    const projects = await Project.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(projects, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
