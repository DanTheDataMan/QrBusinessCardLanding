import { notFound } from "next/navigation";
import { getCardBySlug } from "@/lib/db";
import type { Metadata } from "next";
import VCardDisplay from "./VCardDisplay";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = getCardBySlug(slug);
  if (!card) return { title: "Not Found" };
  return {
    title: `${card.first_name} ${card.last_name}${card.title ? ` — ${card.title}` : ""}`,
    description: card.bio || `Contact card for ${card.first_name} ${card.last_name}`,
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const card = getCardBySlug(slug);

  if (!card) {
    notFound();
  }

  return <VCardDisplay card={card} />;
}
