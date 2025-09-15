//components/QuoteForm
'use client';
import { useEffect, useState } from 'react';
import {
  User,
  Mail,
  Send,
  FileText,
  MessageSquare,
  Wallet,
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

// Outside component for performance
const InputWrapper = ({ icon: Icon, children }) => (
  <div className="relative flex items-center">
    <Icon className="absolute left-3 text-gray-500 w-4 h-4 pointer-events-none" />
    <div className="w-full pl-9">{children}</div>
  </div>
);

const currencySymbols = {
  NGN: '₦',
  USD: '$',
};

const unformatNumber = (value) => value.replace(/[^0-9]/g, '');

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    projectDetails: '',
    budget: '',
    currency: 'NGN',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await res.json();
        setRate(data.rates.NGN);
      } catch (err) {
        console.error('Failed to fetch rate:', err);
      }
    }
    fetchRate();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'budget') {
      const numeric = unformatNumber(value);
      const formatted = Number(numeric).toLocaleString();
      setFormData((prev) => ({ ...prev, budget: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    const rawBudget = unformatNumber(formData.budget);

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          budget: rawBudget,
          currency: formData.currency,
        }),
      });

      if (res.ok) {
        toast.success('Quote submitted successfully!');
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          service: '',
          projectDetails: '',
          budget: '',
          currency: 'NGN',
          message: '',
        });
      } else {
        const error = await res.json();
        toast.error(error.error || 'Something went wrong.');
      }
    } catch {
      toast.error('Server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="space-y-6 border rounded-xl shadow p-6"
      >
        <h2 className="text-2xl font-semibold text-center">Request a Free Quote</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWrapper icon={User}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="border p-2 rounded w-full"
            />
          </InputWrapper>
          <InputWrapper icon={Mail}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="border p-2 rounded w-full"
            />
          </InputWrapper>
        </div>

        <InputWrapper icon={FileText}>
          <textarea
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            placeholder="Describe your project in detail"
            required
            className="border p-2 rounded w-full"
          />
        </InputWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWrapper icon={Send}>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            >
              <option value="">Select a service</option>
              <option value="Home Design & Furnishing">Home Design & Furnishing</option>
              <option value="Hotel furnishing & Renovation">Hotel furnishing & Renovation</option>
              <option value="Minimalistic Home Design">Minimalistic Home & Office Design</option>
              <option value="BLounge & Resturants furnishing">Lounge & Resturants furnishing</option>
              <option value="School & Churches">School & Churches</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </InputWrapper>

          {/* 🔁 Budget input with currency select */}
          <div className="grid grid-cols-3 gap-2">
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="NGN">₦ (Naira)</option>
              <option value="USD">$ (Dollar)</option>
            </select>
            <div className="col-span-2 relative">
              <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                name="budget"
                value={
                  formData.budget
                    ? `${currencySymbols[formData.currency]}${formData.budget}`
                    : ''
                }
                onChange={handleChange}
                placeholder="Estimated budget"
                className="border p-2 pl-9 rounded w-full"
              />
            </div>
          </div>
        </div>

        {formData.budget && rate && (
          <p className="text-sm text-gray-500 mt-1 text-right">
            {formData.currency === 'NGN' ? (
              <>≈ ${(+unformatNumber(formData.budget) / rate).toFixed(2).toLocaleString()}</>
            ) : (
              <>≈ ₦{(+unformatNumber(formData.budget) * rate).toLocaleString()}</>
            )}
          </p>
        )}

        <InputWrapper icon={MessageSquare}>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Additional message (optional)"
            className="border p-2 rounded w-full"
          />
        </InputWrapper>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white w-full py-3 rounded flex justify-center items-center gap-2"
        >
          {loading ? 'Submitting...' : (
            <>
              <span className="text-white">✈️</span> Submit Quote
            </>
          )}
        </button>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 text-center font-medium"
          >
            🎉 Your quote has been submitted!
          </motion.div>
        )}
      </form>
    </div>
  );
}
