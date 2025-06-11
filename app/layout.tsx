import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import AdminLayout from "./components/AdminLayout";


const inter = Inter({
  weight: "400",
  variable:'--font-inter',
  display: 'swap',
  subsets: ["latin"],
  preload:false
});
const poppins = Poppins({
  weight: "400",
  variable:'--font-poppins',
  display: 'swap',
  subsets: ["latin"],
  preload:false
});

export const metadata: Metadata = {
  robots: "index, follow",
 
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable}  antialiased`}
      >
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
