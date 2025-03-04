import type { Metadata } from "next";
import Navigation from "@/components/design/navigation/Navigation";
import Footer from "@/components/design/footer/Footer";
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
    <OrderProvider>
      <Navigation />
      {children}
      <Footer />
    </OrderProvider>
  );
}
