import { connectToDB } from '@/lib/mongodb'
import Project from '@/models/Project'

export async function GET() {
  await connectToDB()
  const projects = await Project.find().sort({ createdAt: -1 })
  return Response.json(projects)
}

export async function POST(req) {
  await connectToDB()
  const { title, description } = await req.json()

  try {
    const newProject = new Project({ title, description })
    await newProject.save()
    return Response.json({ success: true })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}