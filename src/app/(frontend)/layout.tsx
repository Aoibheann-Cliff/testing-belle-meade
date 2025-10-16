import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SanityLive } from "@/sanity/lib/live";
import Script from "next/script";

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  return (
    <section className="min-h-screen">
      <Header />
      {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
      )}
      <main className="flex-grow">{children}</main>
      <Footer />
      <SanityLive />
    </section>
  );
}
