// components/GATracker.tsx
"use client";

import { useEffect } from "react";
import * as gtag from "@/app/lib/gtag";

export default function GATracker() {
  useEffect(() => {
    // Track the initial page load
    gtag.pageview(window.location.pathname + window.location.search);

    // Optional: track route changes if you use a router listener
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };

    window.addEventListener("popstate", () => handleRouteChange(window.location.pathname + window.location.search));
    return () => window.removeEventListener("popstate", () => handleRouteChange(window.location.pathname + window.location.search));
  }, []);

  return null;
}
