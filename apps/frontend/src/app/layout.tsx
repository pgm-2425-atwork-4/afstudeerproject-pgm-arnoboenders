import type { Metadata } from "next";

import "@/app/globals.css";
import { OrderProvider } from "@/components/context/OrderProvider";

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
        <OrderProvider>{children}</OrderProvider>
      </body>
    </html>
  );
}
