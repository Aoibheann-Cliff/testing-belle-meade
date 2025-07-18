'use client';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { useEffect, useState } from 'react';

interface PageData {
  title: string;
  slug: string;
}

export function Footer() {
  const [teamPage, setTeamPage] = useState<PageData | null>(null);
  const [legalPage, setLegalPage] = useState<PageData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const teamdata = await client.fetch(
        groq`*[_id == "d8f59a49-e8bc-4e49-b6ba-5c1bb6ee979b"][0]{
          title,
          "slug": slug.current
        }`
      );
      setTeamPage(teamdata);

      const legaldata = await client.fetch(
        groq`*[_id == "ecd6ff2b-434b-4a36-88c3-d88484466fe3"][0]{
          title,
          "slug": slug.current
        }`
      );
      setLegalPage(legaldata);
    };
    fetchData();
  }, []);

  return (
      <footer className="flex items-center justify-between" id="footer">
          {teamPage && (
          <Link className="menuitem team" href={`/${teamPage.slug}`}>
              {teamPage.title}
          </Link>
        )}
        {legalPage && (
          <Link className="menuitem legal" href={`/${legalPage.slug}`}>
              {legalPage.title}
          </Link>
        )}
        <Link className="menuitem" href="https://www.hud.gov/offices/fheo/promotingfh/928-1.pdf" target="_blank">Fair Housing</Link>
        <Link className="login" href="">Log In</Link>
      </footer>
  )
}