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


    //     nextPageLink?.style.setProperty('display', 'flex');
    //     setTimeout(() => {
    //       nextPageLink?.style.setProperty('opacity', '1');
    //     }, 500);
    //     function myFunction(x) {
    //       if (x.matches) {
    //         setTimeout(() => {
    //           const naturalWidth = nextPageTitle.scrollWidth + "px";
    //           gsap.to(nextPageLink, {
    //             maxWidth: naturalWidth,
    //             duration: 1,
    //             ease: "power3.out"
    //           });
    //         }, 2000);
    //         setTimeout(() => {
    //           nextPageTitle.style.opacity = "1";
    //         }, 3000);
    //       } else {
    //         nextPageLink.addEventListener('mouseenter', () => {
    //           const naturalWidth = nextPageTitle.scrollWidth + "px";
    //           gsap.to(nextPageLink, {
    //             maxWidth: naturalWidth,
    //             duration: 1,
    //             ease: "power3.out"
    //           });
            
    //           gsap.to(nextPageTitle, {
    //             opacity: 1,
    //             duration: 0.3,
    //             ease: "power1.out",
    //             delay: 0.7
    //           });
    //         });
            
    //         nextPageLink.addEventListener('mouseleave', () => {
    //           gsap.to(nextPageTitle, {
    //             opacity: 0,
    //             ease: "power1.out"
    //           });
            
    //           gsap.to(nextPageLink, {
    //             maxWidth: "3.125rem",
    //             duration: 1,
    //             ease: "power3.out",
    //             delay:1.1,
    //           });
    //         });
            
    //       }
    //     }
    //     const x = window.matchMedia("(max-width: 1366px)")
    //     myFunction(x);
    //     x.addEventListener("change", function() {
    //       myFunction(x);
    //     });
    //   } else {
    //     nextPageLink?.style.setProperty('display', 'none');
    //     nextPageLink?.style.setProperty('opacity', '0');
    //     nextPageTitle.style.display = "none";
    //     nextPageTitle.style.opacity = "0";
    //     nextPageLink.style.padding = "1.063rem";
    //     nextPageLink.style.maxWidth = "3.125rem";
    // };
    
  
    // This runs after Flickity selects a slide
    // const checkIfLastSlideSelected = () => {
    //   const nextPageLink = document.getElementById('nextPageLink');
    //   const nextPageTitle = document.getElementById('next-page-title');

    //   if (!flkty) return;
  
    //   const selectedElement = flkty.selectedElement;
    //   const lastCell = flkty.cells[flkty.cells.length - 1]?.element;
  
    //   if (selectedElement === lastCell) {
    //     nextPageLink?.style.setProperty('display', 'flex');
    //     setTimeout(() => {
    //       nextPageLink?.style.setProperty('opacity', '1');
    //     }, 500);
    //     function myFunction(x) {
    //       if (x.matches) {
    //         setTimeout(() => {
    //           const naturalWidth = nextPageTitle.scrollWidth + "px";
    //           gsap.to(nextPageLink, {
    //             maxWidth: naturalWidth,
    //             duration: 1,
    //             ease: "power3.out"
    //           });
    //         }, 2000);
    //         setTimeout(() => {
    //           nextPageTitle.style.opacity = "1";
    //         }, 3000);
    //       } else {
    //         nextPageLink.addEventListener('mouseenter', () => {
    //           const naturalWidth = nextPageTitle.scrollWidth + "px";
    //           gsap.to(nextPageLink, {
    //             maxWidth: naturalWidth,
    //             duration: 1,
    //             ease: "power3.out"
    //           });
            
    //           gsap.to(nextPageTitle, {
    //             opacity: 1,
    //             duration: 0.3,
    //             ease: "power1.out",
    //             delay: 0.7
    //           });
    //         });
            
    //         nextPageLink.addEventListener('mouseleave', () => {
    //           gsap.to(nextPageTitle, {
    //             opacity: 0,
    //             ease: "power1.out"
    //           });
            
    //           gsap.to(nextPageLink, {
    //             maxWidth: "3.125rem",
    //             duration: 1,
    //             ease: "power3.out",
    //             delay:1.1,
    //           });
    //         });
            
    //       }
    //     }
    //     const x = window.matchMedia("(max-width: 1366px)")
    //     myFunction(x);
    //     x.addEventListener("change", function() {
    //       myFunction(x);
    //     });
    //   } else {
    //     nextPageLink?.style.setProperty('display', 'none');
    //     nextPageLink?.style.setProperty('opacity', '0');
    //     nextPageTitle.style.display = "none";
    //     nextPageTitle.style.opacity = "0";
    //     nextPageLink.style.padding = "1.063rem";
    //     nextPageLink.style.maxWidth = "3.125rem";
    //   }
    // };
  
    Promise.all([
      import('flickity'),
      import('flickity-fade'),
    ]).then(([flickityModule]) => {
      Flickity = flickityModule.default;

      function closeLightbox() {
        document.body.classList.remove('lightbox-visible');
        const selectedSlide = document.querySelector('.flickity-cell.is-selected');
        const img = selectedSlide?.querySelector('.image-lightbox');
      
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
            requestAnimationFrame(() => {
              const width = window.innerWidth;
              if (width <= 1366) {
                header.style.opacity = 0;
                header.style.pointerEvents = "none";
                footer.style.opacity = 0;
                footer.style.pointerEvents = "none";
                nextPageTitle.style.opacity = 1;
                setTimeout(() => {
                  nextPageLink.style.transform = "translateX(0px)";
                }, 1000);
              } else {
                header.style.opacity = 0;
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
