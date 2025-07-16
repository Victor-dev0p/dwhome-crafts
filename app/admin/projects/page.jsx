'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const ProjectAdminPage = () => {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({ title: '', description: '' })
  const [loading, setLoading] = useState(false)

  const fetchProjects = async () => {
    const res = await fetch('/api/admin/projects')
    const data = await res.json()
    setProjects(data)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      toast.success('Project created')
      setForm({ title: '', description: '' })
      fetchProjects()
    } else {
      toast.error('Failed to create project')
    }

    setLoading(false)
  }

  const handleDelete = async (id) => {
    const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Deleted')
      fetchProjects()
    } else {
      toast.error('Delete failed')
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Manage Projects</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Project title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Textarea
          placeholder="Project description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Create Project'}
        </Button>
      </form>

      <div className="space-y-4 pt-8">
        <h2 className="text-lg font-semibold">Project List</h2>
        {projects.map((project) => (
          <div
            key={project._id}
            className="border p-4 rounded flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{project.title}</p>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
            <Button
              variant="destructive"
              onClick={() => handleDelete(project._id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectAdminPage