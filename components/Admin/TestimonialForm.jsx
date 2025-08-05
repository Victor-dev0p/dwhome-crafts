'use client';

import { useState } from 'react';

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    name: '',
    text: '',
    location: '',
    project: '',
    rating: 5,
  });
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('text', formData.text);
    form.append('location', formData.location);
    form.append('project', formData.project);
    form.append('rating', formData.rating);
    if (imageFile) form.append('image', imageFile);

    const res = await fetch('/api/testimonials', {
      method: 'POST',
      body: form,
    });

    if (res.ok) {
      alert('Testimonial created!');
      setFormData({
        name: '',
        text: '',
        location: '',
        project: '',
        rating: 5,
      });
      setImageFile(null);
    } else {
      alert('Error adding testimonial');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold mb-2">Add New Testimonial</h2>

      <input
        type="text"
        placeholder="Client Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full border rounded p-2"
        required
      />

      <textarea
        placeholder="Testimonial Text"
        value={formData.text}
        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
        className="w-full border rounded p-2"
        required
      />

      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        className="w-full border rounded p-2"
      />

      <input
        type="text"
        placeholder="Project"
        value={formData.project}
        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
        className="w-full border rounded p-2"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        className="w-full border rounded p-2"
        required
      />

      <input
        type="number"
        placeholder="Rating (1–5)"
        value={formData.rating}
        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
        min="1"
        max="5"
        className="w-full border rounded p-2"
      />

      <button
        type="submit"
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
      >
        Submit
      </button>
    </form>
  );
}
