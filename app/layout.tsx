import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "techbdata — целевые контакты для бизнеса",
  description: "Прототип многостраничного сайта techbdata.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
