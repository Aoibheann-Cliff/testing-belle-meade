import Link from 'next/link';

export function Footer() {
  return (
      <footer className="flex items-center justify-between">
        <Link className="menuitem" href="/team">Team</Link>
        <Link className="menuitem" href="/legal">Legal</Link>
        <Link className="menuitem" href="https://www.hud.gov/offices/fheo/promotingfh/928-1.pdf" target="_blank">Fair Housing</Link>
        <Link className="login" href="">Log In</Link>
      </footer>
  )
}