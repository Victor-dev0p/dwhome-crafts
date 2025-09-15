// app/admin/quotes/QuotesList.jsx - FIXED VERSION
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Phone, Calendar, DollarSign } from 'lucide-react';

const currencySymbols = {
  NGN: '₦',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export default function QuotesList({ quotes }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const formatBudget = (quote) => {
    if (quote.budget && typeof quote.budget === 'number') {
      return `₦${quote.budget.toLocaleString()}`;
    }
    if (quote.currency && quote.budgetRaw) {
      const symbol = currencySymbols[quote.currency] || quote.currency;
      return `${symbol}${(+quote.budgetRaw).toLocaleString()}`;
    }
    return 'Budget not specified';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  if (!quotes || quotes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 rounded-lg p-8">
          <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes yet</h3>
          <p className="text-gray-600">Quote requests will appear here once customers submit them.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {quotes.map((quote, i) => (
        <div
          key={quote._id || i}
          className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 overflow-hidden"
        >
          {/* Header - Always Visible */}
          <button
            onClick={() => toggleIndex(i)}
            className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors duration-200"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  {quote.name || 'Unknown Name'}
                </h3>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                  {quote.service || 'No Service'}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Mail size={14} />
                  {quote.email || 'No email'}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign size={14} />
                  {formatBudget(quote)}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {formatDate(quote.createdAt)}
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 ml-4">
              {openIndex === i ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </button>

          {/* Expanded Content */}
          {openIndex === i && (
            <div className="border-t border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800">
              <div className="px-6 py-4 space-y-4">
                {/* Project Details */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Project Details
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-900 p-3 rounded border">
                    {quote.projectDetails || 'No project details provided'}
                  </p>
                </div>

                {/* Additional Message */}
                {quote.message && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                      Additional Message
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-900 p-3 rounded border">
                      {quote.message}
                    </p>
                  </div>
                )}

                {/* Contact Actions */}
                <div className="flex gap-3 pt-2">
                  <a
                    href={`mailto:${quote.email}?subject=Re: Your ${quote.service} Quote Request`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Mail size={16} />
                    Reply via Email
                  </a>
                  
                  <button
                    onClick={() => navigator.clipboard.writeText(quote.email)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
                  >
                    Copy Email
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}