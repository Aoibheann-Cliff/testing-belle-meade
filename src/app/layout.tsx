// app/layout.tsx
import "@/app/globals.css";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { metaDataQuery } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(metaDataQuery);

  return {
    title: data?.title || "Default Site Title",
    description: data?.description || "Default site description",
    keywords: data?.keywords?.split(",") || [],
    openGraph: {
      title: data?.title,
      description: data?.description,
      images: data?.socialImage ? [{ url: data.socialImage }] : [],
      type: "website",
      url: "https://example.com",
    },
    twitter: {
      card: "summary_large_image",
      title: data?.title,
      description: data?.description,
      images: data?.socialImage ? [data.socialImage] : [],
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png" }],
      other: [
        { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
        { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
      ],
    },
    manifest: "/site.webmanifest",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/jquery-nice-select@1.1.0/css/nice-select.css"
        />
      </body>
    </html>
  );
}