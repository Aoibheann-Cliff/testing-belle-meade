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
          speed: 8000,
          wrapAround: true,
          draggable: false,
          fade: true,
        });

        var hovermenuItems = document.querySelectorAll('.menuitem');
        
        hovermenuItems.forEach(function(item) {
          item.addEventListener('mouseenter', function() {
            flkty.pausePlayer(); // Pause autoplay
          });
        
          item.addEventListener('mouseleave', function() {
            flkty.unpausePlayer(); // Resume autoplay
          });
        });
  
        setFlickityInstance(flkty);
        setTimeout(() => {
          flkty.playPlayer();
        }, 4000);
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
