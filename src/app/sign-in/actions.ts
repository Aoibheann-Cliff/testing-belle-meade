import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Belle Meade Village',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export async function auth(formData: FormData) {
  "use server";

  const session = await getSession();
  const password = formData.get("password");
  const shouldAuthenticate = password === process.env.IRON_SESSION_PASSWORD;
  const redirectPath = (formData.get("redirect") as string) || "/";

  session.isAuthenticated = shouldAuthenticate;
  await session.save();

  if (!shouldAuthenticate) {
    redirect(
      `/sign-in?error=1&redirect=${encodeURIComponent(redirectPath)}`
    );
  }

  redirect(redirectPath.startsWith("/") ? redirectPath : "/");
}
