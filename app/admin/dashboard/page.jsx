// app/admin/dashboard/page.jsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDB } from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import Blog from '@/lib/models/Blog';
import Testimonial from '@/lib/models/Testimonial';
import Quote from '@/lib/models/Quote';

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

  const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(5).lean();

  const stats = [
    { label: 'Projects', value: projectCount, icon: <FolderKanban className="w-6 h-6 text-blue-500" /> },
    { label: 'Blogs', value: blogCount, icon: <FileText className="w-6 h-6 text-green-500" /> },
    { label: 'Quotes', value: quoteCount, icon: <QuoteIcon className="w-6 h-6 text-yellow-500" /> },
    { label: 'Testimonials', value: testimonialCount, icon: <UsersRound className="w-6 h-6 text-purple-500" /> },
  ];

  const activities = recentProjects.map((proj) => ({
    action: `New project added: "${proj.description.slice(0, 40)}"...`,
    user: 'Admin',
    time: new Date(proj.createdAt).toLocaleString(),
  }));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <LayoutDashboard className="w-7 h-7" />
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{stat.label}</h2>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            {stat.icon}
          </div>
        ))}
      </div>

      {/* Activity Log */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Recent Activity
        </h2>
        <ul className="space-y-3">
          {activities.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No recent activities</p>
          ) : (
            activities.map((activity, idx) => (
              <li key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span> — {activity.action}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
