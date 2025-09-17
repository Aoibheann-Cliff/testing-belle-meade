// @ts-nocheck
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from 'gsap';
import purplesymbol from '../app/purple-symbol.svg';
import symbol from '../app/symbol.svg';

export default function GlobalPageEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const symbolimg = document.getElementById('symbol');
    const logotype = document.getElementById('logotype');

    const overlay = document.getElementById('overlay');
    overlay.style.opacity = "1";
    overlay.style.background = "#4C2F48";

    function popupScroll() {
          overlay.style.opacity = "1";
          setTimeout(() => {
            symbolimg.style.opacity = "1";
          }, 1000);
          setTimeout(() => {
            symbolimg.style.opacity = "0";
          }, 2500);
          setTimeout(() => {
            symbolimg.style.display = "none";
            logotype.style.opacity = "1";
          }, 3500);
          setTimeout(() => {
            overlay.style.opacity = "0";
          }, 5000);
          setTimeout(() => {
            overlay.style.display = "none";
          }, 6000);
  }
  popupScroll();

  }, []);

  return null;
}
