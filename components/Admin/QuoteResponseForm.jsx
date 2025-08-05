'use client';

import { useState } from 'react';

export default function QuoteResponseForm({ quoteId }) {
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/quotes/${quoteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response }),
    });
    if (res.ok) {
      alert('Response sent');
      setResponse('');
    } else {
      alert('Failed to send response');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label className="block text-gray-700">Response</label>
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter response to quote request"
      />
      <button type="submit" className="mt-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Send Response
      </button>
    </form>
  );
}