import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {Rule} from '@sanity/types'

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
      name: 'backgroundmediaType',
      title: "Background Media Type",
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ document }) => document?.pageType !== "homepage",
    }),
    defineField({
      name: 'backgroundimage',
      title: 'Background Image',
      type: 'image',
      hidden: ({ document }) => document?.backgroundmediaType !== "image",
    }),
    defineField({
      name: 'backgroundmobileimage',
      title: 'Background Mobile Image',
      type: 'image',
      hidden: ({ document }) => document?.backgroundmediaType !== "image",
    }),
    defineField({
      name: 'backgroundvideo',
      title: 'Background Video',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      hidden: ({ document }) => document?.backgroundmediaType !== "video",
    }),
    defineField({
      name: 'designpagemediaType',
      title: "Design Page Media Type",
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ document }) => document?.pageType !== "homepage",
    }),
    defineField({
      name: 'designpageimage',
      title: 'Design Page Image',
      type: 'image',
      options: {
        hotspot: false,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.designpagemediaType !== "image",
    }),
    defineField({
      name: 'designpagemobileimage',
      title: 'Design Page Mobile Image',
      type: 'image',
      options: {
        hotspot: false,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.designpagemediaType !== "image",
    }),
    defineField({
      name: 'designpagevideo',
      title: 'Design Page Video',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      hidden: ({ document }) => document?.designpagemediaType !== "video",
    }),
    defineField({
      name: 'craftsmanshippagemediaType',
      title: "Craftsmanship Page Media Type",
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ document }) => document?.pageType !== "homepage",
    }),
    defineField({
      name: 'craftsmanshippageimage',
      title: 'Craftsmanship Page Image',
      type: 'image',
      options: {
        hotspot: false,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.craftsmanshippagemediaType !== "image",
    }),
    defineField({
      name: 'craftsmanshippagemobileimage',
      title: 'Craftsmanship Page Mobile Image',
      type: 'image',
      options: {
        hotspot: false,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.craftsmanshippagemediaType !== "image",
    }),
    defineField({
      name: 'craftsmanshippagevideo',
      title: 'Craftsmanship Page Video',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      hidden: ({ document }) => document?.craftsmanshippagemediaType !== "video",
    }),
    defineField({
      name: 'residencespagemediaType',
      title: "Residences Page Media Type",
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ document }) => document?.pageType !== "homepage",
    }),
    defineField({
      name: 'residencespageimage',
      title: 'Residences Page Image',
      type: 'image',
      options: {
        hotspot: false,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.residencespagemediaType !== "image",
    }),
    defineField({
      name: 'residencespagemobileimage',
      title: 'Residences Page Mobile Image',
      type: 'image',
      options: {
        hotspot: false,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.residencespagemediaType !== "image",
    }),
    defineField({
      name: 'residencespagevideo',
      title: 'Residences Page Video',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      hidden: ({ document }) => document?.residencespagemediaType !== "video",
    }),
    defineField({
      name: 'amenitiespagemediaType',
      title: "Amenities Page Media Type",
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ document }) => document?.pageType !== "homepage",
    }),
    defineField({
      name: 'amenitiespageimage',
      title: 'Amenities Page Image',
      type: 'image',
      options: {
        hotspot: false,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.amenitiespagemediaType !== "image",
    }),
    defineField({
      name: 'amenitiespagemobileimage',
      title: 'Amenities Page Mobile Image',
      type: 'image',
      options: {
        hotspot: false,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.amenitiespagemediaType !== "image",
    }),
    defineField({
      name: 'amenitiespagevideo',
      title: 'Amenities Page Video',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      hidden: ({ document }) => document?.amenitiespagemediaType !== "video",
    }),
    defineField({
      name: 'parkpagemediaType',
      title: "Park Page Media Type",
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ document }) => document?.pageType !== "homepage",
    }),
    defineField({
      name: 'parkpageimage',
      title: 'Park & Gardens Page Image',
      type: 'image',
      options: {
        hotspot: false,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.parkpagemediaType !== "image",
    }),
    defineField({
      name: 'parkpagemobileimage',
      title: 'Park & Gardens Page Mobile Image',
      type: 'image',
      options: {
        hotspot: false,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.parkpagemediaType !== "image",
    }),
    defineField({
      name: 'parkpagevideo',
      title: 'Park Page Video',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      hidden: ({ document }) => document?.parkpagemediaType !== "video",
    }),
    defineField({
      name: 'villagepagemediaType',
      title: "Village Page Media Type",
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ document }) => document?.pageType !== "homepage",
    }),
    defineField({
      name: 'villagepageimage',
      title: 'Belle Meade Village Page Image',
      type: 'image',
      options: {
        hotspot: false,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.villagepagemediaType !== "image",
    }),
    defineField({
      name: 'villagepagemobileimage',
      title: 'Belle Meade Village Page Mobile Image',
      type: 'image',
      options: {
        hotspot: false,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({ document }) => document?.villagepagemediaType !== "image",
    }),
    defineField({
      name: 'villagepagevideo',
      title: 'Village Page Video',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      hidden: ({ document }) => document?.villagepagemediaType !== "video",
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
                  { title: 'Media Left, Text Right', value: 'imageLeftTextRight' },
                  { title: 'Media Left, Quote Right', value: 'imageLeftQuoteRight' },
                  { title: 'Media Right, Quote Left', value: 'imageRightQuoteLeft' },
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
              options: { hotspot: false },
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
              options: { hotspot: false },
              hidden: ({ parent }) => parent?.smallmediaType !== 'image',
              fields: [
                { name: 'alt', type: 'string', title: 'Alt Text' }
              ]
            },
            {
              name: 'mobileimage',
              title: 'Mobile Image',
              type: 'image',
              hidden: ({ parent }) => parent?.mediaType !== 'image',
              options: { hotspot: false },
              fields: [
                { name: 'alt', type: 'string', title: 'Alt Text' }
              ]
            },
            {
              name: 'smallvideoFile',
              title: 'Small Video File',
              hidden: ({ parent }) => parent?.smallmediaType !== 'video',
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
              validation: Rule => Rule.custom((blocks: any[], context: any) => {
                if (!blocks) return true;
                // Skip validation for quote layouts
                if (context.parent?.layout === 'imageLeftQuoteRight' || context.parent?.layout === 'imageRightQuoteLeft') {
                  return true;
                }
                const text = blocks
                  .filter(block => block._type === 'block')
                  .map(block => block.children.map(child => child.text).join(''))
                  .join('');
                const wordCount = text.trim().split(/\s+/).length;
                return wordCount <= 40 ? true : 'Text must be 40 words or less';
              }),
              hidden: ({ parent }) => parent?.layout !== 'imageAndText' && parent?.layout !== 'imageRightTextLeft' && parent?.layout !== 'imageLeftTextRight' && parent?.layout !== 'imageLeftQuoteRight' && parent?.layout !== 'imageRightQuoteLeft'  && parent?.layout !== 'imageAndTextOverlay',
            },
            {
              name: 'mobiletext',
              title: 'Mobile Text',
              type: 'blockContent',
              hidden: ({ parent }) => parent?.layout !== 'imageLeftQuoteRight' && parent?.layout !== 'imageRightQuoteLeft',
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
            name: 'linkText',
            title: 'Link Text',
            type: 'string',
            hidden: ({ parent }) => parent?.layout !== 'imageAndText' && parent?.layout !== 'imageAndTextOverlay',
          },
            {
            name: 'link',
            title: 'Link',
            type: 'url',
            hidden: ({ parent }) => parent?.layout !== 'imageAndText' && parent?.layout !== 'imageAndTextOverlay',
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
