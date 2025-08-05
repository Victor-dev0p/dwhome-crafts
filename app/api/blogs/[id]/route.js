import { connectToDatabase } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const blog = await Blog.findByIdAndUpdate(params.id, data, { new: true });
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const blog = await Blog.findByIdAndDelete(params.id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Blog deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}