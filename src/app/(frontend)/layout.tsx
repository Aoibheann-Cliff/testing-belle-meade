import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SanityLive } from "@/sanity/lib/live";

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen">
      <Header />
      <Analytics/>
      <main className="flex-grow">{children}</main>
      <Footer />
      <SanityLive />
    </section>
  );
}
