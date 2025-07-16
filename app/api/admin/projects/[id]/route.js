import { connectToDB } from '@/lib/mongodb'
import Project from '@/models/Project'
import { NextResponse } from 'next/server'

export async function DELETE(_, { params }) {
  await connectToDB()
  try {
    await Project.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}