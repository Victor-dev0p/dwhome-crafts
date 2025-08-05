'use client';
import { useState } from 'react';

export default function ProjectForm() {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please select an image.');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    try {
      setLoading(true);
      const res = await fetch('/api/project', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Something went wrong');
      alert('Project created!');
      setDescription('');
      setImage(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-200">Image</label>
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setImage(e.target.files[0])}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-200">Description</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mt-1 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        {loading ? 'Submitting...' : 'Add Project'}
      </button>
    </form>
  );
}
