import { connectToDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  await connectToDB();
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  return Response.json(testimonials);
}

export async function POST(req) {
  await connectToDB();
  const body = await req.json();
  const newTestimonial = new Testimonial(body);
  await newTestimonial.save();
  return Response.json({ success: true });
}