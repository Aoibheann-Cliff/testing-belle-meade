import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'pageType',
      title: "Page Type",
      type: 'string',
      options: {
        list: [
          { title: 'Homepage', value: 'homepage' },
          { title: 'Slideshow Page', value: 'slideshowpage' },
          { title: 'Text Page', value: 'textpage' },
          { title: 'Contact Page', value: 'contactpage' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'headline',
      type: 'string',
    hidden: ({ document }) => document?.pageType !== 'textpage',
    }),
    defineField({
      name: 'introimage',
      title: 'Intro Image',
      type: 'image',
      hidden: ({ document }) => document?.pageType !== 'textpage',
    }),
    defineField({
    name: 'introblock',
    title: 'Intro Block',
    type: 'blockContent',
    hidden: ({ document }) => document?.pageType !== 'textpage',
  }),
    defineField({
      name: 'text',
      type: 'string',
      hidden: ({ document }) => document?.pageType !== "homepage",
    }),
    defineField({
      name: 'contactformtext',
      title: 'Contact Form Text',
      type: 'string',
      hidden: ({ document }) => document?.pageType !== "contactpage",
    }),
    defineField({
      name: 'homepageimage',
      title: 'Homepage Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.pageType !== "homepage",
    }),
    defineField({
      name: 'designpageimage',
      title: 'Design Page Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.pageType !== "homepage",
    }),
    defineField({
      name: 'craftsmanshippageimage',
      title: 'Craftsmanship Page Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.pageType !== "homepage",
    }),
    defineField({
      name: 'residencespageimage',
      title: 'Residences Page Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.pageType !== "homepage",
    }),
    defineField({
      name: 'amenitiespageimage',
      title: 'Amenities Page Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.pageType !== "homepage",
    }),
    defineField({
      name: 'parkpageimage',
      title: 'Park & Gardens Page Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.pageType !== "homepage",
    }),
    defineField({
      name: 'villagepageimage',
      title: 'Belle Meade Village Page Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.pageType !== "homepage",
    }),
    defineField({
      name: 'textSections',
      title: 'Text Sections',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'body', type: 'blockContent', title: 'Body' }
          ]
        })
      ],
      hidden: ({ document }) => document?.pageType !== 'textpage',
    }),      
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        defineField({
          name: 'slide',
          type: 'object',
          title: 'Slide',
          preview: {
            select: {
              title: 'title',
              caption: 'caption',
              media: 'image',
            },
            prepare(selection) {
              const { title, caption, media } = selection
              return {
                title: title || caption || 'Untitled Slide',
                media,
              }
            },
          },
          fields: [
            {
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  { title: 'Media Only', value: 'imageOnly' },
                  { title: 'Media & Text', value: 'imageAndText' },
                  { title: 'Media & Text Overlay', value: 'imageAndTextOverlay' },
                  { title: 'Media Right, Text Left', value: 'imageRightTextLeft' },
                  { title: 'Media Left, Quote Right', value: 'imageLeftQuoteRight' },
                  { title: 'Media Right, Quote Left', value: 'imageRightQuoteLeft' },
                  { title: 'Media Left, Text Right', value: 'imageLeftTextRight' },
                  { title: 'Small Media Left, Large Media Right', value: 'smallImageLeftLargeImageRight' },
                  { title: 'Large Media Left, Small Media Right', value: 'largeImageLeftSmallImageRight' },
                ],
                layout: 'dropdown',
              },
            },
            {
              name: 'mediaType',
              title: "Media Type",
              type: 'string',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Video', value: 'video' },
                ],
                layout: 'dropdown',
              },
            },
            {
              name: 'smallmediaType',
              title: "Small Media Type",
              type: 'string',
              hidden: ({ parent }) => parent?.layout !== 'smallImageLeftLargeImageRight' && parent?.layout !== 'largeImageLeftSmallImageRight',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Video', value: 'video' },
                ],
                layout: 'dropdown',
              },
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              hidden: ({ parent }) => parent?.mediaType !== 'image',
              options: { hotspot: true },
              fields: [
                { name: 'alt', type: 'string', title: 'Alt Text' }
              ]
            },
            {
              name: 'videoFile',
              title: 'Video File',
              hidden: ({ parent }) => parent?.mediaType !== 'video',
              type: 'file',
              options: {
                accept: 'video/*'
              }
            },
            {
              name: 'smallImage',
              title: 'Small Image',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.smallmediaType !== 'image' && parent?.layout !== 'smallImageLeftLargeImageRight' && parent?.layout !== 'largeImageLeftSmallImageRight',
              fields: [
                { name: 'alt', type: 'string', title: 'Alt Text' }
              ]
            },
            {
              name: 'smallvideoFile',
              title: 'Small Video File',
              hidden: ({ parent }) => parent?.smallmediaType !== 'video' && parent?.layout !== 'smallImageLeftLargeImageRight' && parent?.layout !== 'largeImageLeftSmallImageRight',
              type: 'file',
              options: {
                accept: 'video/*'
              }
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              hidden: ({ parent }) => parent?.layout !== 'imageAndText' && parent?.layout !== 'imageAndTextOverlay',
            },
            {
              name: 'text',
              title: 'Text',
              type: 'blockContent',
              hidden: ({ parent }) => parent?.layout !== 'imageAndText' && parent?.layout !== 'imageRightTextLeft' && parent?.layout !== 'imageLeftTextRight' && parent?.layout !== 'imageLeftQuoteRight' && parent?.layout !== 'imageRightQuoteLeft'  && parent?.layout !== 'imageAndTextOverlay',
            },
            {
              name: 'credit',
              title: 'Credit',
              type: 'string',
              hidden: ({ parent }) => parent?.layout !== 'imageLeftQuoteRight' && parent?.layout !== 'imageRightQuoteLeft',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              hidden: ({ parent }) => parent?.layout !== 'imageOnly' && parent?.layout !== 'imageRightTextLeft' && parent?.layout !== 'imageLeftTextRight' && parent?.layout !== 'imageLeftQuoteRight' && parent?.layout !== 'imageRightQuoteLeft' && parent?.layout !== 'imageAndTextOverlay' && parent?.layout !== 'smallImageLeftLargeImageRight' && parent?.layout !== 'largeImageLeftSmallImageRight',
            },
            {
            name: 'link',
            title: 'Link',
            type: 'url',
            hidden: ({ parent }) => parent?.layout !== 'imageAndText',
          },
          {
            name: 'backgroundColor',
            title: 'Background Color',
            type: 'string',
            options: {
              list: [
                { title: 'Warm Gray', value: '#A59B93' },
                { title: 'Lilac', value: '#C6BBCF' },
                { title: 'Khaki', value: '#8D8A53' },
                { title: 'Purple', value: '#4C2F48' },
              ],
              layout: 'dropdown',
            },
            hidden: ({ parent }) =>
              parent?.layout !== 'imageAndText' &&
              parent?.layout !== 'imageRightTextLeft' &&
              parent?.layout !== 'imageLeftTextRight' &&
              parent?.layout !== 'imageRightQuoteLeft' &&
              parent?.layout !== 'imageLeftQuoteRight' &&
              parent?.layout !== 'smallImageLeftLargeImageRight' &&
              parent?.layout !== 'largeImageLeftSmallImageRight',
          },          
          ]
        })
      ],
      hidden: ({ document }) => document?.pageType !== "slideshowpage",
    }),   
    defineField({
      name: 'nextPage',
      title: 'Next Page',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Choose the page to link to next.',
      hidden: ({ document }) => document?.pageType !== "slideshowpage",
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
