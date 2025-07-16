import { connectToDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function DELETE(req, { params }) {
  await connectToDB();
  await Testimonial.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}