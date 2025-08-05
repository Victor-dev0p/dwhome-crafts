// app/admin/testimonials/page.jsx
import { connectToDB } from '@/lib/mongodb';
import Testimonial from '@/lib/models/Testimonial';
import TestimonialForm from '@/components/Admin/TestimonialForm';

export default async function TestimonialsPage() {
  await connectToDB();
  const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Testimonials</h1>

        {/* Create New Testimonial */}
        <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Add Testimonial</h2>
          <TestimonialForm />
        </div>

        {/* Existing Testimonials */}
        <div className="space-y-4">
          {testimonials.length === 0 ? (
            <p className="text-sm text-gray-500">No testimonials found.</p>
          ) : (
            testimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-start"
              >
                <div>
                  <p className="text-gray-800 dark:text-gray-100">{testimonial.content}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    — {testimonial.author}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
