import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar-heatmap/dist/styles.css";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "@/provider/AuthContent";

const geistSans = localFont({
  src: "./public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "Engleet",
  description: "Learn English with Engleet",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} light antialiased`}
      >
        <NextUIProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </NextUIProvider>
        <ToastContainer></ToastContainer>
      </body>
    </html>
  );
}
