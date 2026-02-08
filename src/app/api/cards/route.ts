import { NextRequest, NextResponse } from "next/server";
import { getAllCards, createCard } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const cards = getAllCards();
  return NextResponse.json(cards);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.first_name || !body.last_name || !body.slug) {
    return NextResponse.json(
      { error: "first_name, last_name, and slug are required" },
      { status: 400 }
    );
  }

  const slug = body.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const card = createCard({
    id: uuidv4(),
    slug,
    first_name: body.first_name || "",
    last_name: body.last_name || "",
    title: body.title || "",
    company: body.company || "",
    email: body.email || "",
    phone: body.phone || "",
    website: body.website || "",
    address: body.address || "",
    bio: body.bio || "",
    photo_url: body.photo_url || "",
    linkedin: body.linkedin || "",
    twitter: body.twitter || "",
    primary_color: body.primary_color || "#1a1a2e",
    secondary_color: body.secondary_color || "#16213e",
    accent_color: body.accent_color || "#0f3460",
    text_color: body.text_color || "#ffffff",
    font_family: body.font_family || "Inter, sans-serif",
  });

  return NextResponse.json(card, { status: 201 });
}
