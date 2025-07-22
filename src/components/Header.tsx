'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';
import symbol from '../app/symbol.svg';
import purplesymbol from '../app/purple-symbol.svg';
import ContactForm from '@/components/ContactForm';


interface FooterLink {
  label: string;
  url: string;
  style: string;
}

interface FooterData {
  title: string;
  links: FooterLink[];
}

// Footer component moved to top level
function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      const data = await client.fetch(
        groq`*[_type == "footer"][0]{
          title,
          links[]{
            label,
            style,
            url
          }
        }`
      );
      setFooterData(data);
    };
    fetchFooter();
  }, []);
  return (
    <>
      {footerData?.links?.map((link) => (
        <Link
        key={link.label}
        className={link.style === 'button' ? 'footer-button' : 'menuitem'}
        href={link.url}
      >
        {link.label}
      </Link>
      ))}
    </>
  );
}

interface MenuItem {
  label: string;
  url: string;
  image?: any;
}

export function Header() {
  const pathname = usePathname();
  const [leftMenu, setLeftMenu] = useState<MenuItem[]>([]);
  const [rightMenu, setRightMenu] = useState<MenuItem[]>([]);
  // Only ever two images: current (fading in) and previous (fading out)
  const [currentImage, setCurrentImage] = useState<{ src: string; alt: string; visible: boolean; key: string } | null>(null);
  const [prevImage, setPrevImage] = useState<{ src: string; alt: string; visible: boolean; key: string } | null>(null);
  const fadeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const menuQuery = groq`*[_type == "menu" && (title == "Left Menu" || title == "Right Menu")] {
      title,
      items[]{
        label,
        url,
        image
      }
    }`;
    const fetchMenus = async () => {
      const menus = await client.fetch(menuQuery);
      const left = menus.find((m: any) => m.title === 'Left Menu');
      const right = menus.find((m: any) => m.title === 'Right Menu');
      setLeftMenu(left?.items || []);
      setRightMenu(right?.items || []);
    };
    fetchMenus();
  }, []);

  const handleMouseEnter = (item: MenuItem) => {
    if (item.image) {
      const src = urlFor(item.image).width(1920).height(1080).url();
      const alt = item.label;
      const key = src + Date.now();
      // Fade out previous currentImage
      if (currentImage) {
        setPrevImage({ ...currentImage, visible: false });
        if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
        fadeTimeout.current = setTimeout(() => {
          setPrevImage(null);
        }, 600);
      }
      setCurrentImage({ src, alt, visible: false, key });
      setTimeout(() => {
        setCurrentImage((img) => img ? { ...img, visible: true } : img);
      }, 10);
    }
  };

  const handleMouseLeave = () => {
    if (currentImage) {
      setPrevImage({ ...currentImage, visible: false });
      setCurrentImage(null);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
      fadeTimeout.current = setTimeout(() => {
        setPrevImage(null);
      }, 600);
    }
  };

  return (
    <>
      {pathname === '/' && (
        <>
          {prevImage && (
            <div
              key={prevImage.key}
              className="menu-hover-image-full"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 4,
                pointerEvents: 'none',
                opacity: prevImage.visible ? 1 : 0,
                transition: 'opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <div className="slide-overlay"></div>
              <Image
                src={prevImage.src}
                alt={prevImage.alt}
                fill
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                priority
              />
            </div>
          )}
          {currentImage && (
            <div
              key={currentImage.key}
              className="menu-hover-image-full"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 4,
                pointerEvents: 'none',
                opacity: currentImage.visible ? 1 : 0,
                transition: 'opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <div className="slide-overlay"></div>
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                priority
              />
            </div>
          )}
        </>
      )}
      <header className="flex items-center justify-between bg-transparent" id="header">
        <div className="left-menu bg-transparent" id="leftMenu">
          <a className="nav-toggle" id="navToggle">
            <div className="bar" id="firstBar"></div>
            <div className="bar" id="secondBar"></div>
            <div className="bar" id="thirdBar"></div>
          </a>
          {leftMenu.map((item) => (
            <div
              key={item.label}
              className="menuitem-container"
              style={{ position: 'relative', display: 'inline-block' }}
            >
              <Link
                className="menuitem"
                href={item.url}
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="siteLogo bg-transparent">
          <Link className="" href="/">
            <Image id="logo" src={symbol} alt="" />
            <Image id="purpleLogo" src={purplesymbol} alt="" />
          </Link>
        </div>
        <div className="right-menu bg-transparent" id="rightMenu">
          {rightMenu.map((item) => (
            <div
              key={item.label}
              className="menuitem-container"
              style={{ position: 'relative', display: 'inline-block' }}
            >
              <Link
                className="menuitem"
                href={item.url}
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
              >
                {item.label}
              </Link>
            </div>
          ))}
          <div className="inquire" id="openForm">Inquire</div>
        </div>
        <div id="mobileMenu">
          <div id="menuBackground" className="menu-background"></div>
          <div id="menu">
            {leftMenu.concat(rightMenu).map((item) => (
              <Link
                key={item.label}
                className={`menuitem ${pathname === item.url ? 'active' : ''}`}
                href={item.url}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="form-footer menu-footer" id="menuFooter">
            <a className="addresslink" href="4500 Harding Pike, Nashville, TN 37205, USA" target="_blank">
              <h6>4500 Harding Pike, Nashville</h6>
            </a>
            <div className="form-footer-menu" id="menuFooter">
              <Footer />
            </div>
            <div className="mobileinquire" id="mobileopenForm">Inquire</div>
          </div>
        </div>
        <ContactForm />
      </header>
    </>
  );
}