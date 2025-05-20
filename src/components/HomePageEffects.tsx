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
    const navToggle = document.getElementById('navToggle');
    const firstBar = document.getElementById('firstBar');
    const secondBar = document.getElementById('secondBar');
    const thirdBar = document.getElementById('thirdBar');

    function toggleHamburger() {
    firstBar.style.transform = "rotate(45deg) translate(0.35rem, 0.35rem)";
    secondBar.style.width = "0";
    thirdBar.style.transform = "rotate(-45deg) translate(0.35rem, -0.35rem)";
    firstBar.style.backgroundColor = "#4c2f48";
    thirdBar.style.backgroundColor= "#4c2f48";
      const isOpen = menuContainer.style.display === "flex";

      if (!isOpen) {
        menuContainer.style.display = "flex";
        logo.src = purplesymbol.src;
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
            logo.src = symbol.src;
            openBtn.style.color = "#fff9f2";
            openBtn.style.border = "1px solid #fff9f2";
        }, 1500);
  
        setTimeout(() => {
          leftMenu.style.opacity = "1";
          rightMenu.style.opacity = "1";
        }, 2000);
      }
  
      function closeForm() {
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
          logo.src = symbol.src;
        }, 1500);
  
        setTimeout(() => {
          formContainer.style.display = "none";
          leftMenu.style.opacity = "1";
          rightMenu.style.opacity = "1";
        }, 2000);
  
        closeMenu();
      }



    navToggle?.addEventListener('click', toggleHamburger);

    openBtn?.addEventListener("click", () => {
      formContainer.style.display = "flex";
      leftMenu.style.opacity = "0";
      rightMenu.style.opacity = "0";
      logo.src = purplesymbol.src;

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

    const overlay = document.getElementById('overlay');
    overlay.style.opacity = "1";
    overlay.style.background = "#4C2F48";

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

    return () => {
      navToggle?.removeEventListener('click', toggleHamburger);
    };
  }, []);

  // Close menu and form on route change
  useEffect(() => {
    const menuContainer = document.getElementById('mobileMenu');
    const formContainer = document.querySelector('.form-container');

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
  
        gsap.to(menuContainer, {
          top: "-100vh",
          duration: 1,
          delay: 1,
          ease: "power3.out",
          onComplete: () => {
            menuContainer.style.display = "none";
            logo.src = symbol.src;
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
        logo.src = symbol.src;
      }, 1500);

      setTimeout(() => {
        formContainer.style.display = "none";
        leftMenu.style.opacity = "1";
        rightMenu.style.opacity = "1";
      }, 2000);
    }
  }, [pathname]);

  return null;
}
