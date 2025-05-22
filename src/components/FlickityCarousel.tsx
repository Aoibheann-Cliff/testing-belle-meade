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

      const nextPageLink = document.getElementById('nextPageLink');
      const nextPageTitle = document.getElementById('next-page-title');
      const header = document.getElementById('header');
      const footer = document.getElementById('footer');
  
    Promise.all([
      import('flickity'),
      import('flickity-fade'),
    ]).then(([flickityModule]) => {
      Flickity = flickityModule.default;

      const lightboxButtons = document.querySelectorAll('.lightbox');
const lightboxCloseButtons = document.querySelectorAll('.lightbox-close');
const lightboxImages = document.querySelectorAll('.image-lightbox img');

lightboxButtons.forEach(button => {
  button.addEventListener('click', function () {
    const selectedSlide = document.querySelector('.flickity-cell.is-selected');
    const img = selectedSlide?.querySelector('.image-lightbox');

    if (img) {
      document.body.classList.add('lightbox-visible');
      img.style.display = "block";
      header.style.opacity = "0";

      flkty.options.draggable = !flkty.options.draggable;
      flkty.updateDraggable();

      setTimeout(() => {
        header.style.display = "none";
        img.style.opacity = "1";
      }, 600);
    }
  });
});

lightboxCloseButtons.forEach(button => {
  button.addEventListener('click', function () {
    document.body.classList.remove('lightbox-visible');
    const selectedSlide = document.querySelector('.flickity-cell.is-selected');
    const img = selectedSlide?.querySelector('.image-lightbox');

    flkty.options.draggable = true;
    flkty.updateDraggable();
    if (img) {
      img.style.opacity = "0";
      header.style.display = "flex";
      setTimeout(() => {
        img.style.display = "none";
        header.style.opacity = "1";
      }, 600);
    }
  });
});

      function closeLightbox() {
        document.body.classList.remove('lightbox-visible');
        const selectedSlide = document.querySelector('.flickity-cell.is-selected');
        const img = selectedSlide?.querySelector('.image-lightbox');
        flkty.options.draggable = true;
        flkty.updateDraggable();

        if (img) {
          img.style.opacity = "0";
          header.style.display = "flex";
          setTimeout(() => {
            img.style.display = "none";
            header.style.opacity = "1";
          }, 600);
        }
      }


      var previousButtons = document.querySelectorAll('.button-previous');

      previousButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          flkty.previous();
        });
      });

      var nextButtons = document.querySelectorAll('.button-next');

      nextButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          flkty.next();
        });
      });
  
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
  
        flkty.on('change', function(index) { 
          if (index === flkty.slides.length - 1) {
            gsap.to(header, {
              opacity: 0,
              duration: 0.6,
              ease: "power1.out",
            });
            requestAnimationFrame(() => {
              const width = window.innerWidth;
              if (width <= 1366) {
                const naturalWidth = nextPageTitle.scrollWidth + "px";
                header.style.pointerEvents = "none";
                footer.style.opacity = 0;
                footer.style.pointerEvents = "none";
                setTimeout(() => {
                  nextPageLink.style.transform = "translateX(0px)";
                }, 1000);
                gsap.to(nextPageLink, {
                  maxWidth: naturalWidth,
                  duration: 1,
                  delay: 3,
                  ease: "power3.out"
                });
                gsap.to(nextPageTitle, {
                  opacity: 1,
                  duration: 0.3,
                  ease: "power1.out",
                  delay: 4
                });
              } else {
                gsap.to(header, {
                  opacity: 0,
                  duration: 0.6,
                  ease: "power1.out",
                });
                header.style.pointerEvents = "none";
                footer.style.opacity = 0;
                footer.style.pointerEvents = "none";
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
                    delay: 0.7
                  });
                });
                
                nextPageLink.addEventListener('mouseleave', () => {
                  gsap.to(nextPageTitle, {
                    opacity: 0,
                    ease: "power1.out"
                  });
                
                  gsap.to(nextPageLink, {
                    maxWidth: "3.125rem",
                    duration: 1,
                    ease: "power3.out",
                    delay:1.1,
                  });
                });
                setTimeout(() => {
                  nextPageLink.style.transform = "translateX(0px)";
                }, 1000);
              }
            });
        
        
          } else {
            requestAnimationFrame(() => {
              closeLightbox();
              header.style.opacity = "1";
              header.style.pointerEvents = "all";
              footer.style.opacity = 1;
              footer.style.pointerEvents = "all";
  
            });
        
            setTimeout(() => {
              nextPageLink.style.transform = "translateX(100vh)";
            }, 500);
          }
        });        
      }
    });
  
    return () => {
      flickityInstance?.destroy?.();
    };
  }, []);
  

  return (
    <div className="carousel" id="carousel" ref={carouselRef}>
      {children}
    </div>
  );
}
