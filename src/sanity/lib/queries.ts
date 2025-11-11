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
  thankyoumessage,
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
    videolink,
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
    smallvideoLink,
    smallvideoFile{
      asset->{
        url
      }
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

export const metaDataQuery = `
  *[_type == "metaData"][0] {
    title,
    description,
    keywords,
    "socialImage": socialimage.asset->url
  }
`;

export const HOMEPAGE_QUERY = `
  *[_type == "page" && slug.current == "home"][0]{
    title,
    text,
    backgroundvideolink,
    mobilebackgroundvideolink,
    backgroundmediaType,
    videotype,
    popup {
      icon {
        asset->{
          _id,
          url
        }
      },
      title,
      text[],
      image {
        asset->{
          _id,
          url
        }
      },
      link,
      linktext
    },
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
      backgroundvideoposter {
      asset->{
        _id,
        url
      },
      hotspot,
      crop,
      alt
    },
       mobilebackgroundvideoposter {
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
