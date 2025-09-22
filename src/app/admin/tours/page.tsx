"use client";

import { useState } from 'react';

export default function AdminCreateTourPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    country: '',
    duration: '',
    price: '',
    tags: '',
  });
  const [adminKey, setAdminKey] = useState<string>(process.env.NEXT_PUBLIC_ADMIN_SHARED_SECRET || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      console.log('Submitting with adminKey:', adminKey);
      const res = await fetch('/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey || '',
        },
        body: JSON.stringify({
          adminKey,
          title: form.title,
          description: form.description,
          country: form.country,
          duration: form.duration,
          price: Number(form.price),
          tags: form.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create tour');
      }
      setMessage('Tour created and published successfully!');
      setForm({ title: '', description: '', country: '', duration: '', price: '', tags: '' });
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create New Tour</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="adminKey"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          placeholder="Admin Key (must match server secret)"
          className="w-full border rounded p-2"
          required
        />
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Title"
          className="w-full border rounded p-2"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Description"
          className="w-full border rounded p-2"
          rows={4}
          required
        />
        <input
          name="country"
          value={form.country}
          onChange={onChange}
          placeholder="Country"
          className="w-full border rounded p-2"
          required
        />
        <input
          name="duration"
          value={form.duration}
          onChange={onChange}
          placeholder="Duration (e.g., 7 Days)"
          className="w-full border rounded p-2"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={onChange}
          placeholder="Price (number)"
          type="number"
          className="w-full border rounded p-2"
          required
        />
        <input
          name="tags"
          value={form.tags}
          onChange={onChange}
          placeholder="Tags (comma-separated)"
          className="w-full border rounded p-2"
        />

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Tour'}
          </button>
          {message && <span className="text-sm">{message}</span>}
        </div>
      </form>
      <p className="text-xs text-gray-500 mt-4">
        Set NEXT_PUBLIC_ADMIN_SHARED_SECRET in .env.local to send the admin key from the browser.
      </p>
    </div>
  );
}


