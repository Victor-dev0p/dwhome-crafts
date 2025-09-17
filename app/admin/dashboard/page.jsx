import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDB } from '@/lib/mongodb';
import AdminNav from '@/components/Admin/AdminNav';
import Project from '@/lib/models/Project';
import Blog from '@/lib/models/Blog';
import Testimonial from '@/lib/models/Testimonial';
import Quote from '@/lib/models/Quote';
import Image from 'next/image';
import { Buffer } from 'buffer';

import {
  LayoutDashboard,
  FileText,
  Quote as QuoteIcon,
  FolderKanban,
  UsersRound,
  Activity,
} from 'lucide-react';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/signin');

  await connectToDB();

  const [projectCount, blogCount, quoteCount, testimonialCount] = await Promise.all([
    Project.countDocuments(),
    Blog.countDocuments(),
    Quote.countDocuments(),
    Testimonial.countDocuments(),
  ]);

  const [recentProjects, recentBlogs, recentQuotes, recentTestimonials] = await Promise.all([
    Project.find().sort({ createdAt: -1 }).limit(5).lean(),
    Blog.find().sort({ createdAt: -1 }).limit(5).lean(),
    Quote.find().sort({ createdAt: -1 }).limit(5).lean(),
    Testimonial.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  const stats = [
    { label: 'Projects', value: projectCount, icon: <FolderKanban className="w-6 h-6 text-blue-500" /> },
    { label: 'Blogs', value: blogCount, icon: <FileText className="w-6 h-6 text-green-500" /> },
    { label: 'Quotes', value: quoteCount, icon: <QuoteIcon className="w-6 h-6 text-yellow-500" /> },
    { label: 'Testimonials', value: testimonialCount, icon: <UsersRound className="w-6 h-6 text-purple-500" /> },
  ];

  const activities = [
    ...recentProjects.map(p => ({
      type: 'project',
      title: p.description.slice(0, 40) + '...',
      img: p.image?.data ? `data:image/jpeg;base64,${Buffer.from(p.image.data).toString('base64')}` : null,
      user: 'Admin',
      time: p.createdAt,
    })),
    ...recentBlogs.map(b => ({
      type: 'blog',
      title: b.title,
      img: b.image?.data ? `data:image/jpeg;base64,${Buffer.from(b.image.data).toString('base64')}` : null,
      user: 'Admin',
      time: b.createdAt,
    })),
    ...recentQuotes.map(q => ({
      type: 'quote',
      title: `Quote request from ${q.name} (${q.service})`,
      user: q.name,
      time: q.createdAt,
    })),
    ...recentTestimonials.map(t => ({
      type: 'testimonial',
      title: `Testimonial from ${t.name}`,
      user: t.name,
      time: t.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 10);

  const typeIcons = {
    project: <FolderKanban className="w-5 h-5 text-blue-500" />,
    blog: <FileText className="w-5 h-5 text-green-500" />,
    quote: <QuoteIcon className="w-5 h-5 text-yellow-500" />,
    testimonial: <UsersRound className="w-5 h-5 text-purple-500" />,
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 overflow-x-hidden">
      <AdminNav />
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <LayoutDashboard className="w-7 h-7" />
        Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{stat.label}</h2>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            {stat.icon}
          </div>
        ))}
      </div>

      {/* Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Recent Activity
        </h2>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No recent activities</p>
          ) : (
            activities.map((act, idx) => (
              <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-3 flex items-start gap-3">
                {typeIcons[act.type]}
                {['project', 'blog'].includes(act.type) && act.img ? (
                  <div className="flex gap-3 items-center">
                    <Image src={act.img} alt={act.title} width={60} height={60} className="rounded-lg object-cover" />
                    <div>
                      <p className="font-medium">{act.title}</p>
                      <p className="text-xs text-gray-500">{new Date(act.time).toLocaleString()}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{act.user}</span> — {act.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(act.time).toLocaleString()}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
