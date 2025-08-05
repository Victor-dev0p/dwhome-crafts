'use client';
import ProjectForm from '@/components/Admin/ProjectForm';

export default function AdminProjectsPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Add New Project</h1>
      <ProjectForm />
    </div>
  );
}
