import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SanityLive } from "@/sanity/lib/live";
import Script from "next/script";

// Dynamically import client-only component to avoid SSR
const Analytics = dynamic(() => import("@/components/Analytics"), { ssr: false });

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen">
      {/* GA scripts */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-setup" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <Header />

      <Analytics />

      <main className="flex-grow">{children}</main>
      <Footer />
      <SanityLive />
    </section>
  );
}
