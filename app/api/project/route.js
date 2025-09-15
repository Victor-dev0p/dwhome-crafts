// app/api/project/route.js - FIXED VERSION
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

    return NextResponse.json({ 
      message: 'Project created', 
      projectId: newProject._id 
    }, { status: 201 });
  } catch (err) {
    console.error('POST project error:', err);
    return NextResponse.json({ 
      error: 'Failed to create project', 
      details: err.message 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    console.log('Attempting to fetch projects...');
    await connectToDB();
    console.log('Connected to DB, fetching projects...');

    const projects = await Project.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    console.log(`Found ${projects.length} projects`);

    // Add proper headers for production
    return NextResponse.json(projects, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (err) {
    console.error('GET projects error:', err);
    return NextResponse.json({ 
      error: 'Failed to fetch projects', 
      details: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}