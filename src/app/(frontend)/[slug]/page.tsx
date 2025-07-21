import { notFound } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import FlickityCarousel from "@/components/FlickityCarousel";
import { PortableText } from "@portabletext/react";
import React from "react";
import arrow from '../purple-arrow.svg';
import arrownext from '@/app/mobile-arrow-next.svg';
import arrowprevious from '@/app/mobile-arrow.svg';
import lightbox from '@/app/lightbox.svg';
import PageEffects from "@/components/PageEffects";
import { LayoutTypes } from "@/sanity/types";

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
    <main id="contentWrapper" className={`container content-wrapper ${page.pageType} ${page._id}`}>
      <PageEffects />
      {/* Slideshow Page */}
      {page?.pageType === "slideshowpage" && totalSlides > 0 && (
        <section>
          <FlickityCarousel>
            {transformedSlides.map((slide, index) => {
              const bg = slide.backgroundColor || "#4C2F48";
              const lightboxbg = slide.backgroundColor || "#000000";

              switch (slide.layout) {
                case "imageOnly":
                  if (!slide.image) return <></>
                  return (
                    <div key={index} className="relative min-h-screen overlay-slide">
                      <div className="flickity-top-overlay"></div>
                      {slide.mediaType === 'video' && slide.videoFile?.asset?.url && (
                      <video
                        src={slide.videoFile.asset.url}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      )}
                      {slide.mediaType === 'image' && (
                        <div>
                      <Image
                        priority={true}
                        unoptimized
                        src={urlFor(slide.image).width(3840).height(2160).quality(70).fit('crop').format('jpg').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).fit('crop').url()}
                        className={`slide-image w-full h-full min-h-screen`}
                        style={{
                          objectPosition: slide.image?.hotspot ? 
                            `${(slide.image.hotspot.x * 100)}% ${(slide.image.hotspot.y * 100)}%` : 
                            'center'
                        }}
                      />
                            <div className="lightbox-close panzoom-exclude">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <path d="M1 1L29 29" stroke="#ffffff"/>
                          <path d="M29 1L1 29" stroke="#ffffff"/>
                          </svg>
                        </div>
                        <div className="image-lightbox" style={{ backgroundColor: lightboxbg }}>
                        <Image
                          unoptimized
                          src={urlFor(slide.image).width(3840).height(2160).quality(70).fit('crop').format('jpg').url()}
                          alt={slide.image?.alt || ""}
                          width={3840}
                          height={2160}
                          quality={100}
                          placeholder="blur"
                          blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).fit('crop').url()}
                          className={`w-full h-full overlay-img`}
                          style={{
                            objectPosition: slide.image?.hotspot ? 
                              `${(slide.image.hotspot.x * 100)}% ${(slide.image.hotspot.y * 100)}%` : 
                              'center'
                          }}
                        />
                      </div>
                      </div>
                      )}
                        <div className="slide-footer">
                        <a href={`/${p.slug}`}><h5 className="title">{page.title}</h5></a>
                          <div className="button-previous"><Image src={arrowprevious} alt="previous"/></div>
                          <h5 className="count">{index + 1} / {totalSlides}</h5>
                          <div className="button-next"><Image src={arrownext} alt="next"/></div>
                          {slide.captionOrLinkType === 'link' && slide.linkText && slide.link && (
                            <a href={slide.link} target="_blank" rel="noopener noreferrer">
                              <h5 className="caption">{slide.linkText}</h5>
                            </a>
                          )}
                          {slide.captionOrLinkType !== 'link' && slide.caption && (
                            <h5 className="caption">{slide.caption}</h5>
                          )}
                          <button type="button" className="lightbox">
                              <Image src={lightbox} alt="next"/>
                          </button>
                        </div>
                      <div className="flickity-bottom-overlay"></div>
                      {index + 1 === totalSlides && page?.nextPage?.slug?.current && (() => {
                        const nextBg = (page.nextPageBackgroundColour || "").trim().toLowerCase();
                        let strokeColor;
                        if (!nextBg || nextBg === "#c6bbcf") {
                          strokeColor = "#4C2F48";
                        } else {
                          strokeColor = "#fff";
                        }
                        return (
                          <div className="next-page-link" id="nextPageLink" style={{ backgroundColor: nextBg || "#c6bbcf" }}>
                            <div className="next-page-title" id="next-page-title">
                              <a style={{color: strokeColor}} href={`/${page.nextPage.slug.current}`}>{page.nextPage.title}</a>
                            </div>
                            <a href={`/${page.nextPage.slug.current}`}>
                              <svg className="purple-arrow" width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.999999 28L14.5 14.5L1 0.999999" stroke={strokeColor} />
                              </svg>
                            </a>
                          </div>
                        );
                      })()}
                    </div>
                  );

                case "imageAndTextOverlayWithText":
                  if (!slide.image) return <></>
                  return (
                    <div key={index} className="relative min-h-screen intro-slide overlay-slide">
                      <div className="flickity-top-overlay"></div>
                   {slide.mediaType === 'video' && slide.videoFile?.asset?.url &&  (
                      <video
                        src={slide.videoFile.asset.url}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      )}
                      {slide.mediaType === 'image' && (
                        <div>
                      <Image
                        priority={true}
                        unoptimized
                        src={urlFor(slide.image).width(3840).height(2160).quality(70).fit('crop').format('jpg').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).fit('crop').url()}
                        className={`slide-image w-full h-full min-h-screen`}
                        style={{
                          objectPosition: slide.image?.hotspot ? 
                            `${(slide.image.hotspot.x * 100)}% ${(slide.image.hotspot.y * 100)}%` : 
                            'center'
                        }}
                      />
                       <div className="lightbox-close panzoom-exclude">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <path d="M1 1L29 29" stroke="#ffffff"/>
                          <path d="M29 1L1 29" stroke="#ffffff"/>
                          </svg>
                        </div>
                      <div className="image-lightbox" style={{ backgroundColor: lightboxbg }}>
                        <Image
                          src={urlFor(slide.image).width(3840).height(2160).quality(70).fit('crop').format('jpg').url()}
                          alt={slide.image?.alt || ""}
                          width={3840}
                          height={2160}
                          quality={100}
                          placeholder="blur"
                          blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).fit('crop').url()}
                          className={`w-full h-full overlay-img`}
                          style={{
                            objectPosition: slide.image?.hotspot ? 
                              `${(slide.image.hotspot.x * 100)}% ${(slide.image.hotspot.y * 100)}%` : 
                              'center'
                          }}
                        />
                          </div>
                        </div>
                      )}
                      <div className="slide-overlay">
                        <div className="text">
                          {slide.title && <h5 className="title">{slide.title}</h5>}
                          {slide.text && <div className={`${slide.mobiletext && ('has-mobile-text')}`}><PortableText value={slide.text} /></div>}
                          {(slide.mobiletext || []).map((block, i) => {
                            const Tag = block.style === 'normal' ? 'p' : block.style || 'p';
                            return (
                              <Tag className="mobile-text" key={i}>
                                {block.children?.map((child) => child.text).join('')}
                              </Tag>
                            );
                          })}
                        </div>
                      </div>
                      <div className="slide-footer">
                          <a href={`/${p.slug}`}><h5 className="title">{page.title}</h5></a>
                          <div className="button-previous"><Image src={arrowprevious} alt="previous"/></div>
                          <h5 className="count">{index + 1} / {totalSlides}</h5>
                          <div className="button-next"><Image src={arrownext} alt="next"/></div>
                        </div>
                        {index + 1 === totalSlides && page?.nextPage?.slug?.current && (() => {
                          const nextBg = (page.nextPageBackgroundColour || "").trim().toLowerCase();
                          let strokeColor;
                          if (!nextBg || nextBg === "#c6bbcf") {
                            strokeColor = "#4C2F48";
                          } else {
                            strokeColor = "#fff";
                          }
                          return (
                            <div className="next-page-link" id="nextPageLink" style={{ backgroundColor: nextBg || "#c6bbcf" }}>
                              <div className="next-page-title" id="next-page-title">
                                <a style={{color: strokeColor}} href={`/${page.nextPage.slug.current}`}>{page.nextPage.title}</a>
                              </div>
                              <a href={`/${page.nextPage.slug.current}`}>
                                <svg className="purple-arrow" width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.999999 28L14.5 14.5L1 0.999999" stroke={strokeColor} />
                                </svg>
                              </a>
                            </div>
                          );
                        })()}
                      <div className="flickity-bottom-overlay"></div>
                    </div>
                  );

                case "imageAndTextOverlayPlain":
                  if (!slide.image) return <></>
                  return (
                    <div key={index} className="min-h-screen image-text-overlay-plain">
                      <div className="flickity-top-overlay"></div>
                      {slide.mediaType === 'video' && slide.videoFile?.asset?.url && (
                      <video
                        src={slide.videoFile.asset.url}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      )}
                      {slide.mediaType === 'image' && (
                        <div>
                        <Image
                        priority={true}
                        unoptimized
                        src={urlFor(slide.image).width(3840).height(2160).quality(70).fit('crop').format('jpg').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).fit('crop').url()}
                        className={`slide-image w-full h-full min-h-screen`}
                        style={{
                          objectPosition: slide.image?.hotspot ? 
                            `${(slide.image.hotspot.x * 100)}% ${(slide.image.hotspot.y * 100)}%` : 
                            'center'
                        }}
                      />
                      <div className="lightbox-close panzoom-exclude">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <path d="M1 1L29 29" stroke="#ffffff"/>
                          <path d="M29 1L1 29" stroke="#ffffff"/>
                          </svg>
                        </div>
                      <div className="image-lightbox" style={{ backgroundColor: lightboxbg }}>
                        <Image
                        unoptimized
                          src={urlFor(slide.image).width(3840).height(2160).quality(70).fit('crop').format('jpg').url()}
                          alt={slide.image?.alt || ""}
                          width={3840}
                          height={2160}
                          quality={100}
                          placeholder="blur"
                          blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).fit('crop').url()}
                          className={`w-full h-full overlay-img`}
                          style={{
                            objectPosition: slide.image?.hotspot ? 
                              `${(slide.image.hotspot.x * 100)}% ${(slide.image.hotspot.y * 100)}%` : 
                              'center'
                          }}
                        />
                      </div>
                      </div>
                      )}
                        <div className="slide-overlay">
                        <div className="text">
                          {slide.title && <h5 className="title">{slide.title}</h5>}
                          {slide.text && <div className={`${slide.mobiletext && ('has-mobile-text')}`}><PortableText value={slide.text} /></div>}
                          {(slide.mobiletext || []).map((block, i) => {
                            const Tag = block.style === 'normal' ? 'p' : block.style || 'p';
                            return (
                              <Tag className="mobile-text" key={i}>
                                {block.children?.map((child) => child.text).join('')}
                              </Tag>
                            );
                          })}
                        </div>
                      </div>
                        <div className="slide-footer">
                          <a href={`/${p.slug}`}><h5 className="title">{page.title}</h5></a>
                          <div className="button-previous"><Image src={arrowprevious} alt="previous"/></div>
                          <h5 className="count">{index + 1} / {totalSlides}</h5>
                          <div className="button-next"><Image src={arrownext} alt="next"/></div>
                          {slide.captionOrLinkType === 'link' && slide.linkText && slide.link && (
                            <a href={slide.link} target="_blank" rel="noopener noreferrer">
                              <h5 className="caption">{slide.linkText}</h5>
                            </a>
                          )}
                          {slide.captionOrLinkType !== 'link' && slide.caption && (
                            <h5 className="caption">{slide.caption}</h5>
                          )}
                        </div>
                      <div className="flickity-bottom-overlay"></div>
                      {index + 1 === totalSlides && page?.nextPage?.slug?.current && (() => {
                        const nextBg = (page.nextPageBackgroundColour || "").trim().toLowerCase();
                        let strokeColor;
                        if (!nextBg || nextBg === "#c6bbcf") {
                          strokeColor = "#4C2F48";
                        } else {
                          strokeColor = "#fff";
                        }
                        return (
                          <div className="next-page-link" id="nextPageLink" style={{ backgroundColor: nextBg || "#c6bbcf" }}>
                            <div className="next-page-title" id="next-page-title">
                              <a style={{color: strokeColor}} href={`/${page.nextPage.slug.current}`}>{page.nextPage.title}</a>
                            </div>
                            <a href={`/${page.nextPage.slug.current}`}>
                              <svg className="purple-arrow" width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.999999 28L14.5 14.5L1 0.999999" stroke={strokeColor} />
                              </svg>
                            </a>
                          </div>
                        );
                      })()}
                    </div>
                  );

                case "imageLeftQuoteRight":
                case "imageRightQuoteLeft": {
                  const reverse = slide.layout === "imageLeftQuoteRight";
                  if (!slide.image) return <></>
                  return (
                    <div
                      key={index}
                      className={`quote-slide min-h-screen flex ${reverse ? "flex-row-reverse" : "flex-row"}`}
                      style={{ backgroundColor: bg }}
                    >
                      <div className="flickity-top-overlay"></div>
                      <div className="quote-text">
                        <div className={`${slide.mobiletext && ('inner-text-has-mobile-text')} inner-quote-text`}>
                          {(slide.text || []).map((block, i) => {
                            const Tag = block.style === 'normal' ? 'p' : block.style || 'p';
                            return (
                              <Tag className={`${slide.mobiletext && ('has-mobile-text')}`} key={i}>
                                {block.children?.map((child) => child.text).join('')}
                              </Tag>
                            );
                          })}
                          {(slide.mobiletext || []).map((block, i) => {
                            const Tag = block.style === 'normal' ? 'p' : block.style || 'p';
                            return (
                              <Tag className="mobile-text" key={i}>
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
                      {slide.mediaType === 'video'  && slide.videoFile?.asset?.url && (
                      <video
                        src={slide.videoFile.asset.url}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      )}
                      {slide.mediaType === 'image' && (
                        <div className={`h-full`}>
                      <Image
                        unoptimized
                        src={urlFor(slide.image).width(1920).height(2160).quality(70).fit('crop').format('jpg').url()}
                        alt={slide.image?.alt || ""}
                        width={1920}
                        height={1080}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).fit('crop').url()}
                        className={`object-cover h-full w-full`}
                      />
                      </div>
                      )}
                      </div>
                        <div className="slide-footer">
                          <a href={`/${p.slug}`}><h5 className="title">{page.title}</h5></a>
                          <div className="button-previous"><Image src={arrowprevious} alt="previous"/></div>
                          <h5 className="count">{index + 1} / {totalSlides}</h5>
                          <div className="button-next"><Image src={arrownext} alt="next"/></div>
                          {slide.captionOrLinkType === 'link' && slide.linkText && slide.link && (
                            <a href={slide.link} target="_blank" rel="noopener noreferrer">
                              <h5 className="caption">{slide.linkText}</h5>
                            </a>
                          )}
                          {slide.captionOrLinkType !== 'link' && slide.caption && (
                            <h5 className="caption">{slide.caption}</h5>
                          )}
                        </div>
                      <div className="flickity-bottom-overlay"></div>
                      {index + 1 === totalSlides && page?.nextPage?.slug?.current && (() => {
                        const nextBg = (page.nextPageBackgroundColour || "").trim().toLowerCase();
                        let strokeColor;
                        if (!nextBg || nextBg === "#c6bbcf") {
                          strokeColor = "#4C2F48";
                        } else {
                          strokeColor = "#fff";
                        }
                        return (
                          <div className="next-page-link" id="nextPageLink" style={{ backgroundColor: nextBg || "#c6bbcf" }}>
                            <div className="next-page-title" id="next-page-title">
                              <a style={{color: strokeColor}} href={`/${page.nextPage.slug.current}`}>{page.nextPage.title}</a>
                            </div>
                            <a href={`/${page.nextPage.slug.current}`}>
                              <svg className="purple-arrow" width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.999999 28L14.5 14.5L1 0.999999" stroke={strokeColor} />
                              </svg>
                            </a>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }

                case "imageAndText":
                case "imageLeftTextRight":
                case "imageRightTextLeft": {
                  const reverse = slide.layout === "imageLeftTextRight";
                  if (!slide.image) return <></>
                  return (
                    <div
                      key={index}
                      className={`image-text-slide min-h-screen flex ${reverse ? "flex-row-reverse" : "flex-row"}`}
                      style={{ backgroundColor: bg }}
                    >
                      <div className="flickity-top-overlay"></div>
                      <div className="text" style={{ backgroundColor: bg }}>
                        <div className="inner-text">
                          {slide.title && <h2 className="title">{slide.title}</h2>}
                          {(slide.text || []).map((block, i) => {
                            const Tag = block.style === 'normal' ? 'p' : block.style || 'p';
                            return (
                              <Tag className={`${slide.mobiletext && ('has-mobile-text')}`} key={i}>
                                {block.children?.map((child) => child.text).join('')}
                              </Tag>
                            );
                          })}
                          {(slide.mobiletext || []).map((block, i) => {
                            const Tag = block.style === 'normal' ? 'p' : block.style || 'p';
                            return (
                              <Tag className="mobile-text" key={i}>
                                {block.children?.map((child) => child.text).join('')}
                              </Tag>
                            );
                          })}
                        </div>
                      </div>
                      {slide.mediaType === 'video' && slide.videoFile?.asset?.url && (
                      <video
                        src={slide.videoFile.asset.url}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      )}
                      {slide.mediaType === 'image' && (
                        <div className="image-container">
                      <Image
                        unoptimized
                        src={urlFor(slide.image).width(1920).height(2160).quality(70).fit('crop').format('jpg').url()}
                        alt={slide.image?.alt || ""}
                        width={1920}
                        height={1080}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).fit('crop').url()}
                        className={`object-cover min-h-screen`}
                      />
                      </div>
                    )}
                      <div className="slide-footer">
                          <a href={`/${p.slug}`}><h5 className="title">{page.title}</h5></a>
                          <div className="button-previous"><Image src={arrowprevious} alt="previous"/></div>
                          <h5 className="count">{index + 1} / {totalSlides}</h5>
                          <div className="button-next"><Image src={arrownext} alt="next"/></div>
                          {slide.captionOrLinkType === 'link' && slide.linkText && slide.link && (
                            <a href={slide.link} target="_blank" rel="noopener noreferrer">
                              <h5 className="caption">{slide.linkText}</h5>
                            </a>
                          )}
                          {slide.captionOrLinkType !== 'link' && slide.caption && (
                            <h5 className="caption">{slide.caption}</h5>
                          )}
                        </div>
                      <div className="flickity-bottom-overlay"></div>
                      {index + 1 === totalSlides && page?.nextPage?.slug?.current && (() => {
                        const nextBg = (page.nextPageBackgroundColour || "").trim().toLowerCase();
                        let strokeColor;
                        if (!nextBg || nextBg === "#c6bbcf") {
                          strokeColor = "#4C2F48";
                        } else {
                          strokeColor = "#fff";
                        }
                        return (
                          <div className="next-page-link" id="nextPageLink" style={{ backgroundColor: nextBg || "#c6bbcf" }}>
                            <div className="next-page-title" id="next-page-title">
                              <a style={{color: strokeColor}} href={`/${page.nextPage.slug.current}`}>{page.nextPage.title}</a>
                            </div>
                            <a href={`/${page.nextPage.slug.current}`}>
                              <svg className="purple-arrow" width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.999999 28L14.5 14.5L1 0.999999" stroke={strokeColor} />
                              </svg>
                            </a>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }

                case "smallImageLeftLargeImageRight":
                case "largeImageLeftSmallImageRight": {
                  const reverse = slide.layout === "largeImageLeftSmallImageRight";
                  if (!slide.image) return <></>
                  return (
                    <div
                      key={index}
                      className={`small-large-image-slide ${slide.layout}  min-h-screen flex`}
                      style={{ backgroundColor: bg }}
                    >
                      <div className="flickity-top-overlay"></div>
                      {!reverse && slide.smallImage && (
                        <div className="smallImageContainer">
                      {slide.smallmediaType === 'video' && slide.videoFile?.asset?.url && (
                      <video
                        src={slide.videoFile.asset.url}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      )}
                      {slide.smallmediaType === 'image' && (
                        <div>
                        <Image
                        unoptimized
                        src={urlFor(slide.smallImage).width(600).height(400).quality(70).fit('crop').format('jpg').url()}
                        alt={slide.smallImage?.alt || ""}
                        width={600}
                        height={400}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.smallImage).width(10).height(6).quality(10).fit('crop').url()}
                        className={`object-cover slide-image`}
                      />
                        </div>
                      )}
                        </div>
                      )}
                      <div className="largeImageContainer">
                      {slide.mediaType === 'video' && slide.videoFile?.asset?.url && (
                      <video
                        src={slide.videoFile.asset.url}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      )}
                      {slide.mediaType === 'image' && (
                        <div>
                      <Image
                        unoptimized
                        src={urlFor(slide.image).width(1920).height(2160).quality(70).fit('crop').format('jpg').url()}
                        alt={slide.image?.alt || ""}
                        width={1920}
                        height={1080}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).fit('crop').url()}
                        className="object-cover min-h-screen"
                      />
                      </div>
                    )}
                      </div>
                      {reverse && slide.smallImage && (
                        <div className="smallImageContainer">
                        {slide.mediaType === 'video' && slide.videoFile?.asset?.url && (
                      <video
                        src={slide.videoFile.asset.url}
                        className="w-full aspect-[1920/1080] object-cover min-h-screen"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      )}
                      {slide.mediaType === 'image' && (
                        <div>
                        <Image
                        unoptimized
                        src={urlFor(slide.smallImage).width(600).height(400).quality(70).fit('crop').format('jpg').url()}
                        alt={slide.smallImage?.alt || ""}
                        width={600}
                        height={400}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.smallImage).width(10).height(6).quality(10).fit('crop').url()}
                        className={`object-cover`}
                      />
                      </div>
                    )}
                        </div>
                      )}
                        <div className="slide-footer">
                          <a href={`/${p.slug}`}><h5 className="title">{page.title}</h5></a>
                          <div className="button-previous"><Image src={arrowprevious} alt="previous"/></div>
                          <h5 className="count">{index + 1} / {totalSlides}</h5>
                          <div className="button-next"><Image src={arrownext} alt="next"/></div>
                          {slide.captionOrLinkType === 'link' && slide.linkText && slide.link && (
                            <a href={slide.link} target="_blank" rel="noopener noreferrer">
                              <h5 className="caption">{slide.linkText}</h5>
                            </a>
                          )}
                          {slide.captionOrLinkType !== 'link' && slide.caption && (
                            <h5 className="caption">{slide.caption}</h5>
                          )}
                        </div>
                      <div className="flickity-bottom-overlay"></div>
                      {index + 1 === totalSlides && page?.nextPage?.slug?.current && (() => {
                        const nextBg = (page.nextPageBackgroundColour || "").trim().toLowerCase();
                        let strokeColor;
                        if (!nextBg || nextBg === "#c6bbcf") {
                          strokeColor = "#4C2F48";
                        } else {
                          strokeColor = "#fff";
                        }
                        return (
                          <div className="next-page-link" id="nextPageLink" style={{ backgroundColor: nextBg || "#c6bbcf" }}>
                            <div className="next-page-title" id="next-page-title">
                              <a style={{color: strokeColor}} href={`/${page.nextPage.slug.current}`}>{page.nextPage.title}</a>
                            </div>
                            <a href={`/${page.nextPage.slug.current}`}>
                              <svg className="purple-arrow" width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.999999 28L14.5 14.5L1 0.999999" stroke={strokeColor} />
                              </svg>
                            </a>
                          </div>
                        );
                      })()}
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
                src={urlFor(page.introimage).width(600).height(400).fit('crop').url()}
                alt="symbol"
                width={600}
                height={400}
                className="intro-image"
              />
            )}
           { page.introblock ? <PortableText value={page.introblock} /> : <></>}
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
        </>
  );
}