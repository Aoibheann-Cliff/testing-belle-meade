import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {pageType} from './pageType'
import { menuType } from './menuType'
import { footerType } from './footerType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, pageType, menuType, footerType],
}
