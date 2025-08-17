'use client';

import Link from 'next/link';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminNav() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const links = [
    { href: '/admin/projects', label: 'Projects' },
    { href: '/admin/testimonials', label: 'Testimonials' },
    { href: '/admin/blogs', label: 'Blogs' },
    { href: '/admin/quotes', label: 'Quotes' },
    { href: '/api/auth/signout', label: 'Sign Out' },
  ];

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/admin/dashboard" className="text-lg font-bold">
          Admin Panel
        </Link>

        {/* Mobile menu toggle */}
        <button onClick={toggleMenu} className="md:hidden">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-gray-300">
              {label}
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            aria-label="Toggle Theme"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-2 border-t border-white/20 pt-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block px-2 py-1 hover:bg-blue-700 rounded"
            >
              {label}
            </Link>
          ))}

          {/* Theme toggle for mobile */}
          <button
            onClick={() => setDark(!dark)}
            className="mt-2 flex items-center gap-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1 rounded"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  );
}
