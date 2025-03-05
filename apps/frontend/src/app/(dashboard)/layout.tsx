import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loos-backoffice",
  description: "Backoffice loos merchtem",
};

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <> {children}</>; // No nav, no footer
}
