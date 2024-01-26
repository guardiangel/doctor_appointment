import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import Navbar from "./(shared)/Navbar";

const openSans = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Document Appointment System",
  description: "Build in Next js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/** set up suppressHydrationWarning to avoid the error:Extra attributes from the server: data-new-gr-c-s-check-loaded,data-gr-ext-installed*/}
      <body className={openSans.className} suppressHydrationWarning={true}>
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
