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
    <main id="contentWrapper" className={`container content-wrapper ${page.pageType}`}>
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
                        src={urlFor(slide.image).width(3840).height(2160).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className={`${slide.mobileimage && ('has-mobile-image')} slide-image w-full aspect-[1920/1080] object-cover min-h-screen`}
                      />
                      {slide.mobileimage && (
                      <Image
                        src={urlFor(slide.mobileimage).width(3840).height(2160).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="mobile-image slide-image w-full aspect-[1920/1080] object-cover min-h-screen"
                      />
                          )}
                            <div className="lightbox-close panzoom-exclude">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <path d="M1 1L29 29" stroke="#ffffff"/>
                          <path d="M29 1L1 29" stroke="#ffffff"/>
                          </svg>
                        </div>
                        <div className="image-lightbox" style={{ backgroundColor: lightboxbg }}>
                        <Image
                          src={urlFor(slide.image).width(3840).height(2160).quality(70).auto('format').url()}
                          alt={slide.image?.alt || ""}
                          width={3840}
                          height={2160}
                          quality={100}
                          placeholder="blur"
                          blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                          className={`${slide.mobileimage && ('has-mobile-image')} w-full overlay-img`}
                        />
                      {slide.mobileimage && (
                      <Image
                        src={urlFor(slide.mobileimage).width(3840).height(2160).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="mobile-image w-full overlay-img"
                      />
                          )}
                      </div>
                      </div>
                      )}
                        <div className="slide-footer">
                          <h5 className="title">{page.title}</h5>
                          <div className="button-previous"><Image src={arrowprevious} alt="previous"/></div>
                          <h5 className="count">{index + 1} / {totalSlides}</h5>
                          <div className="button-next"><Image src={arrownext} alt="next"/></div>
                          {slide.caption && (<h5 className="caption">{slide.caption}</h5>)}
                          <button type="button" className="lightbox">
                              <Image src={lightbox} alt="next"/>
                          </button>
                        </div>
                      <div className="flickity-bottom-overlay"></div>
                      {index + 1 === totalSlides && page?.nextPage?.slug?.current && (
                     <a href={`/${page.nextPage.slug.current}`}>
                      <div className="next-page-link" id="nextPageLink">
                            <div className="next-page-title" id="next-page-title">{page.nextPage.title}</div>
                            <Image
                              className="purple-arrow"
                              src={arrow}
                              alt="arrow"
                              width={27}
                              height={13.5}
                            />
                        </div>
                        </a>
                      )}
                    </div>
                  );

                case "imageAndTextOverlayWithText":
                  if (!slide.image) return <></>
                  return (
                    <div key={index} className="relative min-h-screen intro-slide overlay-slide">
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
                        src={urlFor(slide.image).width(3840).height(2160).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className={`${slide.mobileimage && ('has-mobile-image')} slide-image w-full aspect-[1920/1080] object-cover min-h-screen overlay-img`}
                      />
                      {slide.mobileimage && (
                      <Image
                        src={urlFor(slide.mobileimage).width(3840).height(2160).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="mobile-image slide-image w-full aspect-[1920/1080] object-cover min-h-screen"
                      />
                          )}
                                             <div className="lightbox-close panzoom-exclude">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <path d="M1 1L29 29" stroke="#ffffff"/>
                          <path d="M29 1L1 29" stroke="#ffffff"/>
                          </svg>
                        </div>
                      <div className="image-lightbox" style={{ backgroundColor: lightboxbg }}>
                        <Image
                          src={urlFor(slide.image).width(3840).height(2160).quality(70).auto('format').url()}
                          alt={slide.image?.alt || ""}
                          width={3840}
                          height={2160}
                          quality={100}
                          placeholder="blur"
                          blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                          className={`${slide.mobileimage && ('has-mobile-image')} w-full overlay-img`}
                        />
                         {slide.mobileimage && (
                      <Image
                        src={urlFor(slide.mobileimage).width(3840).height(2160).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="mobile-image w-full overlay-img"
                      />
                          )}
                          </div>
                        </div>
                      )}
                      <div className="slide-overlay">
                        <div className="text">
                          {slide.title && <h5 className="title">{slide.title}</h5>}
                          {slide.text && <PortableText value={slide.text} />}
                          {slide.linkText && slide.link &&(
                            <a href={slide.link} target="_blank">
                              <h5>{slide.linkText}</h5>
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="slide-footer">
                          <h5 className="title">{page.title}</h5>
                          <div className="button-previous"><Image src={arrowprevious} alt="previous"/></div>
                          <h5 className="count">{index + 1} / {totalSlides}</h5>
                          <div className="button-next"><Image src={arrownext} alt="next"/></div>
                        </div>
                        {index + 1 === totalSlides && page?.nextPage?.slug?.current && (
                        <a href={`/${page.nextPage.slug.current}`}>
                          <div className="next-page-link" id="nextPageLink">
                            <div className="next-page-title" id="next-page-title">{page.nextPage.title}</div>
                            <Image
                              className="purple-arrow"
                              src={arrow}
                              alt="arrow"
                              width={27}
                              height={13.5}
                            />
                          </div>
                        </a>
                      )}
                    </div>
                  );

                case "imageAndTextOverlayPlain":
                  if (!slide.image) return <></>
                  return (
                    <div key={index} className="min-h-screen">
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
                        src={urlFor(slide.image).width(3840).height(2160).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className={`${slide.mobileimage && ('has-mobile-image')} slide-image w-full aspect-[1920/1080] object-cover min-h-screen`}
                      />
                      {slide.mobileimage && (
                      <Image
                        src={urlFor(slide.mobileimage).width(3840).height(2160).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="mobile-image slide-image w-full aspect-[1920/1080] object-cover min-h-screen"
                      />
                          )}
                      <div className="lightbox-close panzoom-exclude">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <path d="M1 1L29 29" stroke="#ffffff"/>
                          <path d="M29 1L1 29" stroke="#ffffff"/>
                          </svg>
                        </div>
                      <div className="image-lightbox" style={{ backgroundColor: lightboxbg }}>
                        <Image
                          src={urlFor(slide.image).width(3840).height(2160).quality(70).auto('format').url()}
                          alt={slide.image?.alt || ""}
                          width={3840}
                          height={2160}
                          quality={100}
                          placeholder="blur"
                          blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                          className={`${slide.mobileimage && ('has-mobile-image')} w-full overlay-img`}
                        />
                                              {slide.mobileimage && (
                      <Image
                        src={urlFor(slide.mobileimage).width(3840).height(2160).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="mobile-image w-full overlay-img"
                      />
                          )}
                      </div>
                      </div>
                      )}
                        <div className="slide-footer">
                          <h5 className="title">{page.title}</h5>
                          <div className="button-previous"><Image src={arrowprevious} alt="previous"/></div>
                          <h5 className="count">{index + 1} / {totalSlides}</h5>
                          <div className="button-next"><Image src={arrownext} alt="next"/></div>
                          {slide.caption && (<h5 className="caption">{slide.caption}</h5>)}
                        </div>
                      <div className="flickity-bottom-overlay"></div>
                      {index + 1 === totalSlides && page?.nextPage?.slug?.current && (
                        <a href={`/${page.nextPage.slug.current}`}>
                          <div className="next-page-link" id="nextPageLink">
                            <div className="next-page-title" id="next-page-title">{page.nextPage.title}</div>
                            <Image
                              className="purple-arrow"
                              src={arrow}
                              alt="arrow"
                              width={27}
                              height={13.5}
                            />
                          </div>
                        </a>
                      )}
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
                        <div>
                      <Image
                        src={urlFor(slide.image).width(960).height(1080).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={960}
                        height={1080}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className={`${slide.mobileimage && ('has-mobile-image')} object-cover h-full w-full`}
                      />
                      {slide.mobileimage && (
                      <Image
                        src={urlFor(slide.mobileimage).width(3840).height(2160).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="mobile-image slide-image w-full aspect-[1920/1080] object-cover min-h-screen"
                      />
                      )}
                      </div>
                      )}
                      </div>
                        <div className="slide-footer">
                          <h5 className="title">{page.title}</h5>
                          <div className="button-previous"><Image src={arrowprevious} alt="previous"/></div>
                          <h5 className="count">{index + 1} / {totalSlides}</h5>
                          <div className="button-next"><Image src={arrownext} alt="next"/></div>
                          {slide.caption && (<h5 className="caption">{slide.caption}</h5>)}
                        </div>
                      <div className="flickity-bottom-overlay"></div>
                      {index + 1 === totalSlides && page?.nextPage?.slug?.current && (
                        <a href={`/${page.nextPage.slug.current}`}>
                          <div className="next-page-link" id="nextPageLink">
                            <div className="next-page-title" id="next-page-title">{page.nextPage.title}</div>
                            <Image
                              className="purple-arrow"
                              src={arrow}
                              alt="arrow"
                              width={27}
                              height={13.5}
                            />
                          </div>
                        </a>
                      )}
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
                              <Tag key={i}>
                                {block.children?.map((child) => child.text).join('')}
                              </Tag>
                            );
                          })}
                        {slide.linkText && slide.link &&(
                            <a href={slide.link} target="_blank">
                              <h5>{slide.linkText}</h5>
                            </a>
                          )}
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
                        src={urlFor(slide.image).width(960).height(1080).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={960}
                        height={1080}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className={`${slide.mobileimage && ('has-mobile-image')} object-cover min-h-screen`}
                      />
                          {slide.mobileimage && (
                      <Image
                        src={urlFor(slide.mobileimage).width(3840).height(2160).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="mobile-image slide-image w-full aspect-[1920/1080] object-cover min-h-screen"
                      />
                          )}
                      </div>
                    )}
                      <div className="flickity-bottom-overlay"></div>
                      {index + 1 === totalSlides && page?.nextPage?.slug?.current && (
                        <a href={`/${page.nextPage.slug.current}`}>
                          <div className="next-page-link" id="nextPageLink">
                            <div className="next-page-title" id="next-page-title">{page.nextPage.title}</div>
                            <Image
                              className="purple-arrow"
                              src={arrow}
                              alt="arrow"
                              width={27}
                              height={13.5}
                            />
                          </div>
                        </a>
                      )}
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
                      className="small-large-image-slide min-h-screen flex"
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
                        src={urlFor(slide.smallImage).width(600).height(400).quality(70).auto('format').url()}
                        alt={slide.smallImage?.alt || ""}
                        width={600}
                        height={400}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.smallImage).width(10).height(6).quality(10).url()}
                        className={`${slide.mobileimage && ('has-mobile-image')} object-cover slide-image`}
                      />
                        {slide.mobileimage && (
                      <Image
                        src={urlFor(slide.mobileimage).width(3840).height(2160).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="mobile-image slide-image w-full aspect-[1920/1080] object-cover min-h-screen"
                      />
                      )}
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
                        src={urlFor(slide.image).width(960).height(1080).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={960}
                        height={1080}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
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
                        src={urlFor(slide.smallImage).width(600).height(400).quality(70).auto('format').url()}
                        alt={slide.smallImage?.alt || ""}
                        width={600}
                        height={400}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.smallImage).width(10).height(6).quality(10).url()}
                        className={`${slide.mobileimage && ('has-mobile-image')} object-cover`}
                      />
                      {slide.mobileimage && (
                      <Image
                        src={urlFor(slide.mobileimage).width(3840).height(2160).quality(70).auto('format').url()}
                        alt={slide.image?.alt || ""}
                        width={3840}
                        height={2160}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={urlFor(slide.image).width(10).height(6).quality(10).url()}
                        className="mobile-image slide-image w-full aspect-[1920/1080] object-cover min-h-screen"
                      />
                      )}
                      </div>
                    )}
                        </div>
                      )}
                        <div className="slide-footer">
                          <h5 className="title">{page.title}</h5>
                          <div className="button-previous"><Image src={arrowprevious} alt="previous"/></div>
                          <h5 className="count">{index + 1} / {totalSlides}</h5>
                          <div className="button-next"><Image src={arrownext} alt="next"/></div>
                          {slide.caption && (<h5 className="caption">{slide.caption}</h5>)}
                        </div>
                      <div className="flickity-bottom-overlay"></div>
                      {index + 1 === totalSlides && page?.nextPage?.slug?.current && (
                        <a href={`/${page.nextPage.slug.current}`}>
                          <div className="next-page-link" id="nextPageLink">
                            <div className="next-page-title" id="next-page-title">{page.nextPage.title}</div>
                            <Image
                              className="purple-arrow"
                              src={arrow}
                              alt="arrow"
                              width={27}
                              height={13.5}
                            />
                          </div>
                        </a>
                      )}
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
                alt="symbol"
                width={600}
                height={400}
                className="object-contain intro-image"
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