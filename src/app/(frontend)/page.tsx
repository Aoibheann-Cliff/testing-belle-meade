import Image from "next/image"
import { PortableText } from "next-sanity"
import { sanityFetch } from "@/sanity/lib/live"
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { components } from "@/sanity/portableTextComponents"
import HomePageEffects from "@/components/HomePageEffects"
import logoType from "../logotype.svg"
import symbol from "../symbol.svg"

export default async function Page() {
  const { data: homepage } = await sanityFetch({ query: HOMEPAGE_QUERY })

  return (
    <>
      <div className="symbol" id="symbol">
        <Image src={symbol || "/placeholder.svg"} alt="symbol" />
      </div>
      <div className="logotype" id="logotype">
        <Image src={logoType || "/placeholder.svg"} alt="logotype" />
      </div>
      <main id="contentWrapper" className="container content-wrapper homepage">
        <HomePageEffects />
        {homepage?.popup?.icon && (
          <div className="popup-icon">
              <Image
                src={urlFor(homepage.popup.icon).width(100).height(100).fit('crop').url()}
                alt="symbol"
                width={100}
                height={100}
              />
          </div>
        )}
        {homepage?.popup?.text && (
          <div className="popup">
            <div className="inner-popup">
            <PortableText value={homepage.popup.text} components={components} />
            {homepage?.popup?.image && (
            <Image
            priority={true}
            className="icon"
            src={
              urlFor(homepage.popup.image)
                .width(1920)
                .height(1080)
                .quality(75)
                .format("webp")
                .url() || "/placeholder.svg"
            }
            alt={homepage.popup.icon.alt || ""}
            width={1920}
            height={1080}
            quality={85}
            sizes="100vw"
          />
            )}
            {homepage?.popup?.link && (
              <a className="popup-link" aria-label={homepage.popup.linktext} href={`${homepage.popup.link}`}>
                <h5>{homepage.popup.linktext}</h5>
              </a>
            )}
          </div>
          <div className="popup-close">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <path d="M1 1L29 29" stroke="#fff9f2" />
                  <path d="M29 1L1 29" stroke="#fff9f2" />
                </svg>
            </div>
          </div>
        )}
        <div
          className={
            "background-video" +
            (homepage.mobilebackgroundvideo ? " has-background-mobile-video" : "") +
            (homepage.mobilebackgroundimage ? " has-background-mobile-image" : "")
          }
        >
          <div className="carousel-overlay"></div>
          <div className="logotype">
            <Image src={logoType || "/placeholder.svg"} alt="logotype" />
          </div>
          <h3 className="tagline" id="tagline">
            {homepage.text}
          </h3>
          {homepage.backgroundmediaType === "video" && (
            <div className={`h-full video-container`}>
            {homepage.videotype === 'link' && homepage.backgroundvideolink && (
              <video
                src={homepage.backgroundvideolink}
                poster={homepage.backgroundvideoposter?.asset?.url}
                className="desktop-video w-full aspect-[1920/1080] object-cover min-h-screen"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            )}

            {homepage.videotype === 'file' && homepage.backgroundvideo?.asset?.url && (
              <video
                src={homepage.backgroundvideo.asset.url}
                poster={homepage.backgroundvideoposter?.asset?.url}
                className="desktop-video w-full aspect-[1920/1080] object-cover min-h-screen"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            )}

            {homepage.videotype === 'link' && homepage.mobilebackgroundvideolink && (
              <video
                src={homepage.mobilebackgroundvideolink}
                poster={homepage.mobilebackgroundvideoposter?.asset?.url}
                className="mobile-video w-full aspect-[1920/1080] object-cover min-h-screen"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            )}

            {homepage.videotype === 'file' && homepage.mobilebackgroundvideo?.asset?.url && (
              <video
                src={homepage.mobilebackgroundvideo.asset.url}
                poster={homepage.mobilebackgroundvideoposter?.asset?.url}
                className="mobile-video w-full aspect-[1920/1080] object-cover min-h-screen"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            )}

            </div>
          )}
          {homepage.backgroundmediaType === "image" && (
            <div className={`h-full`}>
              {homepage.backgroundimage && (
                <Image
                  priority={true}
                  className="desktop-image w-full aspect-[1920/1080] min-h-screen"
                  src={
                    urlFor(homepage.backgroundimage).width(1920).height(1080).quality(75).format("webp").url() ||
                    "/placeholder.svg"
                  }
                  alt={homepage.backgroundimage.alt || ""}
                  width={1920}
                  height={1080}
                  quality={85}
                  sizes="100vw"
                />
              )}
              {homepage.mobilebackgroundimage && (
                <Image
                  priority={true}
                  className="mobile-image w-full aspect-[1920/1080] min-h-screen"
                  src={
                    urlFor(homepage.mobilebackgroundimage).width(1080).height(1920).quality(75).format("webp").url() ||
                    "/placeholder.svg"
                  }
                  alt={homepage.mobilebackgroundimage.alt || ""}
                  width={1080}
                  height={1920}
                  quality={85}
                  sizes="100vw"
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
  )
}