import { notFound } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import FlickityCarousel from "@/components/FlickityCarousel";
import { PortableText } from "@portabletext/react";
import React from "react";
import arrow from '../purple-arrow.svg';
import PageEffects from "@/components/PageEffects";
import { LayoutTypes } from "@/sanity/types";
// import dynamic from "next/dynamic";
// const PageEffects = dynamic(() => import("@/components/PageEffects"));


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const p = await params
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug: p.slug },
  });

  if (!page) notFound();

  // Flatten and transform slides
  const transformedSlides = page.slides?.flatMap((slide) => {
    if (slide.layout === "imageAndTextOverlay") {
      return [
        { ...slide, layout: "imageAndTextOverlayWithText" as LayoutTypes },
        { ...slide, layout: "imageAndTextOverlayPlain" as LayoutTypes },
      ];
    }
    return [slide];
  }) || [];


  const totalSlides = transformedSlides.length;

  return (
    <>
    <main id="contentWrapper" className={`container content-wrapper ${page.pageType}`}>
      <PageEffects />
      {/* Slideshow Page */}
      {page?.pageType === "slideshowpage" && totalSlides > 0 && (
        <section>
          <FlickityCarousel>
            {transformedSlides.map((slide, index) => {
              const bg = slide.backgroundColor || "#4C2F48";

              switch (slide.layout) {
                case "imageOnly":
                  return (
                    <div key={index} className={`relative min-h-screen overlay-slide ${index + 1 === totalSlides ? 'lastslide' : 'slide'}`}>
                      <div className="flickity-top-overlay"></div>
                      <Image
                        src={urlFor(slide.image).width(3840).height(2160).quality(100).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                      />
                      {slide.caption && (
                        <div className="slide-footer">
                          <h5 className="title">{page.title}</h5>
                          <h5 className="count">{index + 1} / {totalSlides}</h5>
                          <h5 className="caption">{slide.caption}</h5>
                        </div>
                      )}
                      <div className="flickity-bottom-overlay"></div>
                    </div>
                  );

                case "imageAndTextOverlayWithText":
                  return (
                    <div key={index} className={`relative min-h-screen overlay-slide ${index + 1 === totalSlides ? 'lastslide' : 'slide'}`}>
                      <Image
                        src={urlFor(slide.image).width(3840).height(2160).quality(100).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen overlay-img"
                      />
                      <div className="slide-overlay">
                        <div className="text">
                          {slide.title && <h5 className="title">{slide.title}</h5>}
                          {slide.text && <PortableText value={slide.text} />}
                          {slide.link && (
                            <a href={slide.link} target="_blank" className="underline">
                              {new URL(slide.link).hostname.replace(/^www\./, "")}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );

                case "imageAndTextOverlayPlain":
                  return (
                    <div key={index} className={`min-h-screen ${index + 1 === totalSlides ? 'lastslide' : 'slide'}`}>
                      <div className="flickity-top-overlay"></div>
                        <Image
                        src={urlFor(slide.image).width(3840).height(2160).quality(100).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                      />
                      {slide.caption && (
                        <div className="slide-footer">
                          <h5 className="title">{page.title}</h5>
                          <h5 className="count">{index + 1} / {totalSlides}</h5>
                          <h5 className="caption">{slide.caption}</h5>
                        </div>
                      )}
                      <div className="flickity-bottom-overlay"></div>
                    </div>
                  );

                case "imageLeftQuoteRight":
                case "imageRightQuoteLeft": {
                  const reverse = slide.layout === "imageLeftQuoteRight";
                  return (
                    <div
                      key={index}
                      className={`quote-slide min-h-screen flex ${reverse ? "flex-row-reverse" : "flex-row"} ${index + 1 === totalSlides ? 'lastslide' : 'slide'}`}
                      style={{ backgroundColor: bg }}
                    >
                      <div className="flickity-top-overlay"></div>
                      <div className="quote-text">
                        <div className="inner-quote-text">
                          {slide.text.map((block, i) => {
                            const Tag = block.style === 'normal' ? 'p' : block.style || 'p';
                            return (
                              <Tag key={i}>
                                {block.children?.map((child) => child.text).join('')}
                              </Tag>
                            );
                          })}
                          <div className="credit">
                            <h6>{slide.credit}</h6>
                          </div>
                        </div>
                      </div>
                      <div className="quote-image">
                      <Image
                        src={urlFor(slide.image).width(960).height(1080).quality(100).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={960}
                        height={1080}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="object-cover h-full w-full"
                      />
                      </div>
                      {slide.caption && (
                        <div className="slide-footer">
                          <h5 className="title">{page.title}</h5>
                          <h5 className="count">{index + 1} / {totalSlides}</h5>
                          <h5 className="caption">{slide.caption}</h5>
                        </div>
                      )}
                      <div className="flickity-bottom-overlay"></div>
                    </div>
                  );
                }

                case "imageAndText":
                case "imageLeftTextRight":
                case "imageRightTextLeft": {
                  const reverse = slide.layout === "imageRightTextLeft";
                  return (
                    <div
                      key={index}
                      className={`image-text-slide min-h-screen flex ${reverse ? "flex-row-reverse" : "flex-row"} ${index + 1 === totalSlides ? 'lastslide' : 'slide'}`}
                      style={{ backgroundColor: bg }}
                    >
                      <div className="flickity-top-overlay"></div>
                      <div className="text">
                        <div className="inner-text">
                          {slide.title && <h2 className="title">{slide.title}</h2>}
                          {slide.text.map((block, i) => {
                            const Tag = block.style === 'normal' ? 'p' : block.style || 'p';
                            return (
                              <Tag key={i}>
                                {block.children?.map((child) => child.text).join('')}
                              </Tag>
                            );
                          })}
                          {slide.link && (
                            <a href={slide.link} target="_blank" className="link">
                              <h5>{new URL(slide.link).hostname.replace(/^www\./, "")}</h5>
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="image">
                      <Image
                        src={urlFor(slide.image).width(960).height(1080).quality(100).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={960}
                        height={1080}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="object-cover min-h-screen"
                      />
                      </div>
                      <div className="flickity-bottom-overlay"></div>
                    </div>
                  );
                }

                case "smallImageLeftLargeImageRight":
                case "largeImageLeftSmallImageRight": {
                  const reverse = slide.layout === "largeImageLeftSmallImageRight";
                  return (
                    <div
                      key={index}
                      className={`small-large-image-slide min-h-screen flex ${index + 1 === totalSlides ? 'lastslide' : 'slide'}`}
                      style={{ backgroundColor: bg }}
                    >
                      <div className="flickity-top-overlay"></div>
                      {!reverse && (
                        <div className="smallImageContainer">
                        <Image
                        src={urlFor(slide.smallImage).width(600).height(400).quality(100).auto('format').url()}
                        alt={slide.smallImage?.alt || ""}
                        width={600}
                        height={400}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.smallImage).width(10).height(6).quality(10).url()}
                        className="object-cover"
                      />
                        </div>
                      )}
                      <div className="largeImageContainer">
                      <Image
                        src={urlFor(slide.image).width(960).height(1080).quality(100).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={960}
                        height={1080}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="object-cover min-h-screen"
                      />
                      </div>
                      {reverse && (
                        <div className="smallImageContainer">
                        <Image
                        src={urlFor(slide.smallImage).width(600).height(400).quality(100).auto('format').url()}
                        alt={slide.smallImage?.alt || ""}
                        width={600}
                        height={400}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.smallImage).width(10).height(6).quality(10).url()}
                        className="object-cover"
                      />
                        </div>
                      )}
                      {slide.caption && (
                        <div className="slide-footer">
                          <h5 className="title">{page.title}</h5>
                          <h5 className="count">{index + 1} / {totalSlides}</h5>
                          <h5 className="caption">{slide.caption}</h5>
                        </div>
                      )}
                      <div className="flickity-bottom-overlay"></div>
                    </div>
                  );
                }

                default:
                  return null;
              }
            })}
          </FlickityCarousel>
        </section>
      )}

      {/* Text Page */}
      {page?.pageType === "textpage" && (
        <>
          <section className="textpage-title">
            <h1 className="title">{page.headline}</h1>
          </section>

          <section className="introblock">
            {page.introimage && (
              <Image
                src={urlFor(page.introimage).width(600).height(400).url()}
                alt={page.introimage.alt || ""}
                width={600}
                height={400}
                className="object-contain intro-image"
              />
            )}
            <PortableText value={page.introblock} />
          </section>

          <section className="text-section">
            {page.textSections?.map((section, index) => (
              <div className="text-block" key={index}>
                {section.heading && <h5 className="title">{section.heading}</h5>}
                {section.body && <PortableText value={section.body} />}
              </div>
            ))}
          </section>
        </>
      )}
    </main>
    {page?.pageType === "slideshowpage" && totalSlides > 0 && (
           <a href={`/${page.nextPage.slug.current}`} >
           <div className="next-page-link" id="nextPageLink">
             <div className="next-page-title" id="next-page-title">{page.nextPage.title}</div>
             <Image
               className="purple-arrow"
               src={arrow}
               alt={"arrow"}
               width={27}
               height={13.5}
             />
         </div>
         </a>
    )}
        </>
  );
}
