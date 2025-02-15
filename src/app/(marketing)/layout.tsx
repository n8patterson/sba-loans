import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import Image from "next/image";
import Link from "next/link";

// Add the same fonts as the root layout
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pricing - Choose Your Plan",
  description: "Select the best plan for your needs",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
      >
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b bg-white shadow-md px-4">
        <div className="container mx-auto flex items-center px-4">
          <Link href="/" className="flex items-center">
            {/* Logo */}
            <Image
              src="/build-up-icon.png" // Update with your logo filename in the public folder
              alt="BuildUp Logo"
              width={50}
              height={50}
              className="mr-4"
            />
            {/* Text Image */}
            <h1 className="text-3xl font-bold">BuildUp</h1>
            {/* <Image
              src="/build-up-text.png" // Update with your text image filename in the public folder
              alt="BuildUp Text"
              width={120}
              height={40}
            /> */}
          </Link>
          </div>
        </header>
        <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        <footer className="bg-white text-center py-4 border-t shadow-md px-4">
          <p className="text-sm text-gray-600">© 2025 BuildUp. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}
