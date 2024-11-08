import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { UserContextProvider } from "@/contexts/User";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${process.env.PORT || 3000}`;
const imageUrl = `${baseUrl}/thumbnail.png`;

const title = "Test.it | Prepare, the best way.";
const description =
  "Prepare for coding interviews, with an experience tailored to the company you're interviewing with.";
const iconSizes: `${number}`[] = ["16", "32"];
const images = [
  {
    type: "image/png",
    url: imageUrl,
    width: 960, // Optional width of the image
    height: 660, // Optional height of the image
    alt: description, // Alt text for the image
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  keywords: "Prepare, Test, Interview, Mock Interview, Coding",
  openGraph: {
    type: "website",
    title,
    description,
    images,
  },
  twitter: {
    card: "summary_large_image",
    images,
    title,
    description,
  },
  icons: {
    icon: iconSizes.map((size) => ({
      url: `/favicon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
    })),
    shortcut: "/favicon.ico", // Shortcut icon (favicon)
    apple: "/apple-touch-icon.png", // Icon for Apple devices
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserContextProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-geist-sans antialiased`}
        >
          <TooltipProvider>
            <div className="flex">{children}</div>
          </TooltipProvider>
        </body>
      </UserContextProvider>
    </html>
  );
}
