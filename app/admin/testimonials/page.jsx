"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminTestimonials = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    name: "", location: "", project: "", text: "", rating: 5,
  });

  const fetchData = async () => {
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setList(data);
  };

  const handleCreate = async () => {
    await fetch("/api/testimonials", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    setForm({ name: "", location: "", project: "", text: "", rating: 5 });
    fetchData();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-10">
      <Card>
        <CardHeader>
          <CardTitle>Create Testimonial</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Input placeholder="Project" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} />
          <Input placeholder="Rating (1-5)" type="number" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
          <Input placeholder="Testimonial" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
          <Button onClick={handleCreate}>Add</Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {list.map((item) => (
          <Card key={item._id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.project}</p>
              <p className="text-sm mt-2 italic">"{item.text}"</p>
              <Button variant="destructive" onClick={() => handleDelete(item._id)} className="mt-4">
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;