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
    <div className="loading-overlay" id="overlay"></div>
    <div className="symbol" id="symbol"><Image src={symbol} alt="symbol"/></div>
    <div className="logotype" id="logotype"><Image src={logoType} alt="logotype"/></div>
    <div className="ipad-logotype" id="ipadlogotype"><Image src={logoType} alt="logotype"/></div>
    <main id="contentWrapper" className="container content-wrapper homepage">
      <HomePageEffects />
      <HomepageFlickityCarousel>
  {homepage?.homepageslides?.map((slide, index) => (
    <div className={`slide-${index}`} key={index}>
      <div className="logotype" id="logotype"><Image src={logoType} alt="logotype"/></div>
        <h3 className="tagline" id="tagline">
          {homepage.text}
        </h3>
      <div className="carousel-overlay"></div>
      {slide.mediaType === 'image' && slide.image && (
        <Image
          src={urlFor(slide.image).width(3840).height(2160).quality(70).auto('format').url()}
          alt={slide.image.alt || ""}
          width={3840}
          height={2160}
          quality={100}
          placeholder="blur"
          blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
          className="slide-image w-full aspect-[1920/1080] object-cover min-h-screen"
        />
      )}
      {slide.mediaType === 'video' && slide.videoFile && (
        <video
          className="slide-video w-full aspect-[1920/1080] object-cover min-h-screen"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={slide.videoFile.asset.url} type="video/mp4" />
        </video>
      )}
    </div>
  ))}
</HomepageFlickityCarousel>

      {homepage?.designpageimage && (
                  <div className="carousel-cell hover-slide design-slide">
                          <div className="carousel-overlay"></div>
                          {homepage.designpagemediaType === 'video' && (
                      <video
                        src={homepage.designpagevideo.asset.url}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      )}
                      {homepage.designpagemediaType === 'image' && (
                        <div>
        <Image
          className="w-full aspect-[1920/1080] min-h-screen"
          src={urlFor(homepage.designpageimage)
            .width(1920)
            .height(1080)
            .quality(70)
            .auto("format")
            .url()}
          alt={homepage.designpageimage.alt || ""}
          width={1920}
          height={1080}
        />
        </div>
        )}
        </div>
      )}
      {homepage?.craftsmanshippageimage && (
        <div className="carousel-cell hover-slide craftsmanship-slide">
                <div className="carousel-overlay"></div>
                {homepage.craftsmanshippagemediaType === 'video' && (
                      <video
                        src={homepage.craftsmanshippagevideo.asset.url}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      )}
                      {homepage.craftsmanshippagemediaType === 'image' && (
                        <div>
        <Image
          className="w-full aspect-[1920/1080] min-h-screen"
          src={urlFor(homepage.craftsmanshippageimage)
            .width(1920)
            .height(1080)
            .quality(70)
            .auto("format")
            .url()}
          alt={homepage.craftsmanshippageimage.alt || ""}
          width={1920}
          height={1080}
        />
        </div> 
                      )}
        </div>
      )}
      {homepage?.residencespageimage && (
          <div className="carousel-cell hover-slide residences-slide">
                  <div className="carousel-overlay"></div>
                  {homepage.residencespagemediaType === 'video' && (
                      <video
                        src={homepage.residencespagevideo.asset.url}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      )}
                      {homepage.residencespagemediaType === 'image' && (
                        <div>
        <Image
          className="w-full aspect-[1920/1080] min-h-screen"
          src={urlFor(homepage.residencespageimage)
            .width(1920)
            .height(1080)
            .quality(70)
            .auto("format")
            .url()}
          alt={homepage.residencespageimage.alt || ""}
          width={1920}
          height={1080}
        />
        </div>
                      )}
        </div>
      )}
      {homepage?.amenitiespageimage && (
        <div className="carousel-cell hover-slide amenities-slide">
                <div className="carousel-overlay"></div>
                {homepage.amenitiespagemediaType === 'video' && (
                      <video
                        src={homepage.amenitiespagevideo.asset.url}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      )}
                      {homepage.amenitiespagemediaType === 'image' && (
                        <div>
        <Image
          className="w-full aspect-[1920/1080] min-h-screen"
          src={urlFor(homepage.amenitiespageimage)
            .width(1920)
            .height(1080)
            .quality(70)
            .auto("format")
            .url()}
          alt={homepage.amenitiespageimage.alt || ""}
          width={1920}
          height={1080}
        />
        </div>
                      )}
        </div>
      )}
      {homepage?.parkpageimage && (
        <div className="carousel-cell hover-slide park-slide">
                <div className="carousel-overlay"></div>
                {homepage.parkpagemediaType === 'video' && (
                      <video
                        src={homepage.parkpagevideo.asset.url}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      )}
                      {homepage.parkpagemediaType === 'image' && (
                        <div>
        <Image
          className="w-full aspect-[1920/1080] min-h-screen"
          src={urlFor(homepage.parkpageimage)
            .width(1920)
            .height(1080)
            .quality(70)
            .auto("format")
            .url()}
          alt={homepage.parkpageimage.alt || ""}
          width={1920}
          height={1080}
        />
        </div>
                      )}
        </div>
      )}
            {homepage?.villagepageimage && (
          <div className="carousel-cell hover-slide village-slide">
                  <div className="carousel-overlay"></div>
                  {homepage.villagepagemediaType === 'video' && (
                      <video
                        src={homepage.villagepagevideo.asset.url}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      )}
                      {homepage.villagepagemediaType === 'image' && (
                        <div>
        <Image
          className="w-full aspect-[1920/1080] min-h-screen"
          src={urlFor(homepage.villagepageimage)
            .width(1920)
            .height(1080)
            .quality(70)
            .auto("format")
            .url()}
          alt={homepage.villagepageimage.alt || ""}
          width={1920}
          height={1080}
        />
              </div>
                      )}
              </div>
      )}
      {homepage?.body && (
        <div className="prose">
          <PortableText value={homepage.body} components={components} />
        </div>
      )}
    </main>
    </>
  );
}
