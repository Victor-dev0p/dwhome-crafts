// app/admin/quote/QuotesList.jsx
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const currencySymbols = {
  NGN: '₦',
  USD: '$',
};

export default function QuotesList({ quotes }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Submitted Quotes</h1>
      <div className="space-y-4">
        {quotes.length === 0 && <p>No quotes yet.</p>}
        {quotes.map((quote, i) => (
          <div
            key={quote._id}
            className="bg-white dark:bg-zinc-900 rounded-lg shadow border"
          >
            {/* Toggle Button */}
            <button
              onClick={() => toggleIndex(i)}
              className="w-full flex justify-between items-center px-4 py-3 text-left font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            >
              <div>
                <p className="font-semibold">{quote.name || '—'}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {quote.email}
                </p>
                <p className="text-sm">
                  {quote.currency && quote.budgetRaw
                    ? `${currencySymbols[quote.currency] || ''}${(
                        +quote.budgetRaw
                      ).toLocaleString()}`
                    : '—'}
                </p>
              </div>
              {openIndex === i ? <ChevronUp /> : <ChevronDown />}
            </button>

            {/* Expanded Details */}
            {openIndex === i && (
              <div className="border-t px-4 py-3 space-y-2 text-sm text-gray-800 dark:text-gray-200">
                <p>
                  <strong>Service:</strong> {quote.service || '—'}
                </p>
                <p>
                  <strong>Project Details:</strong>{' '}
                  {quote.projectDetails || '—'}
                </p>
                <p>
                  <strong>Message:</strong> {quote.message || '—'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  <strong>Submitted:</strong>{' '}
                  {quote.createdAt
                    ? new Date(quote.createdAt).toLocaleString()
                    : '—'}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
