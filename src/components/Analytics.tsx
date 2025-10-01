"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import * as gtag from "@/app/lib/gtag";

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + searchParams.toString();
      gtag.pageview(url);
    }
  }, [pathname, searchParams]);

  return null;
}
