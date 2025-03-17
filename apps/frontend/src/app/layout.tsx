import type { Metadata } from "next";

import "@/app/globals.css";
import AuthProvider from "@/components/context/AuthProvider";

export const metadata: Metadata = {
  title: "Loos-merchtem",
  description: "Website loos merchtem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={` antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
