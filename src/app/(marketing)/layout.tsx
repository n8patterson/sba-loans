import Image from "next/image";
import Link from "next/link";

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
    </>
  );
}
