"use client";

import { useState, useEffect, useCallback } from "react";

interface Card {
  id: string;
  slug: string;
  first_name: string;
  last_name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  bio: string;
  photo_url: string;
  linkedin: string;
  twitter: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  text_color: string;
  font_family: string;
}

const EMPTY_FORM: Omit<Card, "id"> = {
  slug: "",
  first_name: "",
  last_name: "",
  title: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  bio: "",
  photo_url: "",
  linkedin: "",
  twitter: "",
  primary_color: "#1a1a2e",
  secondary_color: "#16213e",
  accent_color: "#0f3460",
  text_color: "#ffffff",
  font_family: "Inter, sans-serif",
};

export default function AdminPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [form, setForm] = useState<Omit<Card, "id">>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [qrData, setQrData] = useState<{ qr: string; url: string } | null>(null);
  const [message, setMessage] = useState("");

  const loadCards = useCallback(async () => {
    const res = await fetch("/api/cards");
    const data = await res.json();
    setCards(data);
  }, []);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (editingId) {
      const res = await fetch(`/api/cards/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage("Card updated successfully!");
        setEditingId(null);
        setForm(EMPTY_FORM);
        loadCards();
      } else {
        const err = await res.json();
        setMessage(`Error: ${err.error}`);
      }
    } else {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage("Card created successfully!");
        setForm(EMPTY_FORM);
        loadCards();
      } else {
        const err = await res.json();
        setMessage(`Error: ${err.error}`);
      }
    }
  };

  const handleEdit = (card: Card) => {
    setEditingId(card.id);
    setForm({
      slug: card.slug,
      first_name: card.first_name,
      last_name: card.last_name,
      title: card.title,
      company: card.company,
      email: card.email,
      phone: card.phone,
      website: card.website,
      address: card.address,
      bio: card.bio,
      photo_url: card.photo_url,
      linkedin: card.linkedin,
      twitter: card.twitter,
      primary_color: card.primary_color,
      secondary_color: card.secondary_color,
      accent_color: card.accent_color,
      text_color: card.text_color,
      font_family: card.font_family,
    });
    setQrData(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this card?")) return;
    await fetch(`/api/cards/${id}`, { method: "DELETE" });
    setMessage("Card deleted.");
    loadCards();
  };

  const handleQr = async (id: string) => {
    const res = await fetch(`/api/cards/${id}/qr`);
    const data = await res.json();
    setQrData(data);
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setQrData(null);
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Admin — QR Business Card Manager
        </h1>

        {message && (
          <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4 text-blue-800">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-10 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            {editingId ? "Edit Card" : "Create New Landing Card"}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">URL Slug *</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="john-doe"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">First Name *</label>
              <input
                type="text"
                value={form.first_name}
                onChange={(e) => updateField("first_name", e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Last Name *</label>
              <input
                type="text"
                value={form.last_name}
                onChange={(e) => updateField("last_name", e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Website</label>
              <input
                type="url"
                value={form.website}
                onChange={(e) => updateField("website", e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Photo URL</label>
              <input
                type="url"
                value={form.photo_url}
                onChange={(e) => updateField("photo_url", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">LinkedIn URL</label>
              <input
                type="url"
                value={form.linkedin}
                onChange={(e) => updateField("linkedin", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Twitter URL</label>
              <input
                type="url"
                value={form.twitter}
                onChange={(e) => updateField("twitter", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="mb-1 block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Design Settings */}
          <h3 className="mt-6 mb-3 text-lg font-semibold text-gray-800">Design Settings</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Primary Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={form.primary_color}
                  onChange={(e) => updateField("primary_color", e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={form.primary_color}
                  onChange={(e) => updateField("primary_color", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Secondary Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={form.secondary_color}
                  onChange={(e) => updateField("secondary_color", e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={form.secondary_color}
                  onChange={(e) => updateField("secondary_color", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Accent Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={form.accent_color}
                  onChange={(e) => updateField("accent_color", e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={form.accent_color}
                  onChange={(e) => updateField("accent_color", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Text Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={form.text_color}
                  onChange={(e) => updateField("text_color", e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={form.text_color}
                  onChange={(e) => updateField("text_color", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900"
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Font Family</label>
            <select
              value={form.font_family}
              onChange={(e) => updateField("font_family", e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="Georgia, serif">Georgia (Serif)</option>
              <option value="Courier New, monospace">Courier New (Monospace)</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="Verdana, sans-serif">Verdana</option>
            </select>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
            >
              {editingId ? "Update Card" : "Create Card"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* QR Code Display */}
        {qrData && (
          <div className="mb-10 rounded-xl bg-white p-6 shadow-md text-center">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">QR Code</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrData.qr} alt="QR Code" className="mx-auto mb-4 h-64 w-64" />
            <p className="text-gray-600">
              Landing URL:{" "}
              <a
                href={qrData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {qrData.url}
              </a>
            </p>
          </div>
        )}

        {/* Cards List */}
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Existing Cards</h2>
        {cards.length === 0 ? (
          <p className="text-gray-500">No cards created yet. Create one above!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {cards.map((card) => (
              <div key={card.id} className="rounded-xl bg-white p-5 shadow-md">
                <div className="mb-2 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      backgroundColor: card.primary_color,
                      color: card.text_color,
                    }}
                  >
                    {card.first_name[0]}
                    {card.last_name[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {card.first_name} {card.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      /{card.slug}
                      {card.title && ` · ${card.title}`}
                      {card.company && ` at ${card.company}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(card)}
                    className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleQr(card.id)}
                    className="rounded bg-green-100 px-3 py-1 text-sm text-green-700 hover:bg-green-200"
                  >
                    QR Code
                  </button>
                  <a
                    href={`/${card.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200"
                  >
                    Preview
                  </a>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="rounded bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
