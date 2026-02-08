import { NextRequest, NextResponse } from "next/server";
import { getCardById } from "@/lib/db";
import { generateVcf } from "@/lib/vcf";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const card = getCardById(id);
  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  const vcf = generateVcf(card);
  const filename = `${card.first_name}_${card.last_name}.vcf`;

  return new NextResponse(vcf, {
    headers: {
      "Content-Type": "text/vcard",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
