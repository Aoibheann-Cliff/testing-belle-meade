import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {pageType} from './pageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, pageType],
}
