'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import symbol from '../app/symbol.svg';
import purplesymbol from '../app/purple-symbol.svg';
import ContactForm from '@/components/ContactForm';

interface PageData {
  title: string;
  slug: string;
}

export function Header() {
  const [designPage, setDesignPage] = useState<PageData | null>(null);
  const [craftsmanshipPage, setCraftsmanshipPage] = useState<PageData | null>(null);
  const [residencesPage, setResidencesPage] = useState<PageData | null>(null);
  const [amenitiesPage, setAmenitiesPage] = useState<PageData | null>(null);
  const [parkPage, setParkPage] = useState<PageData | null>(null);
  const [villagePage, setVillagePage] = useState<PageData | null>(null);
  const [teamPage, setTeamPage] = useState<PageData | null>(null);
  const [legalPage, setLegalPage] = useState<PageData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const designdata = await client.fetch(
        groq`*[_id == "943fada5-3ce6-4c3e-adc7-df42ed737f1e"][0]{
          title,
          "slug": slug.current
        }`
      );
      setDesignPage(designdata);

      const craftsmanshipdata = await client.fetch(
        groq`*[_id == "a2c3d63f-6a92-4fac-b3cb-2655f4d01883"][0]{
          title,
          "slug": slug.current
        }`
      );
      setCraftsmanshipPage(craftsmanshipdata);

      const residencesdata = await client.fetch(
        groq`*[_id == "dd8fc234-38be-4d2a-b7a4-5bf54a630fc9"][0]{
          title,
          "slug": slug.current
        }`
      );
      setResidencesPage(residencesdata);

      const amenitiesdata = await client.fetch(
        groq`*[_id == "6cdccbdb-98aa-41e8-81fd-cfb4d8c6942f"][0]{
          title,
          "slug": slug.current
        }`
      );
      setAmenitiesPage(amenitiesdata);

      const parkdata = await client.fetch(
        groq`*[_id == "6089a43f-2ded-4b90-a037-22359653cb78"][0]{
          title,
          "slug": slug.current
        }`
      );
      setParkPage(parkdata);

      const villagedata = await client.fetch(
        groq`*[_id == "bbb09081-bee7-496a-b6fa-303cc8625205"][0]{
          title,
          "slug": slug.current
        }`
      );
      setVillagePage(villagedata);

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
    <header className="flex items-center justify-between" id="header">
      <div className="left-menu" id="leftMenu">
        <a className="nav-toggle" id="navToggle">
          <div className="bar" id="firstBar"></div>
          <div className="bar" id="secondBar"></div>
          <div className="bar" id="thirdBar"></div>
        </a>
        {designPage && (
          <Link className="menuitem design" href={`/${designPage.slug}`}>
            {designPage.title}
          </Link>
        )}
        {craftsmanshipPage && (
          <Link className="menuitem craftsmanship" href={`/${craftsmanshipPage.slug}`}>
            {craftsmanshipPage.title}
          </Link>
        )}
        {residencesPage && (
          <Link className="menuitem residences" href={`/${residencesPage.slug}`}>
            {residencesPage.title}
          </Link>
        )}
        {amenitiesPage && (
          <Link className="menuitem amenities" href={`/${amenitiesPage.slug}`}>
            {amenitiesPage.title}
          </Link>
        )}
      </div>
      <div className="siteLogo">
        <Link className="" href="/">
          <Image id="logo" src={symbol} alt=""/>
          <Image id="purpleLogo" src={purplesymbol} alt=""/>
        </Link>
      </div>
      <div className="right-menu" id="rightMenu">
      {parkPage && (
          <Link className="menuitem park" href={`/${parkPage.slug}`}>
            {parkPage.title}
          </Link>
        )}
        {villagePage && (
          <Link className="menuitem village" href={`/${villagePage.slug}`}>
            {villagePage.title}
          </Link>
        )}
        <div className="inquire" id="openForm">Inquire</div>
      </div>
      <div id="mobileMenu">
        <div id="menuBackground" className="menu-background"></div>
        <div id="menu">
          {designPage && (
            <Link className="menuitem design" href={`/${designPage.slug}`}>
              {designPage.title}
            </Link>
          )}
        {craftsmanshipPage && (
          <Link className="menuitem craftsmanship" href={`/${craftsmanshipPage.slug}`}>
            {craftsmanshipPage.title}
          </Link>
        )}
        {residencesPage && (
          <Link className="menuitem residences" href={`/${residencesPage.slug}`}>
            {residencesPage.title}
          </Link>
        )}
        {amenitiesPage && (
          <Link className="menuitem amenities" href={`/${amenitiesPage.slug}`}>
            {amenitiesPage.title}
          </Link>
        )}
      {parkPage && (
          <Link className="menuitem park" href={`/${parkPage.slug}`}>
            {parkPage.title}
          </Link>
        )}
        {villagePage && (
          <Link className="menuitem village" href={`/${villagePage.slug}`}>
            {villagePage.title}
          </Link>
        )}
        </div>
        <div className="form-footer menu-footer" id="menuFooter">
          <a className="addresslink" href="4500 Harding Pike, Nashville, TN 37205, USA" target="_blank">
            <h6>4500 Harding Pike, Nashville</h6>
          </a>
          <div className="form-footer-menu" id="menuFooter">
          {teamPage && (
          <Link className="menuitem team" href={`/${teamPage.slug}`}>
            <h6>
              {teamPage.title}
            </h6>
          </Link>
        )}
        {legalPage && (
          <Link className="menuitem legal" href={`/${legalPage.slug}`}>
            <h6>
              {legalPage.title}
            </h6>
          </Link>
        )}
            <Link className="menuitem" href="https://www.hud.gov/offices/fheo/promotingfh/928-1.pdf" target="_blank"><h6>Fair Housing</h6></Link>
            <Link className="login" href=""><h6>Log In</h6></Link>
          </div>
          <div className="mobileinquire" id="mobileopenForm">Inquire</div>
        </div>
      </div>
      <ContactForm />
    </header>
  );
}