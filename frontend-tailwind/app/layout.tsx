import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "New app",
  description: "Some experiencing in NextJS 14",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:flex md:w-64 bg-teal-700 justify-center items-center">
            <h1>Sidenav</h1>
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:px-6 md:pt-12">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
