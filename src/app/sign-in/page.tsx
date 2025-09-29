import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { auth } from "./actions";
import Image from "next/image";
import logoType from "../logotype.svg";
import signInArrow from "../sign-in-arrow.svg";
import symbol from '../symbol.svg';
import LoginPageEffects from "@/components/LoginPageEffects";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '1 Iris Lane',
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

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SignIn(props: Props) {
  const searchParams = await props.searchParams;
  const session = await getSession();

  if (session.isAuthenticated) {
    redirect("/");
  }

  // check if error query param exists
  const error = searchParams.error;

  return (
    <>
    <div className="loading-overlay" id="overlay"></div>
    <div className="symbol" id="symbol"><Image src={symbol} alt="symbol"/></div>
    <div className="logotype logoType" id="logotype"><Image src={logoType} alt="logotype"/></div>
      <LoginPageEffects />
    <div className="login-form-container">

      <form className="login-form" action={auth}>
        <input
          name="redirect"
          type="hidden"
          defaultValue={searchParams.redirect as string}
        />
        <label>
          <input
            placeholder="Enter Password"
            name="password"
            type="password"
            required
            autoFocus
          />
        </label>
        <button type="submit">
          <Image src={signInArrow} alt="arrow" />
        </button>
      </form>

      {/* show error if password was wrong */}
      {error && (
        <p className="error-message">
          Incorrect password. Please try again.
        </p>
      )}
    </div>
    </>
  );
}
