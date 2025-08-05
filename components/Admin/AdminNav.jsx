'use client';

import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminNav() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/admin/dashboard" className="text-white text-lg font-bold">
          Admin Panel
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/admin/projects" className="text-white hover:text-gray-300">
            Projects
          </Link>
          <Link href="/admin/testimonials" className="text-white hover:text-gray-300">
            Testimonials
          </Link>
          <Link href="/admin/blogs" className="text-white hover:text-gray-300">
            Blogs
          </Link>
          <Link href="/admin/quotes" className="text-white hover:text-gray-300">
            Quotes
          </Link>
          <Link href="/api/auth/signout" className="text-white hover:text-gray-300">
            Sign Out
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            aria-label="Toggle Theme"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
