// components/Admin/BlogActivityCard.jsx
import Image from 'next/image';
import { FileText } from 'lucide-react';

export default function BlogActivityCard({ blog }) {
  const base64Thumbnail = blog.thumbnail?.data
    ? `data:image/jpeg;base64,${Buffer.from(blog.thumbnail.data).toString('base64')}`
    : null;

  return (
    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition w-full">
      {/* Blog Icon or Thumbnail */}
      {base64Thumbnail ? (
        <Image
          src={base64Thumbnail}
          alt={blog.title}
          width={50}
          height={50}
          className="rounded-md object-cover"
        />
      ) : (
        <div className="w-[50px] h-[50px] flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-md">
          <FileText className="text-gray-500 w-6 h-6" />
        </div>
      )}

      {/* Blog Info */}
      <div className="flex flex-col min-w-0">
        <p className="font-semibold text-sm truncate">{blog.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {blog.snippet || 'No snippet available'}
        </p>
        <span className="text-xs text-gray-400">
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
