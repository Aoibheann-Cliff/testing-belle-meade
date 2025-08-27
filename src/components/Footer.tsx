'use client';

import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { useEffect, useState } from 'react';

interface FooterLink {
  label: string;
  url: string;
  style?: string;
  newTab?: boolean; // add this
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
            style,
            url,
            newTab // fetch the new field
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
        <Link
          key={link.label}
          className={link.style === 'button' ? 'footer-button' : 'menuitem'}
          href={link.url}
          target={link.newTab ? '_blank' : undefined} // open in new tab if true
          rel={link.newTab ? 'noopener noreferrer' : undefined} // security for new tab
        >
          {link.label}
        </Link>
      ))}
    </footer>
  );
}
