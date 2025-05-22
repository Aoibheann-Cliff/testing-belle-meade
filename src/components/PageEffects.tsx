// @ts-nocheck
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from 'gsap';
import Panzoom from 'panzoom';
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
    const form = document.getElementById('form');
    const formFooter = document.getElementById('formFooter');
    const menu = document.getElementById('menu');
    const menuFooter = document.getElementById('menuFooter');
    const leftMenu = document.getElementById('leftMenu');
    const rightMenu = document.getElementById('rightMenu');
    const logo = document.getElementById('logo');
    const purpleLogo = document.getElementById('purpleLogo');
    const navToggle = document.getElementById('navToggle');
    const wrapper = document.getElementById('contentWrapper');
    const firstBar = document.getElementById('firstBar');
    const secondBar = document.getElementById('secondBar');
    const thirdBar = document.getElementById('thirdBar');
    const nextPageLink = document.getElementById('nextPageLink');
    const header = document.getElementById('header');

    document.querySelectorAll('.image-lightbox img').forEach((img) => {
      const panzoomInstance = Panzoom(img, {
        maxScale: 5,
        minScale : 1,
        bounds: true,
        contain: 'outside'
      });
  
      // Optional: enable zoom with mouse wheel
      img.parentElement.addEventListener('wheel', panzoomInstance.zoomWithWheel);
    });

    setTimeout(() => {
      wrapper.style.opacity = "1";
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
      
        if (nextPageLink) {
          nextPageLink.style.zIndex = "1";
        }
      
        const isOpen = menuContainer.style.display === "flex";
      
        if (!isOpen) {
          menuContainer.style.display = "flex";
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
          setTimeout(() => {
        }, 500);
      }, 1500);

      setTimeout(() => {
        leftMenu.style.opacity = "1";
        rightMenu.style.opacity = "1";
        if (nextPageLink) {
          nextPageLink.style.zIndex = "9999";
        }
      }, 2000);
    }

    function closeForm() {
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
        if (nextPageLink) {
          nextPageLink.style.zIndex = "9999";
        }
      }, 2000);

      closeMenu();
    }

    navToggle?.addEventListener('click', toggleHamburger);

    openBtn?.addEventListener("click", () => {
      formContainer.style.display = "flex";
      leftMenu.style.opacity = "0";
      rightMenu.style.opacity = "0";
      if (nextPageLink) {
        nextPageLink.style.zIndex = "1";
      }
      logo.style.opacity = 0;
      purpleLogo.style.opacity = 1;

      setTimeout(() => {
        leftMenu.style.display = "none";
        rightMenu.style.display = "none";
      }, 1000);

      gsap.fromTo(formContainer, { top: "-100vh" }, {
        top: "0",
        duration: 1,
        ease: "power3.out"
      });

      setTimeout(() => {
        form.style.opacity = "1";
        formFooter.style.opacity = "1";
      }, 1000);
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
        duration: 1,
        ease: "power3.out"
      });

      setTimeout(() => {
        form.style.opacity = "1";
        formFooter.style.opacity = "1";
      }, 1000);
    });

    closeBtn?.addEventListener("click", closeForm);

    return () => {
      navToggle?.removeEventListener('click', toggleHamburger);
    };
  }, []);


  useEffect(() => {
    const menuContainer = document.getElementById('mobileMenu');
    const formContainer = document.querySelector('.form-container');

    const checkForCarousel = () => {
      const hasCarousel = !!document.querySelector('.carousel');
      document.body.classList.toggle('no-slider', !hasCarousel);
    };

    const timeout = setTimeout(checkForCarousel, 100);

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
