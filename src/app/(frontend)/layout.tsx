import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SanityLive } from "@/sanity/lib/live";
import Script from "next/script";
import ClientLayout from "@/components/ClientLayout";

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen">
      {/* Google Analytics scripts */}
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

      {/* Wrap children in client layout for GA */}
      <ClientLayout>
        <main className="flex-grow">{children}</main>
      </ClientLayout>

      <Footer />
      <SanityLive />
    </section>
  );
}
