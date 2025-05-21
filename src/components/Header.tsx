import Link from 'next/link';
import Image from "next/image";
import symbol from '../app/symbol.svg';
import ContactForm from "@/components/ContactForm";

export function Header() {
  return (
      <header className="flex items-center justify-between" id="header">
      <div className="left-menu" id="leftMenu">
      <a className="nav-toggle" id="navToggle">
          <div className="bar" id="firstBar"></div>
          <div className="bar" id="secondBar"></div>
          <div className="bar" id="thirdBar"></div>
        </a>
        <Link className="menuitem design" href="/design">Design</Link>
        <Link className="menuitem craftsmanship" href="/craftsmanship">Craftsmanship</Link>
        <Link className="menuitem residences" href="/residences">Residences</Link>
        <Link className="menuitem amenities" href="/amenities">Amenities</Link>
      </div>
      <div className="siteLogo">
        <Link className="" href="/">
          <Image  id="logo" src={symbol} alt=""/>
        </Link>
      </div>
      <div className="right-menu" id="rightMenu">
        <Link className="menuitem park" href="/park-and-gardens">Park & Gardens</Link>
        <Link className="menuitem village" href="/belle-meade-village">Belle Meade Village</Link>
        <div className="inquire" id="openForm">Inquire</div>
      </div>
      <div id="mobileMenu">
        <div id="menu">
        <Link className="menuitem design" href="/design">Design</Link>
        <Link className="menuitem craftsmanship" href="/craftsmanship">Craftsmanship</Link>
        <Link className="menuitem residences" href="/residences">Residences</Link>
        <Link className="menuitem amenities" href="/amenities">Amenities</Link>
        <Link className="menuitem park" href="/park-and-gardens">Park & Gardens</Link>
        <Link className="menuitem village" href="/belle-meade-village">Belle Meade Village</Link>
        </div>
        <div className="form-footer menu-footer" id="menuFooter">
      <a className="addresslink" href="4500 Harding Pike, Nashville, TN 37205, USA" target="_blank"><h6>4500 Harding Pike, Nashville</h6></a>
      <div className="form-footer-menu" id="menuFooter">
        <Link className="menuitem" href="/team"><h6>Team</h6></Link>
        <Link className="menuitem" href="/legal"><h6>Legal</h6></Link>
        <Link className="menuitem" href="https://www.hud.gov/offices/fheo/promotingfh/928-1.pdf" target="_blank"><h6>Fair Housing</h6></Link>
        <Link className="login" href=""><h6>Log In</h6></Link>
      </div>
      <div className="mobileinquire" id="mobileopenForm">Inquire</div>
      </div>
      </div>
      <ContactForm />
      </header>
  )
}