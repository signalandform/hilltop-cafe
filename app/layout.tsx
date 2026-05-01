import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import "../styles.css";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hilltopcoffeeshop.signalandform.net"),
  title: {
    default: "Hilltop Coffee Shop",
    template: "%s | Hilltop Coffee Shop",
  },
  description:
    "Hilltop Coffee Shop blends pastry-case comfort with neon-night energy in Northlake, TX.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/assets/logo-primary.png",
  },
  openGraph: {
    title: "Hilltop Coffee Shop",
    description:
      "Artisan coffee, small-batch bakes, and a bandana-inspired space in Northlake, TX.",
    type: "website",
    url: "https://hilltopcoffeeshop.signalandform.net/",
    images: ["/assets/logo-primary.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={libreBaskerville.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
