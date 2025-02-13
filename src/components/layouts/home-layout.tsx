import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";

// Add the same fonts as the root layout
const geistSans = localFont({
  src: "../../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pricing - Choose Your Plan",
  description: "Select the best plan for your needs",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
      >
        <header className="bg-gray-800 text-white py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Upgrade Your Plan</h1>
          </div>
        </header>
        <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        <footer className="bg-gray-200 text-center py-4">
          <p className="text-sm text-gray-600">© 2025 Your Company. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}
