'use client';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { useEffect, useState } from 'react';

interface FooterLink {
  label: string;
  url: string;
}

interface FooterData {
  title: string;
  links: FooterLink[];
}

export function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      const data = await client.fetch(
        groq`*[_type == "footer"][0]{
          title,
          links[]{
            label,
            url
          }
        }`
      );
      setFooterData(data);
    };
    fetchFooter();
  }, []);

  return (
    <footer className="flex items-center justify-between" id="footer">
      {footerData?.links?.map((link) => (
        <Link key={link.label} className="menuitem" href={link.url}>
          {link.label}
        </Link>
      ))}
      <Link className="login" href="#">Log In</Link>
    </footer>
  );
}