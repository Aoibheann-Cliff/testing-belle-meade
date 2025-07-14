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
    const openBtn = document.getElementById("openForm");
    const mobileopenBtn = document.getElementById("mobileopenForm");
    const closeBtn = document.getElementById("contactformclose");
    const formContainer = document.querySelector(".form-container");
    const menuContainer = document.getElementById('mobileMenu');
    const menuBackground = document.getElementById('menuBackground');
    const symbolimg = document.getElementById('symbol');
    const logotype = document.getElementById('logotype');
    const ipadlogotype = document.getElementById('ipadlogotype');
    const form = document.getElementById('form');
    const formFooter = document.getElementById('formFooter');
    const menu = document.getElementById('menu');
    const menuFooter = document.getElementById('menuFooter');
    const leftMenu = document.getElementById('leftMenu');
    const rightMenu = document.getElementById('rightMenu');
    const logo = document.getElementById('logo');
    const wrapper = document.getElementById('contentWrapper');
    const purpleLogo = document.getElementById('purpleLogo');
    const navToggle = document.getElementById('navToggle');
    const firstBar = document.getElementById('firstBar');
    const secondBar = document.getElementById('secondBar');
    const thirdBar = document.getElementById('thirdBar');
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');

    setTimeout(() => {
      header.style.opacity = "1";
    }, 1000);

    setTimeout(() => {
      footer.style.opacity = "1";
    }, 1000);

    setTimeout(() => {
      wrapper.style.opacity = "1";
    }, 1000);

    setTimeout(() => {
      const designMenuItem = document.getElementById('design');
      const designSlide = document.querySelector('.design-slide');

      if(designMenuItem){
      designMenuItem.addEventListener('mouseenter', () => {
      designSlide.style.opacity = '1';
      });

      designMenuItem.addEventListener('mouseleave', () => {
      designSlide.style.opacity = '0';
      });
    }

      const craftsmanshipMenuItem = document.getElementById('craftsmanship');
      const craftsmanshipSlide = document.querySelector('.craftsmanship-slide');

      if(craftsmanshipMenuItem){
      craftsmanshipMenuItem.addEventListener('mouseenter', () => {
        craftsmanshipSlide.style.opacity = '1';
      });

      craftsmanshipMenuItem.addEventListener('mouseleave', () => {
      craftsmanshipSlide.style.opacity = '0';
      });
      }

      const residencesMenuItem = document.getElementById('residences');
      const residencesSlide = document.querySelector('.residences-slide');

      if(residencesMenuItem){
      residencesMenuItem.addEventListener('mouseenter', () => {
        residencesSlide.style.opacity = '1';
      });

      residencesMenuItem.addEventListener('mouseleave', () => {
      residencesSlide.style.opacity = '0';
      });
    }

      const amenitiesMenuItem = document.getElementById('amenities');
      const amenitiesSlide = document.querySelector('.amenities-slide');

      if(amenitiesMenuItem){
      amenitiesMenuItem.addEventListener('mouseenter', () => {
        amenitiesSlide.style.opacity = '1';
      });

      amenitiesMenuItem.addEventListener('mouseleave', () => {
        amenitiesSlide.style.opacity = '0';
      });
    }

      const parkMenuItem = document.getElementById('park');
      const parkSlide = document.querySelector('.park-slide');

      if(parkMenuItem){
      parkMenuItem.addEventListener('mouseenter', () => {
        parkSlide.style.opacity = '1';
      });

      parkMenuItem.addEventListener('mouseleave', () => {
        parkSlide.style.opacity = '0';
      });
    }

      const villageMenuItem = document.getElementById('village');
      const villageSlide = document.querySelector('.village-slide');

      if(villageMenuItem){
      villageMenuItem.addEventListener('mouseenter', () => {
        villageSlide.style.opacity = '1';
      });

      villageMenuItem.addEventListener('mouseleave', () => {
      villageSlide.style.opacity = '0';
      });
    }

  }, 1000);
    function toggleHamburger() {
      const width = window.innerWidth;
    
      if (width <= 600) {
        firstBar.style.transform = "rotate(45deg) translate(0.375rem, 0.375rem)";
        thirdBar.style.transform = "rotate(-45deg) translate(0.375rem, -0.375rem)";
      } else {
        firstBar.style.transform = "rotate(45deg) translate(0.35rem, 0.35rem)";
        thirdBar.style.transform = "rotate(-45deg) translate(0.35rem, -0.35rem)";
      }
    
      secondBar.style.width = "0";
      firstBar.style.backgroundColor = "#4c2f48";
      thirdBar.style.backgroundColor = "#4c2f48";
    
      const isOpen = menuContainer.style.display === "flex";
    
      if (!isOpen) {
        menuContainer.style.display = "flex";
        menuBackground.style.display = "flex";
        logo.style.opacity = 0;
        purpleLogo.style.opacity = 1;
        openBtn.style.color = "#4c2f48";
        openBtn.style.border = "1px solid #4c2f48";
    
        gsap.fromTo(menuContainer, { top: "-100vh" }, {
          top: "0",
          duration: 1,
          ease: "power3.out",
          onComplete: () => {
            menu.style.opacity = "1";
            menuFooter.style.opacity = "1";
          }
        });
      } else {
        closeMenu();
      }
    }

    function closeMenu() {
        firstBar.style.transform = "rotate(0deg) translate(0rem, 0rem)";
        secondBar.style.width = "";
        thirdBar.style.transform = "rotate(0deg) translate(0rem, 0rem)";
        firstBar.style.backgroundColor = "#fff9f2";
        thirdBar.style.backgroundColor= "#fff9f2";
        menu.style.opacity = "0";
        menuFooter.style.opacity = "0";
  
        setTimeout(() => {
          leftMenu.style.display = "flex";
          rightMenu.style.display = "flex";
          menuBackground.style.display = "none";
        }, 1000);
  
        gsap.to(menuContainer, {
          top: "-100vh",
          duration: 1,
          delay: 1,
          ease: "power3.out",
          onComplete: () => {
            menuContainer.style.display = "none";
          }
        });

        setTimeout(() => {
          logo.style.opacity = 1;
          purpleLogo.style.opacity = 0;
      }, 1250);
  
        setTimeout(() => {
            openBtn.style.color = "#fff9f2";
            openBtn.style.border = "1px solid #fff9f2";
        }, 1500);
  
        setTimeout(() => {
          leftMenu.style.opacity = "1";
          rightMenu.style.opacity = "1";
        }, 2000);
      }
  
      function closeForm() {
        const width = window.innerWidth;
        if (width <= 1024) {
          form.style.opacity = "0";
          formFooter.style.opacity = "0";
    
          setTimeout(() => {
            leftMenu.style.display = "flex";
            rightMenu.style.display = "flex";
          }, 1000);
    
          gsap.fromTo(formContainer, { top: "0" }, {
            top: "-100vh",
            delay: 1,
            duration: 1,
            ease: "power3.out"
          });
    
    
          setTimeout(() => {
            formContainer.style.display = "none";
            leftMenu.style.opacity = "1";
            rightMenu.style.opacity = "1";
          }, 2000);
        }
        if (width > 1024) {
        menu.style.opacity = "0";
        menuFooter.style.opacity = "0";
        form.style.opacity = "0";
        formFooter.style.opacity = "0";
  
        setTimeout(() => {
          leftMenu.style.display = "flex";
          rightMenu.style.display = "flex";
        }, 1000);
  
        gsap.fromTo(formContainer, { top: "0" }, {
          top: "-100vh",
          delay: 1,
          duration: 1,
          ease: "power3.out"
        });
  
        setTimeout(() => {
          logo.style.opacity = 1;
          purpleLogo.style.opacity = 0;
        }, 1250);
  
        setTimeout(() => {
          formContainer.style.display = "none";
          leftMenu.style.opacity = "1";
          rightMenu.style.opacity = "1";
        }, 2000);
  
        closeMenu();
      }
      }



    navToggle?.addEventListener('click', toggleHamburger);

    openBtn?.addEventListener("click", () => {
      formContainer.style.display = "flex";
      leftMenu.style.opacity = "0";
      rightMenu.style.opacity = "0";
      logo.style.opacity = 0;
      purpleLogo.style.opacity = 1;

      setTimeout(() => {
        leftMenu.style.display = "none";
        rightMenu.style.display = "none";
      }, 1000);

      gsap.fromTo(formContainer, { top: "-100vh" }, {
        top: "0",
        duration: 1.5,
        ease: "power3.out"
      });

      setTimeout(() => {
        form.style.opacity = "1";
        formFooter.style.opacity = "1";
      }, 1500);
    });

    mobileopenBtn?.addEventListener("click", () => {
      formContainer.style.display = "flex";
      leftMenu.style.opacity = "0";
      rightMenu.style.opacity = "0";
      logo.style.opacity = 0;
      purpleLogo.style.opacity = 1;

      setTimeout(() => {
        leftMenu.style.display = "none";
        rightMenu.style.display = "none";
      }, 1000);

      gsap.fromTo(formContainer, { top: "-100vh" }, {
        top: "0",
        duration: 1.5,
        ease: "power3.out"
      });

      setTimeout(() => {
        form.style.opacity = "1";
        formFooter.style.opacity = "1";
      }, 1500);
    });

    closeBtn?.addEventListener("click", closeForm);

    const overlay = document.getElementById('overlay');
    overlay.style.opacity = "1";
    overlay.style.background = "#4C2F48";

    function popupScroll() {
      if (!localStorage.getItem('showPopup')) {
          localStorage.setItem('showPopup', 'true'); 
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
            ipadlogotype.style.opacity = "1";
          }, 3500);
          setTimeout(() => {
            overlay.style.opacity = "0";
            logotype.style.opacity = "0";
            ipadlogotype.style.opacity = "0";
          }, 5000);
          setTimeout(() => {
            logotype.style.display = "none";
            ipadlogotype.style.display = "none";
            overlay.style.display = "none";
          }, 6000);
      } else{
        overlay.style.display = "none";
        symbolimg.style.display = "none";
        logotype.style.display = "none";
      }
  }
  popupScroll();


    return () => {
      navToggle?.removeEventListener('click', toggleHamburger);
    };
  }, []);

  // Close menu and form on route change
  useEffect(() => {
    const menuContainer = document.getElementById('mobileMenu');
    const formContainer = document.querySelector('.form-container');

    const checkForCarousel = () => {
      const hasCarousel = !!document.querySelector('.background-video');
      document.body.classList.toggle('no-slider', !hasCarousel);
    };

    const timeout = setTimeout(checkForCarousel, 100);

    // Close menu
    if (menuContainer?.style.display === "flex") {
        const menu = document.getElementById('menu');
        const menuFooter = document.getElementById('menuFooter');
        const logo = document.getElementById('logo');
        const openBtn = document.getElementById('openForm');
  
        gsap.to(menu, { opacity: 0 });
        gsap.to(menuFooter, { opacity:0 });
  
        firstBar.style.transform = "rotate(0deg) translate(0rem, 0rem)";
        secondBar.style.width = "";
        thirdBar.style.transform = "rotate(0deg) translate(0rem, 0rem)";
        firstBar.style.backgroundColor = "#fff9f2";
        thirdBar.style.backgroundColor= "#fff9f2";
        menu.style.opacity = "0";
        menuFooter.style.opacity = "0";
        setTimeout(() => {
        menuBackground.style.display = "none";
      }, 1000);
        setTimeout(() => {
          logo.style.opacity = 1;
          purpleLogo.style.opacity = 0;
        }, 1250);
        gsap.to(menuContainer, {
          top: "-100vh",
          duration: 1,
          delay: 1,
          ease: "power3.out",
          onComplete: () => {
            menuContainer.style.display = "none";
            openBtn.style.color = "#fff9f2";
            openBtn.style.border = "1px solid #fff9f2";
          }
        });
      }

    // Close form
    if (formContainer?.style.display === "flex") {
      const form = document.getElementById('form');
      const formFooter = document.getElementById('formFooter');
      const leftMenu = document.getElementById('leftMenu');
      const rightMenu = document.getElementById('rightMenu');
      const logo = document.getElementById('logo');

      form.style.opacity = "0";
      formFooter.style.opacity = "0";

      setTimeout(() => {
        leftMenu.style.display = "flex";
        rightMenu.style.display = "flex";
      }, 1000);

      gsap.fromTo(formContainer, { top: "0" }, {
        top: "-100vh",
        delay: 1,
        duration: 1,
        ease: "power3.out"
      });

      setTimeout(() => {
        logo.style.opacity = 1;
        purpleLogo.style.opacity = 0;
      }, 1250);

      setTimeout(() => {
        formContainer.style.display = "none";
        leftMenu.style.opacity = "1";
        rightMenu.style.opacity = "1";
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
