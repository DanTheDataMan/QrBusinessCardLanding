import { Card } from "./db";

export function generateVcf(card: Card): string {
  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${card.last_name};${card.first_name};;;`,
    `FN:${card.first_name} ${card.last_name}`,
  ];

  if (card.company) lines.push(`ORG:${card.company}`);
  if (card.title) lines.push(`TITLE:${card.title}`);
  if (card.phone) lines.push(`TEL;TYPE=WORK,VOICE:${card.phone}`);
  if (card.email) lines.push(`EMAIL;TYPE=INTERNET:${card.email}`);
  if (card.website) lines.push(`URL:${card.website}`);
  if (card.address) lines.push(`ADR;TYPE=WORK:;;${card.address};;;;`);
  if (card.bio) lines.push(`NOTE:${card.bio}`);
  if (card.photo_url) lines.push(`PHOTO;VALUE=URI:${card.photo_url}`);
  if (card.linkedin) lines.push(`X-SOCIALPROFILE;TYPE=linkedin:${card.linkedin}`);
  if (card.twitter) lines.push(`X-SOCIALPROFILE;TYPE=twitter:${card.twitter}`);

  lines.push("END:VCARD");
  return lines.join("\r\n");
}
