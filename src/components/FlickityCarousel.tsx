// @ts-nocheck
'use client';

import { useEffect, useRef, useState } from 'react';
import 'flickity/css/flickity.css'; // Flickity base styles
import 'flickity-fade/flickity-fade.css'; // Fade plugin styles
import gsap from 'gsap';

export default function FlickityCarousel({ children }: { children: React.ReactNode }) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [flickityInstance, setFlickityInstance] = useState<any>(null);

  useEffect(() => {
    let Flickity: any;
    let flkty: any;
  
    // This runs after Flickity selects a slide
    const checkIfLastSlideSelected = () => {
      const nextPageLink = document.getElementById('nextPageLink');
      const nextPageTitle = document.getElementById('next-page-title');

      if (!flkty) return;
  
      const selectedElement = flkty.selectedElement;
      const lastCell = flkty.cells[flkty.cells.length - 1]?.element;
  
      if (selectedElement === lastCell) {
        nextPageLink?.style.setProperty('display', 'flex');
        setTimeout(() => {
          nextPageLink?.style.setProperty('opacity', '1');
        }, 500);
        function myFunction(x) {
          if (x.matches) {
            setTimeout(() => {
              nextPageTitle.style.display = "block";
              gsap.to(nextPageLink, { padding:"3.125rem", maxWidth: "fit-content" , duration: 1, ease: "power3.out",});
            }, 2000);
            setTimeout(() => {
              nextPageTitle.style.opacity = "1";
            }, 3000);
          } else {
            nextPageLink.addEventListener('mouseenter', () => {
              const naturalWidth = nextPageTitle.scrollWidth + "px";
            
              gsap.to(nextPageLink, {
                maxWidth: naturalWidth,
                duration: 1,
                ease: "power3.out"
              });
            
              gsap.to(nextPageTitle, {
                opacity: 1,
                duration: 0.3,
                ease: "power1.out",
                delay: 0.7 // offset to match your timing
              });
            });
            
            nextPageLink.addEventListener('mouseleave', () => {
              gsap.to(nextPageTitle, {
                opacity: 0,
                duration: 0.3,
                ease: "power1.out"
              });
            
              gsap.to(nextPageLink, {
                maxWidth: "3.125rem",
                duration: 1,
                ease: "power3.out",
                delay: 0.3
              });
            });
            
          }
        }
        const x = window.matchMedia("(max-width: 1366px)")
        myFunction(x);
        x.addEventListener("change", function() {
          myFunction(x);
        });
      } else {
        nextPageLink?.style.setProperty('display', 'none');
        nextPageLink?.style.setProperty('opacity', '0');
        nextPageTitle.style.display = "none";
        nextPageTitle.style.opacity = "0";
        nextPageLink.style.padding = "1.063rem";
        nextPageLink.style.maxWidth = "3.125rem";
      }
    };
  
    Promise.all([
      import('flickity'),
      import('flickity-fade'),
    ]).then(([flickityModule]) => {
      Flickity = flickityModule.default;
  
      if (carouselRef.current) {
        flkty = new Flickity(carouselRef.current, {
          cellAlign: 'left',
          contain: true,
          pageDots: false,
          autoPlay: false,
          speed: 1000,
          wrapAround: false,
          draggable: true,
          fade: true,
        });
  
        setFlickityInstance(flkty);
  
        // Important: Run on select instead of change
        // flkty.on('ready', checkIfLastSlideSelected);
        flkty.on('select', checkIfLastSlideSelected);
  
      }
    });
  
    return () => {
      flickityInstance?.destroy?.();
    };
  }, []);
  

  return (
    <div className="carousel" ref={carouselRef}>
      {children}
    </div>
  );
}
