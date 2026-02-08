import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QR Business Card Landing",
  description: "QR Business Card Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
