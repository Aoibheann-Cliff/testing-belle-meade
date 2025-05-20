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
    <main className="container homepage">
      <div className="loading-overlay" id="overlay"></div>
      <div className="symbol" id="symbol"><Image src={symbol} alt="symbol"/></div>
      <div className="logotype" id="logotype"><Image src={logoType} alt="logotype"/></div>
      <div className="ipad-logotype" id="ipadlogotype"><Image src={logoType} alt="logotype"/></div>
      <HomePageEffects />
     <HomepageFlickityCarousel>
      {homepage?.homepageimage && (
        <div className="carousel-cell home-slide">
                <div className="carousel-overlay"></div>
                <div className="carousel-logotype"><Image src={logoType} alt="logotype"/></div>
                <div className="carousel-ipad-logotype"><Image src={logoType} alt="logotype"/></div>
        <Image
          className="w-full aspect-[1920/1080] object-cover min-h-screen"
          src={urlFor(homepage.homepageimage)
            .width(1920)
            .height(1080)
            .quality(100)
            .auto("format")
            .url()}
          alt={homepage.homepageimage.alt || ""}
          width={1920}
          height={1080}
        />
        {homepage?.text && (
        <h3 className="tagline" id="tagline">
          {homepage.text}
        </h3>
      )}
        </div>
      )}
      {homepage?.designpageimage && (
                  <div className="carousel-cell design-slide">
                          <div className="carousel-overlay"></div>
        <Image
          className="w-full aspect-[1920/1080] min-h-screen"
          src={urlFor(homepage.designpageimage)
            .width(1920)
            .height(1080)
            .quality(100)
            .auto("format")
            .url()}
          alt={homepage.designpageimage.alt || ""}
          width={1920}
          height={1080}
        />
        </div>
      )}
      {homepage?.craftsmanshippageimage && (
        <div className="carousel-cell craftsmanship-slide">
                <div className="carousel-overlay"></div>
        <Image
          className="w-full aspect-[1920/1080] min-h-screen"
          src={urlFor(homepage.craftsmanshippageimage)
            .width(1920)
            .height(1080)
            .quality(100)
            .auto("format")
            .url()}
          alt={homepage.craftsmanshippageimage.alt || ""}
          width={1920}
          height={1080}
        />
        </div>
      )}
      {homepage?.residencespageimage && (
          <div className="carousel-cell residences-slide">
                  <div className="carousel-overlay"></div>
        <Image
          className="w-full aspect-[1920/1080] min-h-screen"
          src={urlFor(homepage.residencespageimage)
            .width(1920)
            .height(1080)
            .quality(100)
            .auto("format")
            .url()}
          alt={homepage.residencespageimage.alt || ""}
          width={1920}
          height={1080}
        />
        </div>
      )}
      {homepage?.amenitiespageimage && (
        <div className="carousel-cell amenities-slide">
                <div className="carousel-overlay"></div>
        <Image
          className="w-full aspect-[1920/1080] min-h-screen"
          src={urlFor(homepage.amenitiespageimage)
            .width(1920)
            .height(1080)
            .quality(100)
            .auto("format")
            .url()}
          alt={homepage.amenitiespageimage.alt || ""}
          width={1920}
          height={1080}
        />
        </div>
      )}
      {homepage?.parkpageimage && (
        <div className="carousel-cell park-slide">
                <div className="carousel-overlay"></div>
        <Image
          className="w-full aspect-[1920/1080] min-h-screen"
          src={urlFor(homepage.parkpageimage)
            .width(1920)
            .height(1080)
            .quality(100)
            .auto("format")
            .url()}
          alt={homepage.parkpageimage.alt || ""}
          width={1920}
          height={1080}
        />
        </div>
      )}
            {homepage?.villagepageimage && (
          <div className="carousel-cell village-slide">
                  <div className="carousel-overlay"></div>
        <Image
          className="w-full aspect-[1920/1080] min-h-screen"
          src={urlFor(homepage.villagepageimage)
            .width(1920)
            .height(1080)
            .quality(100)
            .auto("format")
            .url()}
          alt={homepage.villagepageimage.alt || ""}
          width={1920}
          height={1080}
        />
              </div>
      )}
      </HomepageFlickityCarousel>
      {homepage?.body && (
        <div className="prose">
          <PortableText value={homepage.body} components={components} />
        </div>
      )}
    </main>
  );
}
