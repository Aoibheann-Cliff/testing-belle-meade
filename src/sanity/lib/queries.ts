import { defineQuery } from 'next-sanity'

export const PAGES_SLUGS_QUERY =
  defineQuery(`*[_type == "page" && defined(slug.current)]{ 
  "slug": slug.current
}`)

export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  body,
  headline,
  introimage,
  introblock,
  introtext,
  pageType,
  contactformtext,
  textSections,
  nextPage->{
    title,
    slug
  },
  nextPageBackgroundColour,
  slides[]{
    layout,
    title,
    text,
    mobiletext,
    linkText,
    link,
    captionOrLinkType,
    mediaType,
    smallmediaType,
    caption,
    credit,
    backgroundColor,
    videoFile{
      asset->{
        url
      }
    },
    image {
      asset->{
        url
      },
      hotspot,
      crop,
      alt
    },
    smallImage {
      asset->{
        url
      },
      hotspot,
      crop,
      alt
    }
  }
}`)


export const HOMEPAGE_QUERY = `
  *[_type == "page" && slug.current == "home"][0]{
    title,
    text,
    backgroundmediaType,
    backgroundimage {
      asset->{
        _id,
        url
      },
      hotspot,
      crop,
      alt
    },
    mobilebackgroundimage {
      asset->{
        _id,
        url
      },
      hotspot,
      crop,
      alt
    },
    backgroundvideo{
      asset->{
        url
      }
    },
   mobilebackgroundvideo{
      asset->{
        url
      }
    },
    body
  }
`;
