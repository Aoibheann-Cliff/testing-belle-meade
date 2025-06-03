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
  slides[]{
    layout,
    title,
    text,
    mobiletext,
    linkText,
    link,
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
      alt
    },
    mobileimage {
      asset->{
        url
      },
      alt
    },
    smallImage {
      asset->{
        url
      },
      alt
    }
  }
}`)


export const HOMEPAGE_QUERY = `
  *[_type == "page" && slug.current == "home"][0]{
    title,
    text,
    homepageslides[]{
      mediaType,
      videoFile{
        asset->{
          url
        }
      },
      image {
        asset->{
          url
        },
        alt
      },
      mobileimage {
        asset->{
          url
        },
        alt
      }
    },
    designpagemediaType,
    craftsmanshippagemediaType,
    residencespagemediaType,
    amenitiespagemediaType,
    parkpagemediaType,
    villagepagemediaType,
    designpageimage {
      asset->{
        _id,
        url
      },
      alt
    },
    craftsmanshippageimage {
      asset->{
        _id,
        url
      },
      alt
    },
    residencespageimage {
      asset->{
        _id,
        url
      },
      alt
    },
    amenitiespageimage {
      asset->{
        _id,
        url
      },
      alt
    },
    parkpageimage {
      asset->{
        _id,
        url
      },
      alt
    },
    villagepageimage{
      asset->{
        _id,
        url
      },
      alt
    },
    designpagevideo{
      asset->{
        url
      }
    },
    craftsmanshippagevideo{
      asset->{
        url
      }
    },
    residencespagevideo{
      asset->{
        url
      }
    },
    amenitiespagevideo{
      asset->{
        url
      }
    },
    parkpagevideo{
      asset->{
        url
      }
    },
    villagepagevideo{
      asset->{
        url
      }
    },
    body
  }
`;
