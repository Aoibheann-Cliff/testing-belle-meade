import Image from "next/image";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { components } from "@/sanity/portableTextComponents";
import HomepageFlickityCarousel from "@/components/HomepageFlickityCarousel";
import HomePageEffects from "@/components/HomePageEffects";
import logoType from '../logotype.svg';
import symbol from '../symbol.svg';

export default async function Page() {
  const { data: homepage } = await sanityFetch({ query: HOMEPAGE_QUERY });

  return (
    <>
    <div className="symbol" id="symbol"><Image src={symbol} alt="symbol"/></div>
    <div className="logotype" id="logotype"><Image src={logoType} alt="logotype"/></div>
    <div className="ipad-logotype" id="ipadlogotype"><Image src={logoType} alt="logotype"/></div>
    <main id="contentWrapper" className="container content-wrapper homepage">
      <HomePageEffects />

    <div
      className={
        "background-video" +
        (homepage.mobilebackgroundvideo ? " has-background-mobile-video" : "") +
        (homepage.mobilebackgroundimage ? " has-background-mobile-image" : "")
      }
    >
      <div className="carousel-overlay"></div>
      <div className="logotype"><Image src={logoType} alt="logotype"/></div>
        <h3 className="tagline" id="tagline">
          {homepage.text}
        </h3>
        {homepage.backgroundmediaType === 'video' && (
        <div className={`h-full`}>
          {homepage.backgroundvideo && (
          <video
            src={homepage.backgroundvideo.asset.url}
            className="desktop-video w-full aspect-[1920/1080] object-cover min-h-screen"
            autoPlay
            muted
            loop
            playsInline
          />
          )}
          {homepage.mobilebackgroundvideo && (
          <video
            src={homepage.mobilebackgroundvideo.asset.url}
            className="mobile-video w-full aspect-[1920/1080] object-cover min-h-screen"
            autoPlay
            muted
            loop
            playsInline
          />
          )}
        </div>
          )}
          {homepage.backgroundmediaType === 'image' && (
            <div className={`h-full`}>
            {homepage.backgroundimage && (
            <Image
            priority={true}
            className="desktop-image w-full aspect-[1920/1080] min-h-screen"
            src={urlFor(homepage.backgroundimage)
              .width(1920)
              .height(1080)
              .quality(100)
              .auto("format")
              .url()}
            alt={homepage.backgroundimage.alt || ""}
            width={1920}
            height={1080}
          />
        )}
           {homepage.mobilebackgroundimage && (
            <Image
            className="mobile-image w-full aspect-[1920/1080] min-h-screen"
            src={urlFor(homepage.mobilebackgroundimage)
              .width(1920)
              .height(1080)
              .quality(100)
              .auto("format")
              .url()}
            alt={homepage.mobilebackgroundimage.alt || ""}
            width={1920}
            height={1080}
          />
        )}
            </div>
        )}
    </div>
      {homepage?.body && (
        <div className="prose">
          <PortableText value={homepage.body} components={components} />
        </div>
      )}
    </main>
    </>
  );
}
