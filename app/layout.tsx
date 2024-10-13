import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ProviderContainer from "@/providers";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import CreateWorkSpaceModal from "./main/workspaces/_components/CreateWorkSpaceModal";
import ModalContainer from "@/components/ModalContainer";

// If loading a variable font, you don't need to specify the normal weight
// as it can be derived from the other weights.
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Devdutt",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ModalContainer />
          <ProviderContainer>{children}</ProviderContainer>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
