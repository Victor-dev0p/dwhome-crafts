import { connectToDB } from '@/lib/mongodb';
import Testimonial from '@/lib/models/Testimonial';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const imageFile = formData.get('image');

    let imageBuffer = null;
    let contentType = null;

    if (imageFile && typeof imageFile.arrayBuffer === 'function') {
      const arrayBuffer = await imageFile.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
      contentType = imageFile.type;
    }

    const testimonial = new Testimonial({
      name: formData.get('name'),
      text: formData.get('text'),
      location: formData.get('location'),
      project: formData.get('project'),
      rating: parseInt(formData.get('rating')),
      image: imageBuffer,
      contentType: contentType,
    });

    await testimonial.save();

    return NextResponse.json({ message: 'Testimonial created' }, { status: 201 });
  } catch (err) {
    console.error('Error creating testimonial:', err);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    const processed = testimonials.map(t => ({
      _id: t._id,
      name: t.name,
      text: t.text,
      location: t.location,
      project: t.project,
      rating: t.rating,
      image: t.image?.toString('base64') ?? null,
      contentType: t.contentType ?? null,
    }));

    return NextResponse.json(processed, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}
