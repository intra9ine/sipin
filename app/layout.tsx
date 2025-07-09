import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AdminLayout from "./components/AdminLayout";



const poppins = Poppins({
  weight: "400",
  variable:'--font-poppins',
  display: 'swap',
  subsets: ["latin"],
  preload:false
});

export const metadata: Metadata = {
  robots: "index, follow",
  title: "SIPIN",
  description: "Secure Investment platform",
  
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}  antialiased`}
      >
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
