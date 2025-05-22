'use client';

import { useEffect, useRef, useState } from 'react';
import 'flickity/css/flickity.css'; // Flickity base styles
import 'flickity-fade/flickity-fade.css'; // Fade plugin styles

export default function HomepageFlickityCarousel({ children }: { children: React.ReactNode }) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [flickityInstance, setFlickityInstance] = useState<any>(null);

  useEffect(() => {
    let Flickity: any;
    let flkty: any;
  
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
          pauseAutoPlayOnHover: false,
          speed: 5000,
          wrapAround: true,
          draggable: false,
          fade: true,
        });
        
  
        setFlickityInstance(flkty);
        setTimeout(() => {
          flkty.playPlayer();
        }, 4000);
  
        const width = window.innerWidth;
        if (width > 1366) {
          setTimeout(() => {
        const hoverMappings = [
          { menuSelector: '.design', slideClass: 'design-slide' },
          { menuSelector: '.craftsmanship', slideClass: 'craftsmanship-slide' },
          { menuSelector: '.residences', slideClass: 'residences-slide' },
          { menuSelector: '.amenities', slideClass: 'amenities-slide' },
          { menuSelector: '.park', slideClass: 'park-slide' },
          { menuSelector: '.village', slideClass: 'village-slide' },
        ];
        hoverMappings.forEach(({ menuSelector, slideClass }) => {
          const menuElement = document.querySelector(menuSelector);
          if (menuElement) {
            menuElement.addEventListener('mouseenter', () => {
              console.log( 'menu' + menuElement);
              flkty.pausePlayer();
              const targetIndex = flkty.cells.findIndex((cell: any) =>
                cell.element.classList.contains(slideClass)
              );
              if (targetIndex !== -1) {
                flkty.select(targetIndex, false, true);
              }
            });
  
            menuElement.addEventListener('mouseleave', () => {
              flkty.unpausePlayer();
            });
          }
        });
      }, 1000);
      }
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
