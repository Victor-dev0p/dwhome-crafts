// app/api/testimonials/[id]/image/route.js

import { connectToDB } from '@/lib/mongodb';
import Testimonial from '@/lib/models/Testimonial';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  await connectToDB();
  const testimonial = await Testimonial.findById(params.id);
  if (!testimonial || !testimonial.image) {
    return new NextResponse('Image not found', { status: 404 });
  }

  return new NextResponse(testimonial.image, {
    status: 200,
    headers: {
      'Content-Type': testimonial.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
