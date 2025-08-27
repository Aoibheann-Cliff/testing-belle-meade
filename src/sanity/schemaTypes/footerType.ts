export const footerType = {
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Footer Title',
      type: 'string',
    },
    {
      name: 'links',
      title: 'Footer Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'url', title: 'URL', type: 'string' },
            {
              name: 'style',
              title: 'Style',
              type: 'string',
              options: {
                list: [
                  { title: 'None', value: 'none' },
                  { title: 'Button', value: 'button' },
                ],
                layout: 'radio',
              },
            },
            {
              name: 'newTab',
              title: 'Open in new tab',
              type: 'boolean',
            },
          ],
        },
      ],
    },
  ],
};
