import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bharat Unbound | Discover India beyond the ordinary",
  description:
    "Thoughtfully made journeys for the places you dream about, the stories you want to hear, and the India waiting just around the corner.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
