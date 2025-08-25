// app/admin/signin/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2, Eye, EyeOff } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin/dashboard');
    }
  }, [status, router]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Enter a valid email address');
      return;
    }

    setLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    setLoading(false);

    if (result.error) {
      setError('Invalid email or password');
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Sign In</h1>

        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Password Field with toggle */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded pr-10 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Submit Button with spinner */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
    </div>
  );
}
