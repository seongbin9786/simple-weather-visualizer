import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather Visualizer",
  description: "weather visualization for korean territory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-gray-100 text-gray-700">{children}</body>
    </html>
  );
}
