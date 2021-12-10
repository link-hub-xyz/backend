import { join } from 'path'

import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

const typesArray = loadFilesSync(
    join(__dirname, './**/*.typedef.*'),
    {
        extensions: ['graphql'],
        recursive: true
    }
)

const typedefs = mergeTypeDefs(typesArray)

export default typedefs;