import { NextRequest, NextResponse } from "next/server";
import { getCardById } from "@/lib/db";
import QRCode from "qrcode";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const card = getCardById(id);
  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  const baseUrl = request.headers.get("x-forwarded-host")
    ? `${request.headers.get("x-forwarded-proto") || "https"}://${request.headers.get("x-forwarded-host")}`
    : new URL(request.url).origin;

  const landingUrl = `${baseUrl}/${card.slug}`;

  const qrDataUrl = await QRCode.toDataURL(landingUrl, {
    width: 400,
    margin: 2,
    color: {
      dark: card.primary_color,
      light: "#ffffff",
    },
  });

  return NextResponse.json({ qr: qrDataUrl, url: landingUrl });
}
