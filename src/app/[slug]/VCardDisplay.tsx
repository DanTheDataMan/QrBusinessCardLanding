"use client";

import type { Card } from "@/lib/db";

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

export default function VCardDisplay({ card }: { card: Card }) {
  const initials = `${card.first_name[0] || ""}${card.last_name[0] || ""}`.toUpperCase();

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4"
      style={{
        background: `linear-gradient(135deg, ${card.primary_color} 0%, ${card.secondary_color} 100%)`,
        fontFamily: card.font_family,
      }}
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Header Banner */}
          <div
            className="relative h-32"
            style={{
              background: `linear-gradient(135deg, ${card.primary_color} 0%, ${card.accent_color} 100%)`,
            }}
          >
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              {card.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.photo_url}
                  alt={`${card.first_name} ${card.last_name}`}
                  className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                />
              ) : (
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white text-2xl font-bold shadow-lg"
                  style={{
                    backgroundColor: card.accent_color,
                    color: card.text_color,
                  }}
                >
                  {initials}
                </div>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="px-6 pt-16 pb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {card.first_name} {card.last_name}
            </h1>
            {card.title && (
              <p className="mt-1 text-gray-600" style={{ color: card.accent_color }}>
                {card.title}
              </p>
            )}
            {card.company && (
              <p className="text-sm font-medium text-gray-500">{card.company}</p>
            )}
            {card.bio && (
              <p className="mt-4 text-sm leading-relaxed text-gray-600">{card.bio}</p>
            )}
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-100 px-6 py-4">
            <div className="space-y-3">
              {card.email && (
                <a
                  href={`mailto:${card.email}`}
                  className="flex items-center gap-3 rounded-lg p-2 text-gray-700 transition hover:bg-gray-50"
                >
                  <span style={{ color: card.accent_color }}><MailIcon /></span>
                  <span className="text-sm">{card.email}</span>
                </a>
              )}
              {card.phone && (
                <a
                  href={`tel:${card.phone}`}
                  className="flex items-center gap-3 rounded-lg p-2 text-gray-700 transition hover:bg-gray-50"
                >
                  <span style={{ color: card.accent_color }}><PhoneIcon /></span>
                  <span className="text-sm">{card.phone}</span>
                </a>
              )}
              {card.website && (
                <a
                  href={card.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg p-2 text-gray-700 transition hover:bg-gray-50"
                >
                  <span style={{ color: card.accent_color }}><GlobeIcon /></span>
                  <span className="text-sm">{card.website}</span>
                </a>
              )}
              {card.address && (
                <div className="flex items-center gap-3 rounded-lg p-2 text-gray-700">
                  <span style={{ color: card.accent_color }}><MapPinIcon /></span>
                  <span className="text-sm">{card.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          {(card.linkedin || card.twitter) && (
            <div className="border-t border-gray-100 px-6 py-4">
              <div className="flex items-center justify-center gap-4">
                {card.linkedin && (
                  <a
                    href={card.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 transition hover:bg-gray-100"
                    style={{ color: card.accent_color }}
                  >
                    <LinkedInIcon />
                  </a>
                )}
                {card.twitter && (
                  <a
                    href={card.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 transition hover:bg-gray-100"
                    style={{ color: card.accent_color }}
                  >
                    <TwitterIcon />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Save Contact Button */}
          <div className="border-t border-gray-100 px-6 py-4">
            <a
              href={`/api/cards/${card.id}/vcf`}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 font-medium text-white transition hover:opacity-90"
              style={{ backgroundColor: card.primary_color }}
            >
              <DownloadIcon />
              Save Contact
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs opacity-60" style={{ color: card.text_color }}>
          Digital Business Card
        </p>
      </div>
    </div>
  );
}
